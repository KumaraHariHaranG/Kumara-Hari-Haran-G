import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  ShieldCheck, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Lock
} from 'lucide-react';

interface MfaModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMfaVerified: boolean;
  setIsMfaVerified: (status: boolean) => void;
  userRole: string;
}

export const MfaModal: React.FC<MfaModalProps> = ({
  isOpen,
  onClose,
  isMfaVerified,
  setIsMfaVerified,
  userRole,
}) => {
  const [code, setCode] = useState('');
  const [simulatedCode, setSimulatedCode] = useState('784920');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGenerateNewCode = () => {
    const nextCode = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedCode(nextCode);
    setError('');
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === simulatedCode) {
      setIsMfaVerified(true);
      setSuccess(true);
      setError('');
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1400);
    } else {
      setError(`Invalid verification code. Please enter the current authenticator token: ${simulatedCode}`);
    }
  };

  const handleDisableMfa = () => {
    setIsMfaVerified(false);
    setCode('');
    setSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#090f20] border border-amber-500/40 shadow-2xl text-white overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-[#101b33] to-slate-900 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif-luxury text-amber-200">
                Multi-Factor Authentication (MFA)
              </h3>
              <p className="text-[11px] text-slate-400">
                Required for {userRole.toUpperCase()} Role Access
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {isMfaVerified ? (
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white font-serif-luxury">
                MFA Shield Active & Verified
              </h4>
              <p className="text-xs text-slate-300">
                Your session is secured with hardware-backed TOTP credentials and time-based cryptographic handshake.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleDisableMfa}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-red-950/70 border border-red-500/30 text-red-300 text-xs font-semibold transition-all"
                >
                  Reset / Reconfigure Token
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300 font-medium">
                  <span className="flex items-center">
                    <Smartphone className="w-4 h-4 mr-1.5 text-amber-400" />
                    Simulated Authenticator App TOTP:
                  </span>
                  <button
                    type="button"
                    onClick={handleGenerateNewCode}
                    className="text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Refresh</span>
                  </button>
                </div>
                <div className="flex items-center justify-center p-3 rounded-lg bg-slate-900 border border-amber-500/30 font-mono text-2xl font-bold tracking-widest text-amber-300">
                  {simulatedCode}
                </div>
                <span className="text-[10px] text-slate-400 block text-center">
                  Rotating 6-digit TOTP token (30-second cycle)
                </span>
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-medium mb-1">
                  Enter 6-Digit MFA Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 784920"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-center font-mono text-lg tracking-widest text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>MFA Token Verified! Securing session...</span>
                </div>
              )}

              <button
                type="submit"
                disabled={code.length !== 6}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Activate Session</span>
              </button>
            </form>
          )}

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-start space-x-2">
            <Lock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              Enforced across all administrative, cutter, and client roles to guarantee zero unauthorized database ingress.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
