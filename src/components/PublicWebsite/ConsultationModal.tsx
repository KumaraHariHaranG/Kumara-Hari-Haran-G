import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Ruler, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: defaultService || 'Bespoke Suits & Tuxedos',
    locationType: 'atelier' as 'atelier' | 'home_visit',
    date: '2026-10-05',
    time: '11:00 AM',
    fabricInterest: 'Loro Piana Super 150s Merino Wool',
    notes: '',
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  React.useEffect(() => {
    if (defaultService) {
      setFormData(prev => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `GTS-APPT-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRef(refCode);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#090f20] border border-amber-500/40 shadow-2xl text-white overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-[#101b33] to-slate-900 border-b border-amber-500/20 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif-luxury text-amber-200">
                Book Bespoke Fitting Consultation
              </h3>
              <p className="text-[11px] text-slate-400">
                36-Point Anatomical Measurement & Fabric Swatch Curation
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

        {/* Form Body or Success Screen */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {submittedRef ? (
            <div className="p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-serif-luxury text-white">
                Fitting Consultation Reserved
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you, <strong className="text-amber-300">{formData.name}</strong>. Your master fitting appointment has been confirmed with our senior cutting master.
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 text-left max-w-sm mx-auto space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Appointment Ref:</span>
                  <span className="font-mono font-bold text-amber-300">{submittedRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Service:</span>
                  <span className="text-white font-medium">{formData.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="text-white font-medium">{formData.date} at {formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="text-white font-medium">
                    {formData.locationType === 'atelier' ? 'Private Atelier Suite' : 'Master Home / Hotel Visit'}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Singhania"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98402 11983"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. client@example.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tailoring Service</label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="Bespoke Suits & Tuxedos">Bespoke Suits & Tuxedos</option>
                    <option value="Traditional & Ceremonial Sherwanis">Traditional & Ceremonial Sherwanis</option>
                    <option value="Haute Couture & Bridal Attire">Haute Couture & Bridal Attire</option>
                    <option value="Master Alterations & Restyling">Master Alterations & Restyling</option>
                    <option value="Executive & Corporate Wardrobes">Executive & Corporate Wardrobes</option>
                    <option value="Luxury Fabric Consultation">Luxury Fabric Consultation</option>
                  </select>
                </div>
              </div>

              {/* Consultation Location Selection */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">Fitting Experience Preference</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, locationType: 'atelier' })}
                    className={`p-3 rounded-xl border text-left flex items-start space-x-2 transition-all ${
                      formData.locationType === 'atelier'
                        ? 'bg-amber-500/15 border-amber-400 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-xs">Atelier Private Lounge</span>
                      <span className="text-[10px] text-slate-400">Central Salon with Full Mill Swatches</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, locationType: 'home_visit' })}
                    className={`p-3 rounded-xl border text-left flex items-start space-x-2 transition-all ${
                      formData.locationType === 'home_visit'
                        ? 'bg-amber-500/15 border-amber-400 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <Ruler className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-xs">Master Home / Office Visit</span>
                      <span className="text-[10px] text-slate-400">White-Glove Traveling Master Service</span>
                    </div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Time Slot</label>
                  <select
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="10:00 AM">10:00 AM - Morning Slot</option>
                    <option value="11:30 AM">11:30 AM - Morning Slot</option>
                    <option value="02:00 PM">02:00 PM - Afternoon Slot</option>
                    <option value="04:00 PM">04:00 PM - Evening Slot</option>
                    <option value="06:30 PM">06:30 PM - Private VIP Slot</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Fabric & Style Requirements</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention desired color palette, lapel style, wedding date, or posture considerations..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Encrypted Client Confidentiality: Measurements are never shared with third parties.</span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
