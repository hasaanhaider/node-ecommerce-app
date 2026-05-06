'use client'
import React, { useState } from 'react'
import {
  ShoppingBag,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  ChevronDown,
  Eye,
  RotateCcw,
  Star,
  SlidersHorizontal,
} from 'lucide-react'

const allOrders = [
  {
    id: '#ORD-7821',
    product: 'Nike Air Max 270',
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop',
    date: 'May 4, 2026',
    amount: '$129.99',
    qty: 1,
    status: 'Delivered',
    paymentMethod: 'Visa •••• 4242',
  },
  {
    id: '#ORD-7820',
    product: 'Apple AirPods Pro',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=80&h=80&fit=crop',
    date: 'May 2, 2026',
    amount: '$249.00',
    qty: 1,
    status: 'Shipped',
    paymentMethod: 'Mastercard •••• 8821',
  },
  {
    id: '#ORD-7815',
    product: 'Sony WH-1000XM5',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop',
    date: 'Apr 28, 2026',
    amount: '$349.00',
    qty: 1,
    status: 'Processing',
    paymentMethod: 'PayPal',
  },
  {
    id: '#ORD-7810',
    product: "Levi's 501 Jeans",
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=80&h=80&fit=crop',
    date: 'Apr 22, 2026',
    amount: '$79.99',
    qty: 2,
    status: 'Cancelled',
    paymentMethod: 'Visa •••• 4242',
  },
  {
    id: '#ORD-7805',
    product: 'Leather Crossbody Bag',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=80&h=80&fit=crop',
    date: 'Apr 15, 2026',
    amount: '$89.00',
    qty: 1,
    status: 'Delivered',
    paymentMethod: 'Visa •••• 4242',
  },
  {
    id: '#ORD-7800',
    product: 'Ray-Ban Aviator Classic',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=80&h=80&fit=crop',
    date: 'Apr 10, 2026',
    amount: '$154.00',
    qty: 1,
    status: 'Delivered',
    paymentMethod: 'Mastercard •••• 8821',
  },
]

