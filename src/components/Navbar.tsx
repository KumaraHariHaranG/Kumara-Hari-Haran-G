import React from 'react';
import { 
  Scissors, 
  ShieldCheck, 
  Lock, 
  Search, 
  Calendar, 
  Sparkles, 
  UserCheck, 
  KeyRound, 
  Activity,
  Menu,
  X
} from 'lucide-react';
import { Role } from '../types';

interface NavbarProps {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  activeView: 'public' | 'portal';
  setActiveView: (view: 'public' | 'portal') => void;
  openOrderTracker: () => void;
  openConsultation: () => void;
  openAiStylist: () => void;
  openMfaModal: () => void;
  isMfaVerified: boolean;
  firewallActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  setCurrentRole,
  activeView,
  setActiveView,
  openOrderTracker,
  openConsultation,
  openAiStylist,
  openMfaModal,
  isMfaVerified,
  firewallActive,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#080d1a]/95 backdrop-blur-md border-b border-amber-900/30 text-white">
      {/* Top Security & Craftsmanship Ticker */}
      <div className="bg-gradient-to-r from-[#0d162a] via-[#16233d] to-[#0d162a] px-4 py-1.5 text-xs border-b border-amber-500/15 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-slate-300 overflow-x-auto whitespace-nowrap">
          <span className="flex items-center text-amber-400 font-semibold tracking-wide">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
            ATELIER OPEN
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">Master Craftsmanship Since 1998</span>
          <span className="text-slate-400">|</span>
          <span className="flex items-center text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            5-Stage Firewall Active
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-400 flex items-center">
            <Lock className="w-3 h-3 mr-1 text-amber-400" />
            AES-256 E2E Encrypted Client Files
          </span>
        </div>

        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={openMfaModal}
            className={`flex items-center space-x-1.5 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              isMfaVerified
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                : 'bg-amber-950/60 text-amber-300 border border-amber-500/30 hover:bg-amber-900/60'
            }`}
          >
            <KeyRound className="w-3 h-3" />
            <span>MFA: {isMfaVerified ? 'Enforced' : 'Verify Now'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity */}
          <div 
            onClick={() => setActiveView('public')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-400/40 group-hover:scale-105 transition-transform">
              <Scissors className="w-6 h-6 text-slate-950 rotate-45" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold tracking-wider font-serif-luxury text-amber-200 group-hover:text-amber-100 transition-colors flex items-center">
                GUNA TAILOR SERVICES
              </div>
              <p className="text-[11px] text-amber-400/80 font-medium tracking-widest uppercase">
                Haute Couture • Bespoke Atelier • Since 1998
              </p>
            </div>
          </div>

          {/* Center Links (Public vs Portal Navigation) */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm">
            <button
              onClick={() => setActiveView('public')}
              className={`transition-colors font-medium ${
                activeView === 'public' ? 'text-amber-300 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Services & Atelier
            </button>
            
            <button
              onClick={openOrderTracker}
              className="flex items-center space-x-1.5 text-slate-300 hover:text-amber-300 transition-colors"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>Track Live Order</span>
            </button>

            <button
              onClick={openConsultation}
              className="flex items-center space-x-1.5 text-slate-300 hover:text-amber-300 transition-colors"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Book Fitting</span>
            </button>

            <button
              onClick={openAiStylist}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-purple-500/15 to-amber-500/15 border border-amber-500/30 text-amber-200 hover:border-amber-400 transition-all shadow-sm shadow-amber-500/10"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>AI Master Stylist</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-mono">HIGH THINKING</span>
            </button>

            <button
              onClick={() => setActiveView('portal')}
              className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md font-semibold transition-all ${
                activeView === 'portal'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'bg-slate-800/90 text-amber-200 border border-amber-500/30 hover:bg-slate-800'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Secure Portal</span>
            </button>
          </nav>

          {/* Right Action: Role Switcher & Status */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="bg-slate-900/90 p-1 rounded-lg border border-slate-700/60 flex items-center space-x-1">
              <button
                onClick={() => {
                  setCurrentRole('client');
                  setActiveView('portal');
                }}
                className={`px-2.5 py-1 text-xs rounded transition-all font-medium ${
                  currentRole === 'client' && activeView === 'portal'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Client
              </button>
              <button
                onClick={() => {
                  setCurrentRole('tailor');
                  setActiveView('portal');
                }}
                className={`px-2.5 py-1 text-xs rounded transition-all font-medium ${
                  currentRole === 'tailor' && activeView === 'portal'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tailor
              </button>
              <button
                onClick={() => {
                  setCurrentRole('admin');
                  setActiveView('portal');
                }}
                className={`px-2.5 py-1 text-xs rounded transition-all font-medium ${
                  currentRole === 'admin' && activeView === 'portal'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Admin / Sec
              </button>
            </div>

            <button
              onClick={openOrderTracker}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all"
            >
              Order Lookup
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={openOrderTracker}
              className="p-2 text-amber-400 hover:text-amber-300"
              title="Track Order"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800 space-y-3 bg-[#0a1122] rounded-b-xl px-2">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
              <button
                onClick={() => {
                  setActiveView('public');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded text-center text-xs font-semibold ${
                  activeView === 'public' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-200'
                }`}
              >
                Atelier Showcase
              </button>
              <button
                onClick={() => {
                  setActiveView('portal');
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded text-center text-xs font-semibold ${
                  activeView === 'portal' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-200'
                }`}
              >
                Secure Portal
              </button>
            </div>

            <div className="flex flex-col space-y-2 text-sm">
              <button
                onClick={() => {
                  openOrderTracker();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 p-2 rounded hover:bg-slate-800 text-slate-200"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Track Live Order</span>
              </button>
              <button
                onClick={() => {
                  openConsultation();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 p-2 rounded hover:bg-slate-800 text-slate-200"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Book Bespoke Consultation</span>
              </button>
              <button
                onClick={() => {
                  openAiStylist();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 p-2 rounded hover:bg-slate-800 text-amber-300 font-semibold"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>AI Master Stylist (High Thinking)</span>
              </button>
              <button
                onClick={() => {
                  openMfaModal();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 p-2 rounded hover:bg-slate-800 text-emerald-400"
              >
                <KeyRound className="w-4 h-4 text-emerald-400" />
                <span>MFA Status: {isMfaVerified ? 'Verified' : 'Unverified'}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1.5 uppercase tracking-wider font-semibold">
                Switch Portal Role:
              </span>
              <div className="grid grid-cols-3 gap-1">
                {(['client', 'tailor', 'admin'] as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setCurrentRole(r);
                      setActiveView('portal');
                      setMobileMenuOpen(false);
                    }}
                    className={`py-1.5 text-xs rounded uppercase font-semibold transition-colors ${
                      currentRole === r
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
