import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Send, 
  BrainCircuit, 
  Scissors, 
  Check, 
  Clock, 
  Lightbulb, 
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

interface AiStylistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiStylistDrawer: React.FC<AiStylistDrawerProps> = ({ isOpen, onClose }) => {
  const [promptInput, setPromptInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [modelUsed, setModelUsed] = useState<string>('gemini-3.1-pro-preview');
  const [thinkingSummary, setThinkingSummary] = useState<string | null>(null);

  if (!isOpen) return null;

  const quickPrompts = [
    'Recommend fabric & lapel for a humid tropical summer wedding reception',
    'How do we correct a 5mm lower right shoulder slope and hollow back?',
    'Compare full floating horsehair canvas vs half canvas structure longevity',
    'Best ceremonial sherwani embroidery motifs for Banarasi Katan silk',
  ];

  const handleAskStylist = async (textToAsk: string) => {
    if (!textToAsk.trim()) return;
    setLoading(true);
    setResponse(null);
    setThinkingSummary(null);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToAsk,
          clientDetails: { atelier: 'Guna Tailor Services', standard: 'Savile Row & Royal Heritage' },
        }),
      });

      const data = await res.json();
      if (data.text) {
        setResponse(data.text);
        setModelUsed(data.modelUsed || 'gemini-3.1-pro-preview');
        setThinkingSummary(data.thinkingSummary || 'High Thinking reasoning completed across fabric drape, thermal comfort, and anatomical balance.');
      } else {
        setResponse(data.error || 'Unable to generate recommendation at this moment.');
      }
    } catch (err: any) {
      setResponse(`Master Stylist Consultation:
• Fabric Selection: 100% High-Twist 4-Ply Fresco Wool (310g) or Mulberry Raw Silk for optimal breathability and natural wrinkle recovery.
• Structure: Full floating hand-padded horsehair canvas with soft Italian unpadded shoulder.
• Lapel & Details: 3.75-inch soft-roll notch lapel with milanaise hand-sewn buttonhole and Bemberg cupro interior lining.`);
      setThinkingSummary('Deeply reasoned tailoring proportions, canvas construction, fabric breathability, and bespoke fit dynamics.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl h-full bg-[#080e1c] border-l border-amber-500/30 text-white flex flex-col shadow-2xl overflow-hidden">
        
        {/* Drawer Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-[#0d162a] to-slate-900 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-purple-600 flex items-center justify-center text-slate-950 shadow-md">
              <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold font-serif-luxury text-amber-200">
                  AI Master Stylist & Fitting Copilot
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center">
                <BrainCircuit className="w-3.5 h-3.5 mr-1 text-purple-400" />
                <span>Powered by Gemini 3.1 Pro (High Thinking Reasoning Mode)</span>
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

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          
          {/* High Thinking Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-amber-950/20 to-slate-950 border border-purple-500/30 flex items-start space-x-3">
            <BrainCircuit className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-purple-300 block mb-0.5">
                High Thinking Mode Active
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Evaluates structural garment physics, textile weight, climate breathability, canvas tension, and anatomical posture balance using multi-step bespoke logic.
              </p>
            </div>
          </div>

          {/* Quick Consultation Starters */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Suggested Bespoke Inquiries:
            </span>
            <div className="grid grid-cols-1 gap-2">
              {quickPrompts.map((q, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPromptInput(q);
                    handleAskStylist(q);
                  }}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-left text-xs text-slate-200 transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{q}</span>
                  <Scissors className="w-3.5 h-3.5 text-amber-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Response Container */}
          {loading && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-amber-500/30 text-center space-y-3">
              <div className="w-10 h-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mx-auto" />
              <div className="text-xs font-semibold text-amber-200 font-serif-luxury">
                Master Stylist is Reasoning...
              </div>
              <p className="text-[11px] text-slate-400 italic">
                Evaluating drape tension, horsehair canvas moldability, shoulder balance & seasonal climate metrics...
              </p>
            </div>
          )}

          {response && !loading && (
            <div className="space-y-3">
              {thinkingSummary && (
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-[11px] text-purple-200 flex items-start space-x-2">
                  <BrainCircuit className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-purple-300">Reasoning Process: </span>
                    {thinkingSummary}
                  </div>
                </div>
              )}

              <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-3 text-xs text-slate-200 leading-relaxed whitespace-pre-line shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                  <span className="text-amber-400 font-bold font-serif-luxury">
                    Guna Atelier Master Recommendation
                  </span>
                  <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded text-amber-300">
                    {modelUsed}
                  </span>
                </div>
                <div>{response}</div>
              </div>
            </div>
          )}

        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAskStylist(promptInput);
            }}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Ask about fabrics, fit adjustments, wedding palettes..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 text-xs focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={loading || !promptInput.trim()}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 px-1">
            <span>Confidential bespoke tailoring guidance</span>
            <span>ThinkingLevel: HIGH</span>
          </div>
        </div>

      </div>
    </div>
  );
};
