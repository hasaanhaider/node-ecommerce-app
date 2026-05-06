'use client'
import { useState } from 'react'
import {
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Home,
  Briefcase,
  CheckCircle,
  X,
  Star,
} from 'lucide-react'

interface Address {
  id: number
  label: string
  type: 'Home' | 'Work' | 'Other'
  fullName: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}

const initialAddresses: Address[] = [
  {
    id: 1,
    label: 'Home',
    type: 'Home',
    fullName: 'John Doe',
    phone: '+1 (555) 123-4567',
    line1: '123 Maple Street',
    line2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Office',
    type: 'Work',
    fullName: 'John Doe',
    phone: '+1 (555) 987-6543',
    line1: '456 Business Ave',
    city: 'New York',
    state: 'NY',
    zip: '10018',
    country: 'United States',
    isDefault: false,
  },
  {
    id: 3,
    label: "Mom's Place",
    type: 'Other',
    fullName: 'Jane Doe',
    phone: '+1 (555) 246-8101',
    line1: '789 Oak Lane',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11201',
    country: 'United States',
    isDefault: false,
  },
]

const typeConfig = {
  Home:  { icon: Home,      gradient: 'from-pink-500 to-rose-500',    glow: 'rgba(236,72,153,0.3)',  bg: 'rgba(236,72,153,0.08)'  },
  Work:  { icon: Briefcase, gradient: 'from-blue-500 to-cyan-500',    glow: 'rgba(59,130,246,0.3)',  bg: 'rgba(59,130,246,0.08)'  },
  Other: { icon: MapPin,    gradient: 'from-violet-500 to-purple-500', glow: 'rgba(139,92,246,0.3)', bg: 'rgba(139,92,246,0.08)' },
}

