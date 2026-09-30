import React, { useState } from 'react';
import { Sparkles, Eye, Scissors, Check, ZoomIn } from 'lucide-react';

export const LookbookGallery: React.FC<{ onSelectLook: (title: string) => void }> = ({ onSelectLook }) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Suits' | 'Sherwanis' | 'Couture' | 'Fabrics'>('All');

  const galleryItems = [
    {
      id: 1,
      title: 'The Ambassador 3-Piece Peak Lapel',
      category: 'Suits',
      mill: 'Loro Piana Super 150s Merino',
      imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      description: 'Charcoal glen check with handmade milanaise lapel buttonhole and double-vented jacket.',
    },
    {
      id: 2,
      title: 'Royal Banarasi Antique Zari Sherwani',
      category: 'Sherwanis',
      mill: 'Varanasi Heritage Handloom Silk',
      imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      description: 'Hand-woven real gold zari border on ivory silk with custom safa and matching mojari embroidery.',
    },
    {
      id: 3,
      title: 'Midnight Black-Tie Grosgrain Tuxedo',
      category: 'Suits',
      mill: 'Holland & Sherry Worsted Mohair',
      imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      description: 'Pure silk faille shawl collar with single mother-of-pearl stud button closure.',
    },
    {
      id: 4,
      title: 'Sculpted Silk Organza Couture Gown',
      category: 'Couture',
      mill: 'French Lyon Silk Organza',
      imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      description: 'Architectural boned corset bodice with micro-pleated skirt and invisible zip.',
    },
    {
      id: 5,
      title: 'Scabal Autumn Cashmere Flannel Overcoat',
      category: 'Fabrics',
      mill: 'Scabal Yorkshire 100% Cashmere',
      imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      description: 'Double-breasted raglan sleeve overcoat with horn buttons and genuine horn throat latch.',
    },
    {
      id: 6,
      title: 'Maharaja Heritage Zardozi Kurta Set',
      category: 'Sherwanis',
      mill: 'Raw Bangalore Mulberry Silk',
      imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      description: 'Intricate dabka and seed-pearl embroidery along collar and cuffs with raw silk churidar.',
    },
  ];

  const filtered = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section className="py-20 bg-[#090e1c] border-b border-amber-900/30 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              The Atelier Lookbook
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mt-4 mb-2 font-serif-luxury">
              Gallery of Bespoke Masterpieces
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light max-w-xl">
              Glimpse real bespoke creations handcrafted in our Chennai and global partner ateliers.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2 mt-6 md:mt-0 overflow-x-auto pb-2">
            {(['All', 'Suits', 'Sherwanis', 'Couture', 'Fabrics'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-amber-500/30">
                  {item.mill}
                </span>

                <button
                  onClick={() => onSelectLook(item.title)}
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-amber-500 text-slate-950 opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-105"
                  title="Inquire about this bespoke cut"
                >
                  <Scissors className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-100 font-serif-luxury group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-amber-400/80 font-medium">Bespoke Commission</span>
                  <button
                    onClick={() => onSelectLook(item.title)}
                    className="text-amber-300 hover:text-amber-200 font-semibold flex items-center space-x-1"
                  >
                    <span>Request Fit</span>
                    <Scissors className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
