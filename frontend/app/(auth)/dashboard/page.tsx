'use client'
import Link from 'next/link'
import {
  ShoppingBag,
  Heart,
  MapPin,
  TrendingUp,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Star,
  Truck,
  ArrowUpRight,
  Zap,
} from 'lucide-react'

const stats = [
  {
    label: 'Total Orders',
    value: '24',
    change: '+3 this month',
    icon: ShoppingBag,
    gradient: 'from-pink-500 to-rose-500',
    glow: 'rgba(236,72,153,0.25)',
    delay: 'delay-100',
  },
  {
    label: 'Wishlist Items',
    value: '12',
    change: '4 on sale now',
    icon: Heart,
    gradient: 'from-violet-500 to-purple-500',
    glow: 'rgba(139,92,246,0.25)',
    delay: 'delay-200',
  },
  {
    label: 'Saved Addresses',
    value: '3',
    change: '1 default set',
    icon: MapPin,
    gradient: 'from-blue-500 to-cyan-500',
    glow: 'rgba(59,130,246,0.25)',
    delay: 'delay-300',
  },
  {
    label: 'Total Spent',
    value: '$1,248',
    change: '+$320 this month',
    icon: TrendingUp,
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.25)',
    delay: 'delay-400',
  },
]

const recentOrders = [
  {
    id: '#ORD-7821',
    product: 'Nike Air Max 270',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop',
    date: 'May 4, 2026',
    amount: '$129.99',
    status: 'Delivered',
    statusIcon: CheckCircle,
    statusColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
  },
  {
    id: '#ORD-7820',
    product: 'Apple AirPods Pro',
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=80&h=80&fit=crop',
    date: 'May 2, 2026',
    amount: '$249.00',
    status: 'Shipped',
    statusIcon: Truck,
    statusColor: 'text-blue-600 bg-blue-50 border-blue-100',
  },
  {
    id: '#ORD-7815',
    product: 'Sony WH-1000XM5',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
    date: 'Apr 28, 2026',
    amount: '$349.00',
    status: 'Processing',
    statusIcon: Clock,
    statusColor: 'text-amber-600 bg-amber-50 border-amber-100',
  },
  {
    id: '#ORD-7810',
    product: "Levi's 501 Jeans",
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=80&h=80&fit=crop',
    date: 'Apr 22, 2026',
    amount: '$79.99',
    status: 'Cancelled',
    statusIcon: XCircle,
    statusColor: 'text-red-600 bg-red-50 border-red-100',
  },
]

const wishlistPreview = [
  {
    name: 'Adidas Ultraboost 22',
    price: '$189.99',
    originalPrice: '$220.00',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=80&h=80&fit=crop',
    rating: 4.8,
    onSale: true,
  },
  {
    name: 'Ray-Ban Aviator',
    price: '$154.00',
    originalPrice: '$154.00',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80&h=80&fit=crop',
    rating: 4.6,
    onSale: false,
  },
  {
    name: 'Leather Crossbody Bag',
    price: '$89.00',
    originalPrice: '$120.00',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=80&h=80&fit=crop',
    rating: 4.7,
    onSale: true,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Welcome back <span className="animate-float inline-block">👋</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Here's what's happening with your account today.</p>
        </div>
        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 4px 15px rgba(236,72,153,0.4)' }}
        >
          <ShoppingBag size={16} />
          Track Orders
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, icon: Icon, gradient, glow, delay }) => (
          <div
            key={label}
            className={`relative overflow-hidden rounded-2xl p-5 cursor-pointer group animate-fade-in-up ${delay} hover:-translate-y-1 transition-all duration-300`}
            style={{
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.9)',
              boxShadow: `0 4px 20px ${glow}`,
            }}
          >
            {/* Glow orb */}
            <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity blur-xl`} />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</p>
                <p className="text-3xl font-black text-gray-900 mt-1.5 animate-count-up">{value}</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <ArrowUpRight size={12} className="text-emerald-500" />
                  <p className="text-xs font-semibold text-emerald-600">{change}</p>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                style={{ boxShadow: `0 4px 12px ${glow}` }}>
                <Icon size={20} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders + Wishlist */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Recent Orders */}
        <div
          className="xl:col-span-2 rounded-2xl overflow-hidden animate-fade-in-up delay-200"
          style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-sm">
                <Package size={15} className="text-white" />
              </div>
              <h2 className="font-bold text-gray-900">Recent Orders</h2>
            </div>
            <Link href="/dashboard/orders" className="flex items-center gap-1 text-xs font-semibold text-pink-500 hover:text-pink-600 transition-colors group">
              View all <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div>
            {recentOrders.map((order, i) => {
              const StatusIcon = order.statusIcon
              return (
                <div
                  key={order.id}
                  className={`flex items-center gap-4 px-5 py-3.5 hover:bg-white/60 transition-all duration-200 cursor-pointer group animate-fade-in-up`}
                  style={{ animationDelay: `${300 + i * 80}ms`, borderBottom: i < recentOrders.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-12 h-12 rounded-xl object-cover border border-white shadow-sm group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{order.product}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.id} · {order.date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-gray-900">{order.amount}</p>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border mt-1 ${order.statusColor}`}>
                      <StatusIcon size={10} />
                      {order.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Wishlist Preview */}
        <div
          className="rounded-2xl overflow-hidden flex flex-col animate-fade-in-up delay-300"
          style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center shadow-sm">
                <Heart size={15} className="text-white" />
              </div>
              <h2 className="font-bold text-gray-900">Wishlist</h2>
            </div>
            <Link href="/dashboard/wishlist" className="flex items-center gap-1 text-xs font-semibold text-pink-500 hover:text-pink-600 transition-colors group">
              View all <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="flex-1">
            {wishlistPreview.map((item, i) => (
              <div
                key={item.name}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/60 transition-all duration-200 cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${400 + i * 80}ms`, borderBottom: i < wishlistPreview.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-11 h-11 rounded-xl object-cover border border-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs text-gray-400">{item.rating}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900">{item.price}</p>
                  {item.onSale && <p className="text-xs text-gray-400 line-through">{item.originalPrice}</p>}
                  {item.onSale && <span className="text-xs font-semibold text-pink-500">Sale</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
            <button
              className="w-full py-2.5 rounded-xl text-white text-sm font-semibold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 4px 12px rgba(236,72,153,0.3)' }}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 text-white animate-fade-in-up delay-400"
        style={{ background: 'linear-gradient(135deg, #ec4899 0%, #ef4444 50%, #f97316 100%)', boxShadow: '0 8px 32px rgba(236,72,153,0.35)' }}
      >
        {/* Decorative elements */}
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 animate-float" />
        <div className="absolute right-20 -bottom-12 w-36 h-36 rounded-full bg-white/10 animate-float delay-300" />
        <div className="absolute right-8 top-4 w-16 h-16 rounded-full bg-white/5 animate-float delay-150" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={14} className="text-yellow-300" />
              <p className="text-xs font-bold uppercase tracking-widest text-white/80">Limited Time Offer</p>
            </div>
            <h3 className="text-2xl font-black">Get 20% off your next order</h3>
            <p className="text-sm text-white/80 mt-1">
              Use code{' '}
              <span className="font-black bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-lg border border-white/30">
                SAVE20
              </span>{' '}
              at checkout
            </p>
          </div>
          <button className="flex-shrink-0 px-6 py-3 bg-white text-pink-600 rounded-xl text-sm font-bold hover:bg-pink-50 hover:scale-105 hover:shadow-xl transition-all duration-200 shadow-lg">
            Shop Now →
          </button>
        </div>
      </div>
    </div>
  )
}
