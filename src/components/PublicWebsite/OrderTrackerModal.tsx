import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Lock, 
  User, 
  Scissors, 
  Calendar,
  AlertCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { BespokeOrder, OrderStage } from '../../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: BespokeOrder[];
  initialOrderId?: string;
  onOpenPortal: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  orders,
  initialOrderId,
  onOpenPortal,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialOrderId || 'GTS-8492');
  const [matchedOrder, setMatchedOrder] = useState<BespokeOrder | null>(
    orders.find((o) => o.id.toLowerCase() === (initialOrderId || 'GTS-8492').toLowerCase()) || orders[0]
  );
  const [errorMsg, setErrorMsg] = useState('');

  // Update query when initialOrderId changes
  React.useEffect(() => {
    if (initialOrderId) {
      setSearchQuery(initialOrderId);
      const found = orders.find(
        (o) => o.id.toLowerCase() === initialOrderId.toLowerCase() ||
               o.clientPhone.includes(initialOrderId) ||
               o.clientEmail.toLowerCase() === initialOrderId.toLowerCase()
      );
      if (found) {
        setMatchedOrder(found);
        setErrorMsg('');
      }
    }
  }, [initialOrderId, orders]);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = orders.find(
      (o) => o.id.toLowerCase() === query ||
             o.clientPhone.replace(/[\s+-]/g, '').includes(query.replace(/[\s+-]/g, '')) ||
             o.clientEmail.toLowerCase() === query
    );

    if (found) {
      setMatchedOrder(found);
      setErrorMsg('');
    } else {
      setErrorMsg(`No active tailoring order matched "${searchQuery}". Please check your order ID or contact atelier support.`);
    }
  };

  const stages: OrderStage[] = [
    'Consultation & Measurement',
    'Pattern Drafting',
    'Fabric Cutting & Canvas Prep',
    'Skeleton Basting Fitting',
    'Fine Stitching & Detailing',
    'Final Press & Quality QC',
    'Ready for Delivery / Fitting Completed',
  ];

  const getStageIndex = (stage: OrderStage) => stages.indexOf(stage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#090f20] border border-amber-500/40 shadow-2xl text-white overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-[#101b33] to-slate-900 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif-luxury text-amber-200">
                Live Atelier Order Tracker
              </h3>
              <p className="text-[11px] text-slate-400">
                Real-Time Garment Milestone Tracking & Cryptographic Verification
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

        {/* Search Bar Input */}
        <div className="p-6 border-b border-slate-800/80 bg-slate-950/60">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. GTS-8492) or Phone Number..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
            >
              Verify & Track
            </button>
          </form>

          {/* Quick Click Order IDs */}
          <div className="flex items-center space-x-2 mt-2 text-xs text-slate-400 overflow-x-auto">
            <span>Sample Orders:</span>
            {orders.map((o) => (
              <button
                key={o.id}
                onClick={() => {
                  setSearchQuery(o.id);
                  setMatchedOrder(o);
                  setErrorMsg('');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  matchedOrder?.id === o.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-800 text-amber-300 hover:bg-slate-700'
                }`}
              >
                {o.id}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="mt-3 p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        {matchedOrder ? (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            
            {/* Top Order Summary Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold font-mono text-amber-300">
                    {matchedOrder.id}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {matchedOrder.priority}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">
                  {matchedOrder.garmentType}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Client: <strong className="text-slate-200">{matchedOrder.clientName}</strong>
                </p>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <span className="text-[11px] text-slate-400 block">Overall Completion</span>
                <span className="text-2xl font-extrabold font-mono text-emerald-400">
                  {matchedOrder.stageProgressPercent}%
                </span>
                <span className="text-[11px] text-slate-400 block flex items-center justify-start sm:justify-end">
                  <Clock className="w-3 h-3 mr-1 text-amber-400" />
                  Target Delivery: {matchedOrder.finalDeliveryDate}
                </span>
              </div>
            </div>

            {/* Real-time Stage Stepper */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Current Stage: <span className="text-amber-300">{matchedOrder.currentStage}</span></span>
                <span className="text-emerald-400 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  Verified Atelier Milestone
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                <div 
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${matchedOrder.stageProgressPercent}%` }}
                />
              </div>

              {/* Stage Milestones List */}
              <div className="space-y-2 mt-4 pt-2">
                {stages.map((st, idx) => {
                  const currentIdx = getStageIndex(matchedOrder.currentStage);
                  const isCompleted = idx < currentIdx;
                  const isCurrent = idx === currentIdx;

                  return (
                    <div 
                      key={st}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                        isCurrent
                          ? 'bg-amber-500/15 border-amber-400 shadow-sm'
                          : isCompleted
                          ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                          : 'bg-slate-950/40 border-slate-900 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isCurrent ? (
                          <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[10px] text-slate-600">
                            {idx + 1}
                          </div>
                        )}
                        <span className={`text-xs font-medium ${isCurrent ? 'text-amber-200 font-bold' : ''}`}>
                          {st}
                        </span>
                      </div>

                      <span className="text-[11px] font-mono">
                        {isCompleted ? (
                          <span className="text-emerald-400">Completed</span>
                        ) : isCurrent ? (
                          <span className="text-amber-300 font-semibold animate-pulse">In Progress</span>
                        ) : (
                          <span className="text-slate-600">Pending</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Garment Details & Tailor Liaison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                  Atelier Specs & Fabric
                </span>
                <p className="text-slate-200"><strong className="text-amber-300">Fabric:</strong> {matchedOrder.fabricChoice}</p>
                <p className="text-slate-200"><strong className="text-amber-300">Lining:</strong> {matchedOrder.liningDetails}</p>
                <p className="text-slate-200"><strong className="text-amber-300">Assigned Master:</strong> {matchedOrder.assignedTailor}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                  Milestones & Security
                </span>
                <p className="text-slate-200"><strong className="text-amber-300">Basting Fitting:</strong> {matchedOrder.targetFittingDate}</p>
                <p className="text-slate-200"><strong className="text-amber-300">Final Handover:</strong> {matchedOrder.finalDeliveryDate}</p>
                <p className="text-emerald-400 flex items-center">
                  <Lock className="w-3.5 h-3.5 mr-1" />
                  {matchedOrder.encryptedFileCount} Encrypted Fitting Documents Attached
                </p>
              </div>
            </div>

          </div>
        ) : (
          <div className="p-12 text-center text-slate-400">
            Please enter an order ID to view live progress.
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            <span>End-to-End Encrypted Data Channel</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onClose();
                onOpenPortal();
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md shadow-amber-500/20"
            >
              <span>Access Client Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
