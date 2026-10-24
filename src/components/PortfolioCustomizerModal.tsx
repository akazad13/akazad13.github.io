import React, { useState, useRef } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Settings, 
  Check,
  User,
  Camera,
  Trash2
} from 'lucide-react';
import { PortfolioData, ProfileInfo } from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultPortfolio';
import { sounds } from '../utils/audio';

interface PortfolioCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
  onSavePortfolio: (updated: PortfolioData) => void;
}

export const PortfolioCustomizerModal: React.FC<PortfolioCustomizerModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  onSavePortfolio,
}) => {
  const [profile, setProfile] = useState<ProfileInfo>({ ...portfolio.profile });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const presetAvatars = [
    { label: 'Cyber Studio', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
    { label: 'Tech Lead', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
    { label: 'Platform Eng', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80' },
    { label: 'Systems Dev', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80' },
  ];

  if (!isOpen) return null;

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, WebP, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setProfile((prev: typeof profile) => ({ ...prev, avatarUrl: dataUrl }));
      sounds.playSuccess();
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    const updated: PortfolioData = {
      ...portfolio,
      profile
    };
    onSavePortfolio(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 900);
  };

  const handleResetDefaults = () => {
    sounds.playClick();
    if (window.confirm('Reset all details back to default software engineer data?')) {
      setProfile({ ...defaultPortfolioData.profile });
      onSavePortfolio(defaultPortfolioData);
    }
  };

  const handleExportJSON = () => {
    sounds.playKey();
    const jsonStr = JSON.stringify({ ...portfolio, profile }, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${profile.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile) {
          setProfile(parsed.profile);
          onSavePortfolio(parsed);
          sounds.playSuccess();
        }
      } catch {
        alert('Invalid JSON configuration file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div 
      id="customizer-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="customizer-modal-window"
        className="w-full max-w-2xl bg-[#0F0F0F] rounded-xl border border-slate-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 bg-[#0F0F0F] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Personalize Your Portfolio</h3>
              <p className="text-xs text-slate-400">Update your name, bio, credentials, and social links</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close portfolio customizer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="flex-1 p-6 overflow-y-auto space-y-5 font-mono text-xs text-slate-300">
          
          {/* Profile Photo / Avatar Customizer */}
          <div className="p-4 rounded-xl bg-[#0A0A0A] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 uppercase tracking-wider text-[11px] font-bold flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span>Profile Photo & Avatar</span>
              </label>
              {profile.avatarUrl && (
                <button
                  type="button"
                  onClick={() => setProfile((prev: typeof profile) => ({ ...prev, avatarUrl: undefined }))}
                  className="text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Remove Photo</span>
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Photo Preview Thumbnail */}
              <div className="relative group shrink-0">
                <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-cyan-500/40 bg-slate-900 shadow-md flex items-center justify-center">
                  {profile.avatarUrl ? (
                    <img 
                      src={profile.avatarUrl} 
                      alt={profile.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center" 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-600">
                      <User className="w-8 h-8" />
                      <span className="text-[9px] mt-1">NO PHOTO</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload & URL Controls */}
              <div className="flex-1 w-full space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    id="avatar-file-upload-input"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload From Device</span>
                  </button>

                  <span className="text-slate-600 text-[11px]">or paste link:</span>
                </div>

                <input
                  id="custom-avatar-url"
                  type="url"
                  placeholder="https://example.com/my-photo.jpg"
                  value={profile.avatarUrl || ''}
                  onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#0F0F0F] border border-slate-800 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                />

                {/* Preset Avatars */}
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-500">Presets:</span>
                  {presetAvatars.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setProfile((prev: typeof profile) => ({ ...prev, avatarUrl: preset.url }))}
                      className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-400 hover:text-cyan-300 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="custom-name" className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">Full Name</label>
              <input
                id="custom-name"
                type="text"
                required
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label htmlFor="custom-title" className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">Engineering Title</label>
              <input
                id="custom-title"
                type="text"
                required
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="custom-status-text" className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">Availability Status Message</label>
            <input
              id="custom-status-text"
              type="text"
              value={profile.statusText}
              onChange={(e) => setProfile({ ...profile, statusText: e.target.value })}
              className="w-full px-3 py-2 bg-[#0A0A0A] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="custom-bio" className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">Detailed Bio</label>
            <textarea
              id="custom-bio"
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full px-3 py-2 bg-[#0A0A0A] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500 resize-none font-sans text-xs leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="custom-email" className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">Email Address</label>
              <input
                id="custom-email"
                type="email"
                required
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label htmlFor="custom-location" className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">Location</label>
              <input
                id="custom-location"
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="custom-github" className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">GitHub URL</label>
              <input
                id="custom-github"
                type="url"
                value={profile.githubUrl}
                onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label htmlFor="custom-linkedin" className="block text-slate-400 mb-1 uppercase tracking-wider text-[11px]">LinkedIn URL</label>
              <input
                id="custom-linkedin"
                type="url"
                value={profile.linkedinUrl}
                onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div>
              <label htmlFor="custom-years-exp" className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Years Exp</label>
              <input
                id="custom-years-exp"
                type="number"
                value={profile.yearsOfExperience}
                onChange={(e) => setProfile({ ...profile, yearsOfExperience: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-slate-800 rounded-lg text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="custom-uptime" className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">SLA Uptime</label>
              <input
                id="custom-uptime"
                type="text"
                value={profile.uptimeScore}
                onChange={(e) => setProfile({ ...profile, uptimeScore: e.target.value })}
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-slate-800 rounded-lg text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="custom-commits" className="block text-slate-400 mb-1 uppercase tracking-wider text-[10px]">Contributions</label>
              <input
                id="custom-commits"
                type="number"
                value={profile.githubContributions}
                onChange={(e) => setProfile({ ...profile, githubContributions: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#0A0A0A] border border-slate-800 rounded-lg text-slate-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Import / Export actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportJSON}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300"
              >
                <Download className="w-3 h-3" />
                <span>Export JSON</span>
              </button>

              <label className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 cursor-pointer">
                <Upload className="w-3 h-3" />
                <span>Import JSON</span>
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>
            </div>

            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-slate-500 hover:text-slate-300 text-[11px] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Defaults</span>
            </button>
          </div>

          {/* Modal Submit Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-white hover:bg-slate-200 text-black text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
