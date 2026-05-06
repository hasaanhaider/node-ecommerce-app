'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  MapPin,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  Package,
  Sparkles,
} from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

const navItems = [
  { label: 'Overview',   href: '/dashboard',           icon: LayoutDashboard, color: 'from-pink-500 to-rose-500' },
  { label: 'My Orders',  href: '/dashboard/orders',    icon: ShoppingBag,     color: 'from-violet-500 to-purple-500' },
  { label: 'Wishlist',   href: '/dashboard/wishlist',  icon: Heart,           color: 'from-red-500 to-pink-500' },
  { label: 'Addresses',  href: '/dashboard/addresses', icon: MapPin,          color: 'from-blue-500 to-cyan-500' },
  { label: 'Profile',    href: '/dashboard/profile',   icon: User,            color: 'from-emerald-500 to-teal-500' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout, hydrate } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    hydrate()
    setMounted(true)
  }, [hydrate])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const currentPage = navItems.find(n => n.href === pathname)?.label ?? 'Dashboard'

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 30%, #ede9fe 60%, #e0f2fe 100%)' }}>
      {/* Ambient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl animate-float" style={{ background: 'radial-gradient(circle, #ec4899, #f43f5e)' }} />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full opacity-15 blur-3xl animate-float delay-300" style={{ background: 'radial-gradient(circle, #8b5cf6, #6366f1)' }} />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full opacity-10 blur-3xl animate-float delay-500" style={{ background: 'radial-gradient(circle, #06b6d4, #3b82f6)' }} />
      </div>

      {/* ── Centered shell ── */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 w-full max-w-[1280px] mx-auto px-4 lg:px-6 py-4 flex gap-5 items-start">

        {/* ── Mobile overlay ── */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Sidebar ── */}
        <aside
          className={`
            fixed top-0 left-0 z-30 h-full w-64 flex flex-col
            transition-transform duration-300 ease-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:static lg:z-auto
            lg:w-60 lg:flex-shrink-0 lg:h-auto lg:sticky lg:top-4
            lg:rounded-2xl lg:overflow-hidden
          `}
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.7)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          {/* Logo */}
          <div className="flex items-center justify-between px-5 py-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center shadow-lg shadow-pink-200 group-hover:scale-110 transition-transform duration-200">
                <Package size={17} className="text-white" />
              </div>
              <span className="text-lg font-black tracking-tight shimmer-text">ShopZone</span>
            </Link>
            <button
              className="lg:hidden w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={16} />
            </button>
          </div>

          {/* User card */}
          {mounted && (
            <div className="mx-4 mb-4 p-3.5 rounded-2xl animate-fade-in-up" style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(239,68,68,0.08))', border: '1px solid rgba(236,72,153,0.15)' }}>
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-md animate-pulse-glow">
                    {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{user?.name ?? 'User'}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email ?? ''}</p>
                </div>
              </div>
            </div>
          )}

          {/* Nav */}
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">Menu</p>
            {navItems.map(({ label, href, icon: Icon, color }, i) => {
              const active = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    animate-fade-in-left
                    ${active
                      ? 'text-white nav-active-glow'
                      : 'text-gray-600 hover:bg-white/60 hover:text-gray-900 hover:translate-x-1'}
                  `}
                  style={{
                    animationDelay: `${i * 60}ms`,
                    ...(active ? { background: `linear-gradient(135deg, ${color.includes('pink') ? '#ec4899, #ef4444' : color.includes('violet') ? '#8b5cf6, #a855f7' : color.includes('red') ? '#ef4444, #ec4899' : color.includes('blue') ? '#3b82f6, #06b6d4' : '#10b981, #14b8a6'})` } : {}),
                  }}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${active ? 'bg-white/20' : `bg-gradient-to-br ${color} opacity-80`}`}>
                    <Icon size={14} className="text-white" />
                  </div>
                  <span>{label}</span>
                  {active && <ChevronRight size={13} className="ml-auto opacity-70" />}
                </Link>
              )
            })}
          </nav>

          {/* Bottom */}
          <div className="p-3 mt-2">
            <div className="rounded-2xl p-3 mb-3" style={{ background: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', border: '1px solid rgba(236,72,153,0.1)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={13} className="text-pink-500" />
                <span className="text-xs font-semibold text-gray-700">Premium Member</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-1000" style={{ width: '68%' }} />
              </div>
              <p className="text-xs text-gray-500 mt-1.5">680 / 1000 points</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
            >
              <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <LogOut size={14} />
              </div>
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header
            className="sticky top-4 z-10 px-4 py-3 flex items-center gap-4 animate-fade-in-up mb-5 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.82)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.7)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
            }}
          >
            <button
              className="lg:hidden w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-white transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={18} />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-gray-400 font-medium">Dashboard</span>
              {currentPage !== 'Overview' && (
                <>
                  <ChevronRight size={13} className="text-gray-300" />
                  <span className="text-gray-800 font-semibold">{currentPage}</span>
                </>
              )}
            </div>

            <div className="ml-auto flex items-center gap-2.5">
              {/* Search */}
              <div
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-400 w-44 cursor-pointer hover:bg-white transition-colors"
                style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(0,0,0,0.07)' }}
              >
                <Search size={14} />
                <span className="text-xs">Search…</span>
              </div>

              {/* Notifications */}
              <button
                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-500 hover:bg-white transition-all hover:scale-105"
                style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(0,0,0,0.07)' }}
              >
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              </button>

              {/* Avatar */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-pink-200 cursor-pointer hover:scale-105 transition-transform">
                {user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1">
            {children}
          </main>
        </div>

        </div>{/* end centered shell inner */}
      </div>{/* end centered shell */}
    </div>
  )
}