const emptyForm: Omit<Address, 'id' | 'isDefault'> = {
  label: '',
  type: 'Home',
  fullName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States',
}

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

  const openAdd = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowModal(true)
  }

  const openEdit = (addr: Address) => {
    const { id, isDefault, ...rest } = addr
    setForm(rest)
    setEditingId(id)
    setShowModal(true)
  }

  const handleSave = () => {
    if (!form.fullName || !form.line1 || !form.city || !form.zip) return
    if (editingId !== null) {
      setAddresses(prev => prev.map(a => a.id === editingId ? { ...a, ...form } : a))
    } else {
      setAddresses(prev => [...prev, { ...form, id: Date.now(), isDefault: prev.length === 0 }])
    }
    setShowModal(false)
  }

  const handleDelete = (id: number) => {
    setAddresses(prev => {
      const next = prev.filter(a => a.id !== id)
      if (next.length > 0 && !next.some(a => a.isDefault)) next[0].isDefault = true
      return next
    })
    setDeleteConfirm(null)
  }

  const setDefault = (id: number) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })))
  }

  const field = (label: string, key: keyof typeof form, placeholder?: string, half?: boolean) => (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={(form[key] as string) ?? ''}
        onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
        className="w-full px-3.5 py-2.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition"
        style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(0,0,0,0.08)' }}
      />
    </div>
  )

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Saved Addresses</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your delivery addresses</p>
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:-translate-y-0.5 transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 4px 15px rgba(236,72,153,0.4)' }}
        >
          <Plus size={16} />
          Add New Address
        </button>
      </div>

      {/* Cards */}
      {addresses.length === 0 ? (
        <div
          className="rounded-2xl p-14 text-center animate-scale-in"
          style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.9)' }}
        >
          <MapPin size={44} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500 font-semibold">No addresses saved</p>
          <button onClick={openAdd} className="mt-4 px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:-translate-y-0.5 transition-all"
            style={{ background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 4px 12px rgba(236,72,153,0.3)' }}>
            Add Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {addresses.map((addr, i) => {
            const cfg = typeConfig[addr.type]
            const Icon = cfg.icon
            return (
              <div
                key={addr.id}
                className={`rounded-2xl overflow-hidden group animate-fade-in-up hover:-translate-y-1 transition-all duration-300`}
                style={{
                  animationDelay: `${i * 80}ms`,
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(16px)',
                  border: addr.isDefault ? '1.5px solid rgba(236,72,153,0.3)' : '1px solid rgba(255,255,255,0.9)',
                  boxShadow: addr.isDefault ? `0 4px 24px ${cfg.glow}` : '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                {/* Card top strip */}
                <div
                  className="h-1.5 w-full"
                  style={{ background: `linear-gradient(90deg, ${addr.type === 'Home' ? '#ec4899,#f43f5e' : addr.type === 'Work' ? '#3b82f6,#06b6d4' : '#8b5cf6,#a855f7'})` }}
                />

                <div className="p-5">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${addr.type === 'Home' ? '#ec4899,#f43f5e' : addr.type === 'Work' ? '#3b82f6,#06b6d4' : '#8b5cf6,#a855f7'})`, boxShadow: `0 4px 12px ${cfg.glow}` }}
                      >
                        <Icon size={17} className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{addr.label}</p>
                        <p className="text-xs text-gray-400">{addr.type}</p>
                      </div>
                    </div>
                    {addr.isDefault && (
                      <span
                        className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(239,68,68,0.08))', color: '#ec4899', border: '1px solid rgba(236,72,153,0.2)' }}
                      >
                        <Star size={10} className="fill-current" /> Default
                      </span>
                    )}
                  </div>

                  {/* Address info */}
                  <div className="space-y-1 mb-4">
                    <p className="font-semibold text-gray-900 text-sm">{addr.fullName}</p>
                    <p className="text-xs text-gray-500">{addr.phone}</p>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1.5">
                      {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}<br />
                      {addr.city}, {addr.state} {addr.zip}<br />
                      {addr.country}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefault(addr.id)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-pink-600 transition-all hover:-translate-y-0.5"
                        style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(0,0,0,0.07)' }}
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => openEdit(addr)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-blue-600 transition-all hover:-translate-y-0.5"
                      style={{ background: 'rgba(248,250,252,0.8)', border: '1px solid rgba(0,0,0,0.07)' }}
                    >
                      <Pencil size={12} /> Edit
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(addr.id)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all hover:-translate-y-0.5"
                      style={{ border: '1px solid rgba(0,0,0,0.07)' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Add new card */}
          <button
            onClick={openAdd}
            className="rounded-2xl p-8 flex flex-col items-center justify-center gap-3 group hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
            style={{
              animationDelay: `${addresses.length * 80}ms`,
              border: '2px dashed rgba(236,72,153,0.25)',
              background: 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
              style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(239,68,68,0.08))', border: '1.5px dashed rgba(236,72,153,0.3)' }}
            >
              <Plus size={20} className="text-pink-400 group-hover:text-pink-500 transition-colors" />
            </div>
            <span className="text-sm font-semibold text-gray-400 group-hover:text-pink-500 transition-colors">Add New Address</span>
          </button>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
          <div
            className="w-full max-w-sm rounded-2xl p-6 animate-scale-in"
            style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="font-black text-gray-900 text-lg text-center">Delete Address?</h3>
            <p className="text-sm text-gray-500 mt-1 text-center">This action cannot be undone.</p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                style={{ border: '1px solid rgba(0,0,0,0.1)' }}>
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold hover:-translate-y-0.5 transition-all"
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 4px 12px rgba(239,68,68,0.3)' }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
          <div
            className="w-full max-w-lg rounded-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
            style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <div>
                <h3 className="font-black text-gray-900">{editingId ? 'Edit Address' : 'Add New Address'}</h3>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the details below</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-2 gap-4">
              {/* Type selector */}
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Address Type</label>
                <div className="flex gap-2">
                  {(['Home', 'Work', 'Other'] as const).map(t => {
                    const cfg = typeConfig[t]
                    return (
                      <button
                        key={t}
                        onClick={() => setForm(prev => ({ ...prev, type: t }))}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${form.type === t ? 'text-white hover:-translate-y-0.5' : 'text-gray-600 hover:bg-gray-50'}`}
                        style={form.type === t
                          ? { background: `linear-gradient(135deg, ${t === 'Home' ? '#ec4899,#f43f5e' : t === 'Work' ? '#3b82f6,#06b6d4' : '#8b5cf6,#a855f7'})`, boxShadow: `0 4px 12px ${cfg.glow}` }
                          : { border: '1px solid rgba(0,0,0,0.08)', background: 'rgba(248,250,252,0.8)' }
                        }
                      >
                        {t}
                      </button>
                    )
                  })}
                </div>
              </div>

              {field('Label', 'label', 'e.g. Home, Office…')}
              {field('Full Name', 'fullName', 'John Doe')}
              {field('Phone Number', 'phone', '+1 (555) 000-0000')}
              {field('Address Line 1', 'line1', '123 Main Street')}
              {field('Address Line 2 (optional)', 'line2', 'Apt, Suite, Floor…')}
              {field('City', 'city', 'New York', true)}
              {field('State', 'state', 'NY', true)}
              {field('ZIP Code', 'zip', '10001', true)}
              {field('Country', 'country', 'United States', true)}
            </div>

            <div className="px-6 pb-6 flex gap-3">
              <button onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                style={{ border: '1px solid rgba(0,0,0,0.1)' }}>
                Cancel
              </button>
              <button onClick={handleSave}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold hover:-translate-y-0.5 transition-all"
                style={{ background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 4px 12px rgba(236,72,153,0.3)' }}>
                {editingId ? 'Save Changes' : 'Add Address'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