const statusConfig: Record<string, { icon: any; pill: string; dot: string; label: string }> = {
  Delivered:  { icon: CheckCircle, pill: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500', label: 'Delivered' },
  Shipped:    { icon: Truck,        pill: 'text-blue-700 bg-blue-50 border-blue-200',         dot: 'bg-blue-500',    label: 'Shipped' },
  Processing: { icon: Clock,        pill: 'text-amber-700 bg-amber-50 border-amber-200',      dot: 'bg-amber-500',   label: 'Processing' },
  Cancelled:  { icon: XCircle,      pill: 'text-red-700 bg-red-50 border-red-200',            dot: 'bg-red-500',     label: 'Cancelled' },
}

const filters = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

const filterColors: Record<string, string> = {
  All:        'from-pink-500 to-rose-500',
  Processing: 'from-amber-500 to-orange-500',
  Shipped:    'from-blue-500 to-cyan-500',
  Delivered:  'from-emerald-500 to-teal-500',
  Cancelled:  'from-red-500 to-rose-600',
}

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const filtered = allOrders.filter(o => {
    const matchStatus = activeFilter === 'All' || o.status === activeFilter
    const matchSearch = o.product.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Orders</h1>
        <p className="text-sm text-gray-500 mt-1">Track and manage all your purchases</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-100">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product or order ID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition"
            style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
          <SlidersHorizontal size={14} className="text-gray-400 flex-shrink-0" />
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeFilter === f
                  ? 'text-white shadow-md hover:-translate-y-0.5'
                  : 'text-gray-600 hover:bg-white/80'
              }`}
              style={activeFilter === f
                ? { background: `linear-gradient(135deg, ${filterColors[f].includes('pink') ? '#ec4899,#f43f5e' : filterColors[f].includes('amber') ? '#f59e0b,#f97316' : filterColors[f].includes('blue') ? '#3b82f6,#06b6d4' : filterColors[f].includes('emerald') ? '#10b981,#14b8a6' : '#ef4444,#f43f5e'})`, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }
                : { background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.9)' }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <div
          className="rounded-2xl p-14 text-center animate-scale-in"
          style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.9)' }}
        >
          <ShoppingBag size={44} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500 font-semibold">No orders found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order, i) => {
            const cfg = statusConfig[order.status]
            const StatusIcon = cfg.icon
            const isExpanded = expandedOrder === order.id

            return (
              <div
                key={order.id}
                className="rounded-2xl overflow-hidden animate-fade-in-up hover:-translate-y-0.5 transition-all duration-200"
                style={{
                  animationDelay: `${200 + i * 60}ms`,
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.9)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
                }}
              >
                {/* Main row */}
                <div className="flex items-center gap-4 p-4 sm:p-5">
                  <div className="relative flex-shrink-0">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-sm"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${cfg.dot}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{order.product}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{order.id} · {order.date} · Qty: {order.qty}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0 ${cfg.pill}`}>
                        <StatusIcon size={11} />
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-base font-black text-gray-900">{order.amount}</p>
                      <button
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        className="flex items-center gap-1 text-xs font-semibold text-pink-500 hover:text-pink-600 transition-colors"
                      >
                        Details
                        <ChevronDown size={13} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div
                    className="px-5 py-4 space-y-4 animate-slide-down"
                    style={{ borderTop: '1px solid rgba(0,0,0,0.05)', background: 'rgba(248,250,252,0.8)' }}
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {[
                        { label: 'Category', value: order.category },
                        { label: 'Payment', value: order.paymentMethod },
                        { label: 'Order Date', value: order.date },
                      ].map(({ label, value }) => (
                        <div key={label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.7)' }}>
                          <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                          <p className="text-sm font-semibold text-gray-800">{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Progress tracker */}
                    {order.status !== 'Cancelled' && (
                      <div className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.7)' }}>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Order Progress</p>
                        <div className="flex items-center">
                          {['Placed', 'Processing', 'Shipped', 'Delivered'].map((step, i) => {
                            const steps = ['Placed', 'Processing', 'Shipped', 'Delivered']
                            const currentIdx = steps.indexOf(order.status === 'Processing' ? 'Processing' : order.status)
                            const done = i <= currentIdx
                            return (
                              <React.Fragment key={step}>
                                <div className="flex flex-col items-center">
                                  <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${done ? 'text-white border-transparent' : 'bg-white border-gray-200 text-gray-300'}`}
                                    style={done ? { background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 2px 8px rgba(236,72,153,0.4)' } : {}}
                                  >
                                    {done ? '✓' : i + 1}
                                  </div>
                                  <p className={`text-xs mt-1.5 font-medium ${done ? 'text-pink-600' : 'text-gray-400'}`}>{step}</p>
                                </div>
                                {i < 3 && (
                                  <div className="flex-1 h-0.5 mx-1 mb-5 rounded-full overflow-hidden bg-gray-200">
                                    <div
                                      className="h-full rounded-full transition-all duration-500"
                                      style={{
                                        width: i < currentIdx ? '100%' : '0%',
                                        background: 'linear-gradient(90deg, #ec4899, #ef4444)',
                                      }}
                                    />
                                  </div>
                                )}
                              </React.Fragment>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-pink-600 transition-all hover:-translate-y-0.5"
                        style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.08)' }}>
                        <Eye size={13} /> View Invoice
                      </button>
                      {order.status === 'Delivered' && (
                        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-amber-600 transition-all hover:-translate-y-0.5"
                          style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.08)' }}>
                          <Star size={13} /> Write Review
                        </button>
                      )}
                      {(order.status === 'Delivered' || order.status === 'Cancelled') && (
                        <button
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white hover:-translate-y-0.5 transition-all"
                          style={{ background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 2px 8px rgba(236,72,153,0.3)' }}
                        >
                          <RotateCcw size={13} /> Reorder
                        </button>
                      )}
                      {order.status === 'Processing' && (
                        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-all hover:-translate-y-0.5"
                          style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(239,68,68,0.2)' }}>
                          <XCircle size={13} /> Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
