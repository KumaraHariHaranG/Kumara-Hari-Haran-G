import React, { useState } from 'react';
import { 
  Scissors, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Lock, 
  Clock, 
  Award,
  Layers
} from 'lucide-react';

interface HeroSectionProps {
  onSearchOrder: (orderId: string) => void;
  openConsultation: () => void;
  openAiStylist: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchOrder,
  openConsultation,
  openAiStylist,
  onExploreServices,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchOrder(searchInput.trim());
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#090e1c] via-[#0d162a] to-[#080d1a] pt-12 pb-20 border-b border-amber-500/20">
      {/* Background Decorative Mesh & Luxury Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-600 rounded-full blur-[160px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow / Security Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Master Savile Row & Traditional Craftsmanship</span>
          </div>
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>5-Stage Firewall & E2E Encrypted</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-serif-luxury text-slate-100 leading-tight">
            Perfection in Every Stitch.{' '}
            <span className="block mt-2 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent drop-shadow-sm">
              Bespoke Elegance Protected by Enterprise Security.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Welcome to <strong className="text-amber-200 font-semibold">GUNA TAILOR SERVICES</strong>. Experience bespoke suits, ceremonial sherwanis, and couture tailoring handcrafted by generational master tailors, paired with real-time order tracking and military-grade client data protection.
          </p>
        </div>

        {/* Real-time Order Quick Tracker Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <form 
            onSubmit={handleSearchSubmit}
            className="p-2 sm:p-2.5 rounded-2xl bg-slate-900/90 border border-amber-500/40 shadow-2xl shadow-amber-500/10 flex flex-col sm:flex-row items-center gap-2"
          >
            <div className="relative flex-1 w-full flex items-center">
              <Search className="w-5 h-5 text-amber-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Track live order: e.g. GTS-8492 or phone..."
                className="w-full pl-11 pr-4 py-3 bg-slate-950/70 rounded-xl border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center space-x-2 shrink-0"
            >
              <span>Track Live Status</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Pill Links */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400">
            <span>Instant Preview Orders:</span>
            {['GTS-8492', 'GTS-9021', 'GTS-7714', 'GTS-6288'].map((id) => (
              <button
                key={id}
                onClick={() => onSearchOrder(id)}
                className="text-amber-300 hover:text-amber-200 underline underline-offset-2 font-mono"
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={openConsultation}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 flex items-center space-x-2 transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book 36-Point Fitting Consultation</span>
          </button>

          <button
            onClick={openAiStylist}
            className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-amber-500/40 text-amber-200 font-semibold text-sm tracking-wide flex items-center space-x-2 transition-all shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Consult AI Master Stylist (High Thinking)</span>
          </button>

          <button
            onClick={onExploreServices}
            className="px-6 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white font-medium text-sm transition-all"
          >
            <span>Explore Services</span>
          </button>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-500/20 hover:border-amber-500/40 transition-all shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3.5">
              <Scissors className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-100 mb-1 font-serif-luxury">
              36-Point Bespoke Fit
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every garment drafts from a unique master skeleton pattern tailored to your exact shoulder slope, posture, and chest drape.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-500/20 hover:border-amber-500/40 transition-all shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-100 mb-1 font-serif-luxury">
              5-Stage Firewall Protection
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Edge rate limiting, OWASP Top-10 WAF, Zero-Trust IAM, and behavioral intrusion prevention safeguard our database 24/7.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-500/20 hover:border-amber-500/40 transition-all shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3.5">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-100 mb-1 font-serif-luxury">
              E2E Client File Encryption
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Client fitting photos and confidential measurement cards are encrypted in the browser via AES-GCM 256 before storage.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-amber-500/20 hover:border-amber-500/40 transition-all shadow-lg">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3.5">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-100 mb-1 font-serif-luxury">
              Live Stage Tracking
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Real-time transparency from fabric cutting and skeleton basting fitting to final steam shaping and white-glove delivery.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
