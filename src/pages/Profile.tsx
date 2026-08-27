import React, { useState } from 'react';
import { useUserAuth } from '../contexts/UserAuthContext';
import { Navigate } from 'react-router-dom';
import { LogOut, Settings, Shield, User as UserIcon, Camera, Trash2, Check, AlertCircle } from 'lucide-react';
import { updateProfile, deleteUser } from 'firebase/auth';

export default function Profile() {
  const { user, isAuthLoading, logOut } = useUserAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-white/20 border-t-brand-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const creationDate = user.metadata.creationTime 
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
      })
    : 'Unknown';

  const handleUpdateProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await updateProfile(user, { displayName });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteUser(user);
      // User is logged out automatically
    } catch (error: any) {
      console.error("Failed to delete account", error);
      if (error.code === 'auth/requires-recent-login') {
        alert("For security reasons, please log out and log back in before deleting your account.");
      } else {
        alert("Failed to delete account. Please try again.");
      }
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto z-10 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-brand-white/[0.02] border border-brand-white/[0.05] rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-900/[0.05] blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative group">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'Profile'} className="w-24 h-24 rounded-full border border-brand-white/10" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-brand-white/10 border border-brand-white/10 flex items-center justify-center">
                    <UserIcon className="w-10 h-10 text-brand-white/50" />
                  </div>
                )}
                <button className="absolute bottom-0 right-0 p-2 bg-brand-black border border-brand-white/10 rounded-full text-brand-white hover:bg-brand-white/10 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div>
                <h2 className="text-xl font-display text-brand-white">{user.displayName || 'User'}</h2>
                <p className="text-sm text-brand-gray-400">{user.email}</p>
              </div>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                Authenticated
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-brand-white/5 space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-white/5 text-brand-white text-sm font-medium hover:bg-brand-white/10 transition-colors">
                <UserIcon className="w-4 h-4 text-brand-gray-400" />
                Edit Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-brand-white/5 text-brand-gray-300 hover:text-brand-white text-sm font-medium transition-colors">
                <Settings className="w-4 h-4" />
                Account Settings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-brand-white/5 text-brand-gray-300 hover:text-brand-white text-sm font-medium transition-colors">
                <Shield className="w-4 h-4" />
                Security
              </button>
              <button 
                onClick={logOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 text-sm font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <h1 className="text-3xl font-display text-brand-white mb-2">Welcome to HARIKOS</h1>
            <p className="text-brand-gray-400">Manage your projects, deliverables, and account settings.</p>
          </div>

          {/* Client Portal Placeholder */}
          <div className="bg-brand-white/[0.02] border border-brand-white/[0.05] rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-6 backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl bg-brand-white/[0.05] border border-brand-white/10 flex items-center justify-center">
              <Shield className="w-8 h-8 text-brand-gray-400" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-brand-white mb-2">No active projects yet.</h3>
              <p className="text-sm text-brand-gray-400 max-w-sm mx-auto">
                Start a project to begin working with our team and track your progress here.
              </p>
            </div>
            <a 
              href="/#contact"
              className="px-6 py-3 bg-brand-white text-brand-black text-sm font-semibold tracking-wide rounded-xl hover:bg-brand-gray-300 transition-colors inline-flex items-center gap-2"
            >
              Start a Project
            </a>
          </div>

          <div className="bg-brand-white/[0.02] border border-brand-white/[0.05] rounded-3xl p-8 backdrop-blur-xl space-y-8">
            <div>
              <h3 className="text-lg font-medium text-brand-white mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-widest pl-1">Display Name</label>
                  <input 
                    type="text" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-brand-white/[0.02] border border-brand-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-brand-white focus:outline-none focus:border-brand-white/30 focus:bg-brand-white/[0.04] transition-all" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-widest pl-1">Email Address</label>
                  <input type="email" defaultValue={user.email || ''} readOnly className="w-full bg-brand-white/[0.01] border border-brand-white/[0.03] rounded-xl px-4 py-3.5 text-sm text-brand-gray-500 focus:outline-none cursor-not-allowed" />
                  <p className="text-[10px] text-brand-gray-600 px-1 mt-1">Managed by Google Authentication.</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-4">
                {saveSuccess && (
                  <span className="text-sm text-emerald-400 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Saved
                  </span>
                )}
                <button 
                  onClick={handleUpdateProfile}
                  disabled={isSaving || displayName === user.displayName}
                  className="px-6 py-2.5 bg-brand-white text-brand-black text-sm font-medium rounded-lg hover:bg-brand-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin"></div>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>

            <div className="pt-8 border-t border-brand-white/5">
              <h3 className="text-lg font-medium text-brand-white mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-brand-white/5 bg-brand-white/[0.01]">
                  <div>
                    <p className="text-sm font-medium text-brand-white">Theme Preference</p>
                    <p className="text-xs text-brand-gray-500 mt-1">Select your interface theme.</p>
                  </div>
                  <select className="bg-brand-black border border-brand-white/10 rounded-lg px-3 py-2 text-sm text-brand-white focus:outline-none">
                    <option>Dark Mode</option>
                    <option>System Default</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-brand-white/5 bg-brand-white/[0.01]">
                  <div>
                    <p className="text-sm font-medium text-brand-white">Notifications</p>
                    <p className="text-xs text-brand-gray-500 mt-1">Manage email and push notifications.</p>
                  </div>
                  <button className="px-4 py-2 border border-brand-white/10 text-brand-white text-sm font-medium rounded-lg hover:bg-brand-white/5 transition-colors">
                    Configure
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-brand-white/5">
              <h3 className="text-lg font-medium text-red-400 mb-4">Danger Zone</h3>
              <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-brand-white">Delete Account</p>
                  <p className="text-xs text-brand-gray-500 mt-1">Permanently remove your account and all associated data.</p>
                </div>
                <button 
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 text-sm font-medium rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin"></div>
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  Delete Account
                </button>
              </div>
            </div>
            
            <div className="pt-8 text-center text-xs text-brand-gray-600 font-mono">
              Account created: {creationDate}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
