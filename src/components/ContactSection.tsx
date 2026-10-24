import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  Twitter, 
  Clock, 
  MapPin, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProfileInfo } from '../types/portfolio';
import { sounds } from '../utils/audio';

interface ContactSectionProps {
  profile: ProfileInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    sounds.playKey();
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sounds.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      sounds.playSuccess();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 }
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-slate-800/80 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold tracking-widest uppercase">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Get in Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Let's Discuss Systems & Opportunities
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Whether you're hiring for a Staff/Lead engineering role, need an architecture review for a high-throughput system, or want to collaborate on open source.
              </p>
            </div>

            {/* Coordinates Card */}
            <div className="p-6 rounded-xl bg-[#0F0F0F] border border-slate-800 space-y-4">
              
              {/* Profile Avatar Header in Contact Card */}
              {profile.avatarUrl && (
                <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                  <div className="w-12 h-12 rounded-lg overflow-hidden border border-cyan-500/30 bg-slate-900 shrink-0 shadow-sm">
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center" 
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{profile.name}</h4>
                    <p className="text-[11px] font-mono text-cyan-400">{profile.title}</p>
                  </div>
                </div>
              )}

              {/* Email direct copy */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-[#0A0A0A] border border-slate-800">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] text-slate-500 font-mono block font-bold uppercase tracking-wider">DIRECT EMAIL</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-200 truncate block font-mono">{profile.email}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location & Timezone */}
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{profile.location}</span>
              </div>

              {/* Live Status */}
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span>{profile.statusText}</span>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-slate-800 flex items-center gap-3">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors border border-slate-800"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors border border-slate-800"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>

                {profile.twitterUrl && (
                  <a
                    href={profile.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors border border-slate-800"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                    <span>X</span>
                  </a>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-xl bg-[#0F0F0F] border border-slate-800 shadow-2xl">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Dispatched!</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-slate-200">{formData.name}</strong>. Your transmission has been queued. I typically respond within 24 hours.
                  </p>
                  
                  <div className="pt-4 flex items-center justify-center gap-3">
                    <a
                      href={`mailto:${profile.email}?subject=${encodeURIComponent(formData.subject || 'Follow-up')}&body=${encodeURIComponent(formData.message)}`}
                      className="px-4 py-2 rounded-lg bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-slate-200"
                    >
                      Open in Mail Client
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-4 py-2 rounded-lg bg-slate-900 text-slate-300 text-xs font-mono border border-slate-800 hover:bg-slate-800"
                    >
                      Send Another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Connor"
                        className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/80 font-mono transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sconnor@cyberdyne.io"
                        className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/80 font-mono transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                      Subject / Role Title
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Staff Platform Engineer Position / Technical Advisory"
                      className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/80 font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-mono text-slate-400 mb-1.5 uppercase tracking-wider">
                      Message / Project Details <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe the technical context, scale, and team goals..."
                      className="w-full px-3.5 py-2.5 bg-[#0A0A0A] border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/80 font-mono transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    id="btn-submit-contact-form"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-lg bg-white hover:bg-slate-200 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting message packet...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Transmit Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
