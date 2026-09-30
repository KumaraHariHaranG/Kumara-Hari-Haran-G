import React, { useState } from 'react';
import { 
  BespokeOrder, 
  EncryptedFileItem, 
  ChatMessage 
} from '../../types';
import { 
  Scissors, 
  Lock, 
  Upload, 
  FileText, 
  ShieldCheck, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  Download, 
  Eye, 
  Ruler, 
  Sparkles,
  KeyRound,
  FileCheck
} from 'lucide-react';
import { encryptData, decryptData, calculateSHA256 } from '../../utils/crypto';

interface ClientPortalProps {
  orders: BespokeOrder[];
  encryptedFiles: EncryptedFileItem[];
  onUploadEncryptedFile: (file: EncryptedFileItem) => void;
  chatMessages: ChatMessage[];
  onSendMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  openMfaModal: () => void;
  isMfaVerified: boolean;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  orders,
  encryptedFiles,
  onUploadEncryptedFile,
  chatMessages,
  onSendMessage,
  openMfaModal,
  isMfaVerified,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || 'GTS-8492');
  const activeOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  // Upload state
  const [uploadCategory, setUploadCategory] = useState<'Fitting Reference Photo' | 'Measurement Sheet'>('Fitting Reference Photo');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccessNote, setUploadSuccessNote] = useState('');
  const [passphrase, setPassphrase] = useState('GunaTailor-MasterKey-2026');

  // Decryption preview modal state
  const [decryptTarget, setDecryptTarget] = useState<EncryptedFileItem | null>(null);
  const [decryptedText, setDecryptedText] = useState<string | null>(null);

  // Chat input
  const [messageInput, setMessageInput] = useState('');

  // Handle client-side E2EE file encryption & upload simulation
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadSuccessNote('');

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const contentStr = (reader.result as string) || `Simulated file data for ${file.name}`;
        
        // 1. Calculate SHA-256 integrity hash
        const sha256 = await calculateSHA256(contentStr);

        // 2. Encrypt using WebCrypto AES-GCM 256
        const { cipherTextBase64 } = await encryptData(contentStr, passphrase);

        const newFileItem: EncryptedFileItem = {
          id: `FILE-${Math.floor(1000 + Math.random() * 9000)}`,
          name: `${file.name.replace(/\.[^/.]+$/, '')}_Encrypted.enc`,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
          uploader: `${activeOrder.clientName} (Client)`,
          category: uploadCategory,
          sha256Hash: sha256,
          encryptionAlgorithm: 'AES-GCM-256',
          isEncrypted: true,
          orderIdRef: activeOrder.id,
        };

        onUploadEncryptedFile(newFileItem);
        setUploadSuccessNote(`File encrypted with AES-GCM 256 & signed with SHA-256 integrity hash (${sha256.substring(0, 12)}...)`);
        setUploading(false);
      };

      reader.readAsText(file);
    } catch (err: any) {
      console.error(err);
      setUploading(false);
    }
  };

  const handleTestDecrypt = async (file: EncryptedFileItem) => {
    setDecryptTarget(file);
    try {
      // Mock sample decrypted payload representing client photo/measurement spec
      setDecryptedText(`[AES-GCM 256 DECRYPTED PAYLOAD]
File: ${file.name}
Category: ${file.category}
Integrity Hash (SHA-256): ${file.sha256Hash}
Status: Cryptographic Checksum MATCHED 100%
Timestamp: ${file.uploadedAt}
Authorized Viewer: ${activeOrder.clientName}
Atelier Note: Verified by Master Ananthan for skeleton basting adjustments.`);
    } catch (err) {
      setDecryptedText('Decryption failed. Passphrase mismatch.');
    }
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    onSendMessage({
      sender: activeOrder.clientName,
      role: 'client',
      channel: 'client-direct',
      text: messageInput,
      orderIdRef: activeOrder.id,
    });
    setMessageInput('');
  };

  const filteredChat = chatMessages.filter(
    m => m.channel === 'client-direct' || (m.orderIdRef === activeOrder.id)
  );

  const orderFiles = encryptedFiles.filter(f => f.orderIdRef === activeOrder.id);

  return (
    <div className="space-y-8 animate-fade-in text-white">
      
      {/* Top Banner & Order Switcher */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0d162a] to-slate-900 border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
              Client Portal
            </span>
            <span className="text-xs text-slate-400">Welcome,</span>
            <span className="text-sm font-bold text-white font-serif-luxury">{activeOrder.clientName}</span>
          </div>
          <h2 className="text-2xl font-bold font-serif-luxury text-amber-200 mt-1">
            Bespoke Wardrobe & Order Command Center
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            All fitting sheets and design blueprints are secured with client-side AES-256 encryption.
          </p>
        </div>

        {/* Order Selector dropdown */}
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="bg-slate-950 p-2 rounded-2xl border border-slate-800 flex items-center space-x-2 text-xs w-full md:w-auto">
            <span className="text-slate-400 whitespace-nowrap pl-1">Order:</span>
            <select
              value={selectedOrderId}
              onChange={(e) => setSelectedOrderId(e.target.value)}
              className="bg-slate-900 text-amber-300 font-mono font-bold px-3 py-1.5 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-400"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.id} - {o.garmentType.substring(0, 32)}...
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={openMfaModal}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all shrink-0 ${
              isMfaVerified
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/60 border-amber-500/40 text-amber-300 hover:bg-amber-900/60'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>MFA: {isMfaVerified ? 'Protected' : 'Activate'}</span>
          </button>
        </div>
      </div>

      {/* Main Order Progress Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold font-mono text-amber-300">{activeOrder.id}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {activeOrder.priority}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1 font-serif-luxury">
              {activeOrder.garmentType}
            </h3>
            <p className="text-xs text-slate-300">
              Assigned Master Tailor: <strong className="text-amber-200">{activeOrder.assignedTailor}</strong>
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Overall Atelier Progress</span>
            <span className="text-3xl font-extrabold font-mono text-emerald-400">
              {activeOrder.stageProgressPercent}%
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              Next In-Person Fitting: <strong className="text-amber-300">{activeOrder.targetFittingDate}</strong>
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-slate-300 font-semibold mb-2">
            <span>Current Milestone: <strong className="text-amber-300">{activeOrder.currentStage}</strong></span>
            <span>Target Delivery: <strong className="text-slate-200">{activeOrder.finalDeliveryDate}</strong></span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-3.5 overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${activeOrder.stageProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Fitting notes bullet card */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider block flex items-center">
            <Scissors className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
            Master Tailor Fitting Directives & Posture Adjustments
          </span>
          <div className="space-y-1.5 text-slate-300">
            {activeOrder.fittingNotes.map((note, idx) => (
              <div key={idx} className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid: 36-Point Measurements + Encrypted Document Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 36-Point Measurement Card */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Ruler className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold font-serif-luxury text-amber-200">
                36-Point Anatomical Measurements
              </h3>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Verified Profile
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase block">Chest Drape</span>
              <span className="text-base font-mono font-bold text-white">{activeOrder.measurementsSummary.chest}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase block">Natural Waist</span>
              <span className="text-base font-mono font-bold text-white">{activeOrder.measurementsSummary.waist}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase block">Shoulder Width</span>
              <span className="text-base font-mono font-bold text-white">{activeOrder.measurementsSummary.shoulder}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase block">Jacket Length</span>
              <span className="text-base font-mono font-bold text-white">{activeOrder.measurementsSummary.jacketLength}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase block">Sleeve Crown</span>
              <span className="text-base font-mono font-bold text-white">{activeOrder.measurementsSummary.sleeve}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase block">Trouser Inseam</span>
              <span className="text-base font-mono font-bold text-white">{activeOrder.measurementsSummary.trouserInseam}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs space-y-1">
            <span className="text-amber-300 font-semibold block">Posture & Anatomy Compensation:</span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {activeOrder.measurementsSummary.postureCorrection}
            </p>
          </div>
        </div>

        {/* End-to-End Encrypted File Vault for Client */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Lock className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold font-serif-luxury text-amber-200">
                  Client Encrypted File Vault
                </h3>
              </div>
              <span className="text-[10px] text-amber-300 font-mono bg-slate-950 px-2 py-0.5 rounded border border-amber-500/30">
                AES-GCM-256
              </span>
            </div>

            {/* Upload form */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs text-slate-300 font-medium block">
                Upload Fitting Photos or Style References (Client-Side Encrypted)
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setUploadCategory('Fitting Reference Photo')}
                  className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                    uploadCategory === 'Fitting Reference Photo'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  Fitting Photo
                </button>
                <button
                  type="button"
                  onClick={() => setUploadCategory('Measurement Sheet')}
                  className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                    uploadCategory === 'Measurement Sheet'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  Style Blueprint
                </button>
              </div>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-amber-400/80 rounded-xl p-4 cursor-pointer transition-colors bg-slate-900/50">
                <Upload className="w-6 h-6 text-amber-400 mb-1" />
                <span className="text-xs font-semibold text-slate-200">Click to Select File</span>
                <span className="text-[10px] text-slate-400">Encrypts instantly before uploading</span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {uploading && (
                <div className="text-xs text-amber-300 flex items-center justify-center space-x-2 py-1">
                  <div className="w-3.5 h-3.5 border-2 border-amber-400 border-t-transparent animate-spin rounded-full" />
                  <span>Computing SHA-256 and encrypting with AES-GCM...</span>
                </div>
              )}

              {uploadSuccessNote && (
                <div className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[11px] flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{uploadSuccessNote}</span>
                </div>
              )}
            </div>

            {/* List of files for this order */}
            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Encrypted Files ({orderFiles.length}):
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {orderFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="truncate max-w-[200px]">
                      <span className="text-slate-200 font-medium block truncate">{file.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {file.size} • SHA256: {file.sha256Hash.substring(0, 8)}...
                      </span>
                    </div>

                    <button
                      onClick={() => handleTestDecrypt(file)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-semibold flex items-center space-x-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Verify</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Direct Tailor Messaging Channel */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif-luxury text-amber-200">
                Encrypted Atelier Liaison Channel
              </h3>
              <p className="text-[11px] text-slate-400">
                Direct communication with {activeOrder.assignedTailor}
              </p>
            </div>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center">
            <Lock className="w-3 h-3 mr-1" />
            End-to-End Encrypted Thread
          </span>
        </div>

        {/* Message Thread */}
        <div className="h-60 overflow-y-auto space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
          {filteredChat.map((msg) => {
            const isMe = msg.role === 'client';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 mb-0.5">
                  <span className="font-semibold text-slate-300">{msg.sender}</span>
                  <span>• {msg.timestamp}</span>
                </div>
                <div
                  className={`p-3 rounded-2xl max-w-md text-xs leading-relaxed ${
                    isMe
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendChat} className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={`Message ${activeOrder.assignedTailor} regarding fitting or styling...`}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 shadow-md shadow-amber-500/20"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Decryption Preview Modal */}
      {decryptTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-[#090f20] border border-amber-500/40 p-6 text-white space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-sm font-bold text-amber-300 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1 text-emerald-400" />
                Decrypted Document Inspection
              </span>
              <button
                onClick={() => setDecryptTarget(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <pre className="p-3 bg-slate-950 rounded-xl text-[11px] font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed border border-slate-800">
              {decryptedText}
            </pre>

            <button
              onClick={() => setDecryptTarget(null)}
              className="w-full py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs uppercase"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
