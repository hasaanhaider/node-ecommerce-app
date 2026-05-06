'use client'
import { useState, useEffect } from 'react'
import {
  User,
  Mail,
  Phone,
  Lock,
  Camera,
  Save,
  Eye,
  EyeOff,
  Bell,
  Shield,
  Trash2,
  CheckCircle,
  Sparkles,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export default function ProfilePage() {
  const { user } = useAuthStore()

  const [profile, setProfile] = useState({ name: '', email: '', phone: '', dob: '', gender: '' })
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
  const [showPw, setShowPw] = useState({ current: false, newPass: false, confirm: false })
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    wishlistAlerts: false,
    newsletter: false,
  })
  const [saved, setSaved] = useState(false)
  const [pwSaved, setPwSaved] = useState(false)
  const [pwError, setPwError] = useState('')

  useEffect(() => {
    if (user) setProfile(prev => ({ ...prev, name: user.name ?? '', email: user.email ?? '' }))
  }, [user])

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    setPwError('')
    if (passwords.newPass !== passwords.confirm) { setPwError('New passwords do not match.'); return }
    if (passwords.newPass.length < 8) { setPwError('Password must be at least 8 characters.'); return }
    setPwSaved(true)
    setPasswords({ current: '', newPass: '', confirm: '' })
    setTimeout(() => setPwSaved(false), 3000)
  }

  const togglePw = (f: keyof typeof showPw) => setShowPw(prev => ({ ...prev, [f]: !prev[f] }))

  const inputClass = "w-full px-3.5 py-2.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition"
  const inputStyle = { background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(0,0,0,0.08)' }

  const pwField = (label: string, key: keyof typeof passwords) => (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
      <div className="relative">
        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type={showPw[key] ? 'text' : 'password'}
          placeholder="••••••••"
          value={passwords[key]}
          onChange={e => setPasswords(prev => ({ ...prev, [key]: e.target.value }))}
          className={`${inputClass} pl-10 pr-10`}
          style={inputStyle}
        />
        <button type="button" onClick={() => togglePw(key)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
          {showPw[key] ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  )

  const sectionStyle = {
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,0.9)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  }

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Profile</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your personal information and account settings</p>
      </div>

      {/* Hero card */}
      <div
        className="rounded-2xl p-6 animate-fade-in-up delay-100 relative overflow-hidden"
        style={sectionStyle}
      >
        {/* Subtle gradient bg */}
        <div className="absolute inset-0 opacity-30" style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.05) 0%, rgba(139,92,246,0.05) 100%)' }} />

        <div className="relative flex items-center gap-5">
          <div className="relative flex-shrink-0">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-xl"
              style={{ background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 8px 24px rgba(236,72,153,0.4)' }}
            >
              {profile.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-pink-500 hover:scale-110 transition-all"
              style={{ border: '2px solid rgba(255,255,255,0.9)' }}
            >
              <Camera size={12} />
            </button>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white" />
          </div>
          <div className="flex-1">
            <p className="text-xl font-black text-gray-900">{profile.name || 'Your Name'}</p>
            <p className="text-sm text-gray-500 mt-0.5">{profile.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                <CheckCircle size={11} /> Verified
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-pink-600 px-2.5 py-1 rounded-full"
                style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(239,68,68,0.08))', border: '1px solid rgba(236,72,153,0.15)' }}>
                <Sparkles size={11} /> Premium
              </span>
            </div>
          </div>
          {/* Points */}
          <div className="hidden sm:block text-right">
            <p className="text-2xl font-black text-gray-900">680</p>
            <p className="text-xs text-gray-400 font-medium">Reward Points</p>
            <div className="w-24 h-1.5 rounded-full bg-gray-100 mt-1.5 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: '68%', background: 'linear-gradient(90deg, #ec4899, #ef4444)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info */}
      <div className="rounded-2xl overflow-hidden animate-fade-in-up delay-150" style={sectionStyle}>
        <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-sm">
            <User size={14} className="text-white" />
          </div>
          <h2 className="font-bold text-gray-900">Personal Information</h2>
        </div>
        <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
          {saved && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-emerald-700 text-sm font-medium animate-slide-down"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <CheckCircle size={15} /> Profile updated successfully!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                  className={`${inputClass} pl-10`} style={inputStyle} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                  className={`${inputClass} pl-10`} style={inputStyle} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Phone Number</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="tel" placeholder="+1 (555) 000-0000" value={profile.phone}
                  onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                  className={`${inputClass} pl-10`} style={inputStyle} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Date of Birth</label>
              <input type="date" value={profile.dob} onChange={e => setProfile(p => ({ ...p, dob: e.target.value }))}
                className={inputClass} style={inputStyle} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Gender</label>
              <div className="flex gap-2">
                {['Male', 'Female', 'Prefer not to say'].map(g => (
                  <button key={g} type="button" onClick={() => setProfile(p => ({ ...p, gender: g }))}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${profile.gender === g ? 'text-white hover:-translate-y-0.5' : 'text-gray-600 hover:bg-gray-50'}`}
                    style={profile.gender === g
                      ? { background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 4px 12px rgba(236,72,153,0.3)' }
                      : { border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(248,250,252,0.8)' }
                    }>
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:-translate-y-0.5 transition-all"
              style={{ background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 4px 15px rgba(236,72,153,0.35)' }}>
              <Save size={14} /> Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div className="rounded-2xl overflow-hidden animate-fade-in-up delay-200" style={sectionStyle}>
        <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-sm">
            <Shield size={14} className="text-white" />
          </div>
          <h2 className="font-bold text-gray-900">Change Password</h2>
        </div>
        <form onSubmit={handleChangePassword} className="p-6 space-y-4">
          {pwError && (
            <div className="px-4 py-3 rounded-xl text-red-600 text-sm font-medium animate-slide-down"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
              {pwError}
            </div>
          )}
          {pwSaved && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-emerald-700 text-sm font-medium animate-slide-down"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <CheckCircle size={15} /> Password changed successfully!
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">{pwField('Current Password', 'current')}</div>
            {pwField('New Password', 'newPass')}
            {pwField('Confirm New Password', 'confirm')}
          </div>
          <div className="flex justify-end pt-1">
            <button type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:-translate-y-0.5 transition-all"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #a855f7)', boxShadow: '0 4px 15px rgba(139,92,246,0.35)' }}>
              <Lock size={14} /> Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl overflow-hidden animate-fade-in-up delay-300" style={sectionStyle}>
        <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-sm">
            <Bell size={14} className="text-white" />
          </div>
          <h2 className="font-bold text-gray-900">Notification Preferences</h2>
        </div>
        <div className="p-6 space-y-1">
          {(Object.entries(notifications) as [keyof typeof notifications, boolean][]).map(([key, val], i) => {
            const labels: Record<keyof typeof notifications, { title: string; desc: string }> = {
              orderUpdates:   { title: 'Order Updates',      desc: 'Get notified about your order status changes' },
              promotions:     { title: 'Promotions & Deals', desc: 'Receive exclusive offers and discount codes' },
              wishlistAlerts: { title: 'Wishlist Alerts',    desc: 'Know when wishlist items go on sale' },
              newsletter:     { title: 'Newsletter',         desc: 'Weekly curated picks and style guides' },
            }
            return (
              <div
                key={key}
                className={`flex items-center justify-between py-3.5 px-1 rounded-xl transition-colors hover:bg-gray-50/50 ${i < Object.keys(notifications).length - 1 ? 'border-b border-gray-50' : ''}`}
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{labels[key].title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{labels[key].desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                  className="relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 ml-4"
                  style={val
                    ? { background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 2px 8px rgba(236,72,153,0.3)' }
                    : { background: '#e5e7eb' }
                  }
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300 ${val ? 'left-6' : 'left-0.5'}`} />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Danger Zone */}
      <div
        className="rounded-2xl overflow-hidden animate-fade-in-up delay-400"
        style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(239,68,68,0.15)', boxShadow: '0 4px 20px rgba(239,68,68,0.06)' }}
      >
        <div className="flex items-center gap-3 px-6 py-4" style={{ borderBottom: '1px solid rgba(239,68,68,0.08)' }}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-sm">
            <Trash2 size={14} className="text-white" />
          </div>
          <h2 className="font-bold text-gray-900">Danger Zone</h2>
        </div>
        <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Delete Account</p>
            <p className="text-xs text-gray-500 mt-0.5">Permanently delete your account and all data. This cannot be undone.</p>
          </div>
          <button
            className="flex-shrink-0 px-4 py-2.5 rounded-xl text-red-500 text-sm font-bold hover:bg-red-50 hover:-translate-y-0.5 transition-all"
            style={{ border: '1.5px solid rgba(239,68,68,0.25)' }}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}
