import React from 'react';
import { 
  Scissors, 
  Crown, 
  Sparkles, 
  RefreshCw, 
  Briefcase, 
  Feather, 
  Clock, 
  Check, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface ServicesSectionProps {
  onBookService: (serviceName: string) => void;
  openConsultation: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onBookService,
  openConsultation,
}) => {
  const services = [
    {
      id: 'suits',
      title: 'Bespoke Suits & Tuxedos',
      tagline: 'Hand-Canvassed Savile Row Excellence',
      icon: Crown,
      description: 'Hand-molded full floating canvas using natural horsehair and wool. Cut individually from English and Italian mills including Loro Piana, Scabal, and Vitale Barberis Canonico.',
      priceStarting: 'From $1,250',
      turnaround: '14 - 21 Business Days',
      fittingStages: '2 In-Person Fittings',
      highlights: [
        'Full floating horsehair canvas',
        'Functional surgeon cuffs (hand-knotted)',
        'Hand-sewn Milanese lapel buttonhole',
        'Horn or mother-of-pearl buttons',
      ],
      badge: 'Signature Atelier',
    },
    {
      id: 'traditional',
      title: 'Traditional & Ceremonial Sherwanis',
      tagline: 'Royal Heritage & Antique Zari Craft',
      icon: Sparkles,
      description: 'Regal Banarasi Katan silk, raw Bangalore mulberry silk, and hand-embroidered zardozi work for weddings, red-carpet events, and cultural ceremonies.',
      priceStarting: 'From $1,400',
      turnaround: '21 - 28 Business Days',
      fittingStages: '3 Skeleton & Embroidery Trials',
      highlights: [
        'Pure silk base with antique gold zari',
        'Micro-quilted breathable cotton mulmul lining',
        'Custom ceremonial stole and safa matching',
        'Heirloom garment preservation box',
      ],
      badge: 'Heritage Mastercraft',
    },
    {
      id: 'bridal',
      title: 'Haute Couture & Bridal Attire',
      tagline: 'Architectural Silhouettes & Precision Darts',
      icon: Feather,
      description: 'Bespoke bridal lehengas, evening gowns, silk jackets, and sculpted dresses. Engineered with internal corsetry, bone structure, and seamless hand-beaded hems.',
      priceStarting: 'From $1,650',
      turnaround: '25 - 35 Business Days',
      fittingStages: '3 Precision Fitting Sessions',
      highlights: [
        'Built-in French spiral boning support',
        'Invisible hand-sewn micro-zippers',
        'Custom Swarovski & threadwork detailing',
        'Dual-layer silk organza reinforcement',
      ],
      badge: 'Couture Exclusive',
    },
    {
      id: 'alterations',
      title: 'Master Alterations & Restyling',
      tagline: 'Precision Silhouette Transformation',
      icon: Scissors,
      description: 'Comprehensive alterations for luxury garments. Jacket shoulder narrowing, sleeve recutting from armhole, trouser tapering, and vintage heirloom remodeling.',
      priceStarting: 'From $85',
      turnaround: '3 - 5 Business Days',
      fittingStages: '1 Verification Fitting',
      highlights: [
        'Zero visible alteration marks',
        'Original stitch tension & color matching',
        'Chest canvassing realignment',
        'Express 48-hour rush option available',
      ],
      badge: 'Precision Care',
    },
    {
      id: 'corporate',
      title: 'Executive & Corporate Wardrobes',
      tagline: 'Consistent Bulk Tailoring for Leaders',
      icon: Briefcase,
      description: 'Tailored corporate fleets, aviation uniforms, and hospitality executive suits. Bulk 36-point measurement profiling with centralized enterprise portal access.',
      priceStarting: 'Enterprise Quotes',
      turnaround: 'Flexible Timeline',
      fittingStages: 'On-Site Team Measurements',
      highlights: [
        'Nanotech stain & wrinkle-resistant wools',
        'Centralized encrypted HR/Procurement portal',
        'Automated re-ordering by employee ID',
        'Dedicated Master Tailor liaison',
      ],
      badge: 'Enterprise Fleet',
    },
    {
      id: 'fabrics',
      title: 'Luxury Fabric Curation & Swatches',
      tagline: 'Super 120s to 180s Wool, Cashmere & Silk',
      icon: RefreshCw,
      description: 'Direct imports from prestigious European and Indian heritage mills. Touch, inspect, and choose from over 2,500 physical swatches in our private consultation lounge.',
      priceStarting: 'From $120 / meter',
      turnaround: 'Immediate Dispatch',
      fittingStages: 'Swatch Kit Delivered to Door',
      highlights: [
        'Certified authentic mill selvedges',
        'High-twist travel wools for zero creasing',
        '100% Mongolian pure cashmere',
        'Handloom pure Mulberry silks',
      ],
      badge: 'Curated Mill Books',
    },
  ];

  return (
    <section id="services-section" className="py-20 bg-[#080d1a] relative border-b border-amber-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Tailoring Disciplines
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-4 mb-4 font-serif-luxury">
            Exquisite Services Tailored To Your Distinction
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light">
            Combining traditional Savile Row hand-canvassing with ancient royal Indian heritage embroidery. Every piece is drafted by hand to individual anatomy.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                className="group relative rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-amber-500/25 p-6 hover:border-amber-400/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-500/30">
                    {svc.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl font-bold text-slate-100 font-serif-luxury group-hover:text-amber-200 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-amber-400/80 font-medium mb-3">
                    {svc.tagline}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {svc.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6 pt-3 border-t border-slate-800">
                    {svc.highlights.map((h, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer specs & CTA */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {svc.turnaround}
                    </span>
                    <span className="font-bold text-amber-300 text-sm">
                      {svc.priceStarting}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookService(svc.title)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-200 font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-2 border border-amber-500/30 hover:border-amber-400"
                  >
                    <span>Reserve Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-100 font-serif-luxury">
                The Guna Tailor Lifetime Fit & Craft Guarantee
              </h4>
              <p className="text-xs text-slate-300">
                Complimentary seam let-outs, button replacement, and seasonal pressing for the lifetime of your bespoke garments.
              </p>
            </div>
          </div>
          <button
            onClick={openConsultation}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all shrink-0"
          >
            Speak With Master Tailor
          </button>
        </div>

      </div>
    </section>
  );
};
