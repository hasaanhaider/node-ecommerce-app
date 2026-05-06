'use client'
import { useState } from 'react'
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  Search,
  Tag,
  Share2,
  Check,
} from 'lucide-react'

const initialWishlist = [
  {
    id: 1,
    name: 'Adidas Ultraboost 22',
    category: 'Footwear',
    price: 189.99,
    originalPrice: 220.00,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 2341,
    inStock: true,
    discount: 14,
  },
  {
    id: 2,
    name: 'Ray-Ban Aviator Classic',
    category: 'Accessories',
    price: 154.00,
    originalPrice: 154.00,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 987,
    inStock: true,
    discount: 0,
  },
  {
    id: 3,
    name: 'Leather Crossbody Bag',
    category: 'Bags',
    price: 89.00,
    originalPrice: 120.00,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 543,
    inStock: true,
    discount: 26,
  },
  {
    id: 4,
    name: 'Apple Watch Series 9',
    category: 'Electronics',
    price: 399.00,
    originalPrice: 429.00,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 5621,
    inStock: false,
    discount: 7,
  },
  {
    id: 5,
    name: 'Linen Blazer',
    category: 'Clothing',
    price: 119.00,
    originalPrice: 119.00,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 312,
    inStock: true,
    discount: 0,
  },
  {
    id: 6,
    name: 'Minimalist Desk Lamp',
    category: 'Home',
    price: 64.99,
    originalPrice: 85.00,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 218,
    inStock: true,
    discount: 24,
  },
]

export default function WishlistPage() {
  const [items, setItems] = useState(initialWishlist)
  const [search, setSearch] = useState('')
  const [addedToCart, setAddedToCart] = useState<number[]>([])
  const [removing, setRemoving] = useState<number[]>([])

  const filtered = items.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  )

  const removeItem = (id: number) => {
    setRemoving(prev => [...prev, id])
    setTimeout(() => setItems(prev => prev.filter(i => i.id !== id)), 300)
  }

  const handleAddToCart = (id: number) => {
    setAddedToCart(prev => [...prev, id])
    setTimeout(() => setAddedToCart(prev => prev.filter(i => i !== id)), 2500)
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Wishlist</h1>
          <p className="text-sm text-gray-500 mt-1">{items.length} saved items</p>
        </div>
        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:-translate-y-0.5 transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
        >
          <Share2 size={15} />
          Share Wishlist
        </button>
      </div>

      {/* Search */}
      <div className="relative animate-fade-in-up delay-100">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search wishlist…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition"
          style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}
        />
      </div>

      {/* Sale banner */}
      {items.some(i => i.discount > 0) && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl animate-fade-in-up delay-150"
          style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(239,68,68,0.06))', border: '1px solid rgba(236,72,153,0.15)' }}
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center flex-shrink-0">
            <Tag size={13} className="text-white" />
          </div>
          <p className="text-sm text-pink-700 font-medium">
            <span className="font-bold">{items.filter(i => i.discount > 0).length} items</span> in your wishlist are currently on sale!
          </p>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          className="rounded-2xl p-14 text-center animate-scale-in"
          style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.9)' }}
        >
          <Heart size={44} className="mx-auto text-gray-200 mb-3" />
          <p className="text-gray-500 font-semibold">Your wishlist is empty</p>
          <p className="text-sm text-gray-400 mt-1">Save items you love to buy them later</p>
          <button
            className="mt-4 px-5 py-2.5 rounded-xl text-white text-sm font-semibold hover:-translate-y-0.5 transition-all"
            style={{ background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 4px 12px rgba(236,72,153,0.3)' }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item, i) => {
            const inCart = addedToCart.includes(item.id)
            const isRemoving = removing.includes(item.id)
            return (
              <div
                key={item.id}
                className={`rounded-2xl overflow-hidden group animate-fade-in-up hover:-translate-y-1 transition-all duration-300 ${isRemoving ? 'opacity-0 scale-95' : ''}`}
                style={{
                  animationDelay: `${200 + i * 70}ms`,
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.9)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  transitionDuration: isRemoving ? '300ms' : undefined,
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {item.discount > 0 && (
                      <span
                        className="text-white text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 2px 8px rgba(236,72,153,0.4)' }}
                      >
                        -{item.discount}%
                      </span>
                    )}
                    {!item.inStock && (
                      <span className="bg-gray-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={13} />
                  </button>

                  {/* Heart */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart size={13} className="text-pink-500 fill-pink-500" />
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.category}</p>
                  <p className="font-bold text-gray-900 mt-1 text-sm leading-snug">{item.name}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <div className="flex">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={11}
                          className={idx < Math.floor(item.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400 font-medium">({item.reviews.toLocaleString()})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-2.5">
                    <span className="text-xl font-black text-gray-900">${item.price.toFixed(2)}</span>
                    {item.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                    )}
                    {item.discount > 0 && (
                      <span className="text-xs font-bold text-pink-500 bg-pink-50 px-1.5 py-0.5 rounded-lg">Save ${(item.originalPrice - item.price).toFixed(0)}</span>
                    )}
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    disabled={!item.inStock}
                    className={`w-full mt-3 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                      !item.inStock
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : inCart
                        ? 'text-white'
                        : 'text-white hover:-translate-y-0.5 hover:shadow-lg'
                    }`}
                    style={
                      !item.inStock ? {} :
                      inCart
                        ? { background: 'linear-gradient(135deg, #10b981, #14b8a6)', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }
                        : { background: 'linear-gradient(135deg, #ec4899, #ef4444)', boxShadow: '0 4px 12px rgba(236,72,153,0.3)' }
                    }
                  >
                    {inCart ? <Check size={15} /> : <ShoppingCart size={15} />}
                    {!item.inStock ? 'Out of Stock' : inCart ? 'Added to Cart!' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
