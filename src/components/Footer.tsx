import React from 'react';
import { 
  Scissors, 
  ShieldCheck, 
  Lock, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onOpenTracker: () => void;
  onOpenConsultation: () => void;
  onOpenPortal: () => void;
  onOpenAiStylist: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTracker,
  onOpenConsultation,
  onOpenPortal,
  onOpenAiStylist,
}) => {
  return (
    <footer className="bg-[#050812] border-t border-amber-900/30 text-slate-300 text-xs">
      
      {/* Top Security & Assurance Ribbon */}
      <div className="border-b border-slate-800/80 bg-[#080d1a] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white font-serif-luxury text-sm block">Bespoke Heritage</span>
              <span className="text-[11px] text-slate-400">Master craft atelier since 1998</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white font-serif-luxury text-sm block">5-Stage Firewall</span>
              <span className="text-[11px] text-slate-400">DDoS, WAF, Zero-Trust & IPS</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white font-serif-luxury text-sm block">E2EE Data Privacy</span>
              <span className="text-[11px] text-slate-400">Client measurements AES-256 hashed</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white font-serif-luxury text-sm block">Real-Time Tracking</span>
              <span className="text-[11px] text-slate-400">Live cutting & fitting milestone updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <Scissors className="w-5 h-5 rotate-45" />
            </div>
            <div>
              <span className="text-lg font-bold font-serif-luxury text-amber-200 block">
                GUNA TAILOR SERVICES
              </span>
              <span className="text-[10px] text-amber-400 uppercase tracking-widest block">
                Haute Couture & Bespoke Atelier
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Crafting world-class bespoke suits, ceremonial sherwanis, and precision alterations. Hand-canvassed construction backed by enterprise data security and seamless multi-channel client portals.
          </p>

          <div className="pt-2 text-[11px] text-slate-400 space-y-1">
            <p className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> 42 Khader Nawaz Khan Road, Nungambakkam, Chennai 600006</p>
            <p className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> +91 (044) 2833 4920 / +91 98402 11983</p>
            <p className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> concierge@gunatailors.com</p>
          </div>
        </div>

        {/* Tailoring Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-serif-luxury">
            Bespoke Disciplines
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={onOpenConsultation} className="hover:text-amber-300 transition-colors">Bespoke 3-Piece Suits</button></li>
            <li><button onClick={onOpenConsultation} className="hover:text-amber-300 transition-colors">Banarasi Katan Sherwanis</button></li>
            <li><button onClick={onOpenConsultation} className="hover:text-amber-300 transition-colors">Black-Tie Tuxedos</button></li>
            <li><button onClick={onOpenConsultation} className="hover:text-amber-300 transition-colors">Bridal & Couture Gowns</button></li>
            <li><button onClick={onOpenConsultation} className="hover:text-amber-300 transition-colors">Master Alterations</button></li>
            <li><button onClick={onOpenConsultation} className="hover:text-amber-300 transition-colors">Corporate Uniform Fleets</button></li>
          </ul>
        </div>

        {/* Client & Artisan Tools */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 font-serif-luxury">
            Atelier Portals
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={onOpenTracker} className="hover:text-amber-300 transition-colors">Live Order Tracker</button></li>
            <li><button onClick={onOpenConsultation} className="hover:text-amber-300 transition-colors">Schedule Measurement Fitting</button></li>
            <li><button onClick={onOpenPortal} className="hover:text-amber-300 transition-colors">Client Encrypted Portal</button></li>
            <li><button onClick={onOpenPortal} className="hover:text-amber-300 transition-colors">Tailor Workspace & Kanban</button></li>
            <li><button onClick={onOpenAiStylist} className="hover:text-amber-300 text-amber-400 font-semibold transition-colors flex items-center">AI Master Stylist (High Thinking)</button></li>
          </ul>
        </div>

        {/* Security & Compliance */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-serif-luxury">
            Security & Trust
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> 5-Stage Active Firewall</li>
            <li className="flex items-center"><Lock className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> AES-GCM 256 E2EE Files</li>
            <li className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-purple-400" /> ISO 27001 Certified</li>
            <li className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> Automated Weekly Audits</li>
            <li className="flex items-center"><ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-slate-400" /> Zero Data Leakage Policy</li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-slate-900 py-6 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 1998 - 2026 GUNA TAILOR SERVICES. All Rights Reserved.</span>
          <span className="text-slate-400">Military-Grade Encryption • Real-Time Synchronization • Zero-Lag Concurrency</span>
        </div>
      </div>

    </footer>
  );
};
