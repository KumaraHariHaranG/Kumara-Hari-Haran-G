import React, { useState } from 'react';
import { 
  Ruler, 
  PenTool, 
  Scissors, 
  UserCheck, 
  Sparkles, 
  PackageCheck,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const CraftsmanshipProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState(3); // default highlight on Basting

  const steps = [
    {
      num: '01',
      title: '36-Point Anatomical Measurement',
      shortTitle: 'Measurement',
      icon: Ruler,
      duration: '45 Minutes',
      description: 'Beyond standard chest and waist: we calculate your spine curvature, shoulder slope variance, bicep rotation, and stance ergonomics.',
      secret: 'Every measurement is hashed into your encrypted client profile.',
    },
    {
      num: '02',
      title: 'Individual Master Pattern Drafting',
      shortTitle: 'Pattern Drafting',
      icon: PenTool,
      duration: '2 - 3 Days',
      description: 'No mass block templates. Our master cutter hand-drafts a bespoke 2D card pattern unique to your physical structure.',
      secret: 'Archived digitally in our AES-256 encrypted vault for future orders.',
    },
    {
      num: '03',
      title: 'Hand Cutting & Horsehair Canvas Prep',
      shortTitle: 'Fabric & Canvas',
      icon: Scissors,
      duration: '3 - 4 Days',
      description: 'Pure Italian wool or Banarasi silk is precision sheared with tailoring shears. Natural horsehair and wool canvas are shaped using hand steam irons.',
      secret: 'Floating canvas molds to your body temperature over time.',
    },
    {
      num: '04',
      title: 'The Skeleton Basting Fitting Trial',
      shortTitle: 'Basting Fitting',
      icon: UserCheck,
      duration: '1 Hour Fitting',
      description: 'You try on the temporary basted skeleton jacket assembled with white basting thread. The tailor chalks millimeter adjustments directly on you.',
      secret: 'Crucial milestone where lapel roll and armhole drape are finalized.',
    },
    {
      num: '05',
      title: 'Fine Hand-Stitching & Surgeon Cuffs',
      shortTitle: 'Hand Stitching',
      icon: Sparkles,
      duration: '7 - 10 Days',
      description: 'Over 40 hours of artisanal needlework. Functional cuff buttonholes are hand-corded with silk gimp. Pick-stitching accents every edge.',
      secret: 'Over 4,000 hand stitches inside each chest structure.',
    },
    {
      num: '06',
      title: 'Final Press, QC & White-Glove Handover',
      shortTitle: 'Delivery & QC',
      icon: PackageCheck,
      duration: 'Final Milestone',
      description: 'Cast-iron steam block press creates permanent 3D drape. 28-point quality checklist verified by Guna Ramanathan before luxury dispatch.',
      secret: 'Accompanied by a signed Certificate of Bespoke Authenticity.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#080d1a] via-[#0b132b] to-[#080d1a] border-b border-amber-900/30 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            The Haute Couture Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-4 mb-4 font-serif-luxury">
            6 Stages of Uncompromising Precision
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light">
            Every step is logged live to our encrypted dashboard so you can follow your garment’s transformation from fabric bolt to royal masterwork.
          </p>
        </div>

        {/* Interactive Progress Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={s.num}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold ${isCurrent ? 'text-amber-300' : 'text-slate-500'}`}>
                    {s.num}
                  </span>
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-amber-400' : 'text-slate-400'}`} />
                </div>
                <div className={`text-xs font-bold font-serif-luxury truncate ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                  {s.shortTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Spotlight Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/20 border border-amber-500/40 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                  Stage {steps[activeStep].num}
                </span>
                <span className="text-xs text-slate-400 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-amber-400" />
                  Estimated Time: {steps[activeStep].duration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-serif-luxury">
                {steps[activeStep].title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {steps[activeStep].description}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/20 flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-emerald-300 block">Master Craftsman & Security Note:</span>
                  <span className="text-xs text-slate-300">{steps[activeStep].secret}</span>
                </div>
              </div>
            </div>

            {/* Quick Step Indicators */}
            <div className="w-full lg:w-80 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Live Atelier Checklist
              </h4>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>36-Point Physical Measurement Card</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>CAD Skeleton Pattern File Uploaded</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Loro Piana / Katan Silk Inspected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Hand Basting Skeleton Assembled</span>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Next Fitting Window:</span>
                <span className="font-semibold text-amber-300">3 - 4 Days</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
