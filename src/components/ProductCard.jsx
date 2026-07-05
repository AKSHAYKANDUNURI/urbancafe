import React from 'react'
import { FiPlus } from 'react-icons/fi'

import coffeeImg    from '../assets/products/coffee.jpg'
import teaImg       from '../assets/products/tea.jpg'
import pastriesImg  from '../assets/products/pastries.jpg'
import sandwichImg  from '../assets/products/sandwiches.jpg'
import smoothieImg  from '../assets/products/smoothies.jpg'
import snacksImg    from '../assets/products/snacks.jpg'

const CATEGORY_IMAGES = {
  Coffee:     coffeeImg,
  Tea:        teaImg,
  Pastries:   pastriesImg,
  Sandwiches: sandwichImg,
  Smoothies:  smoothieImg,
  Snacks:     snacksImg,
}

const DEFAULT_IMAGE = coffeeImg

export default function ProductCard({ product, onAdd, index = 0 }) {
  const img = CATEGORY_IMAGES[product.category] || DEFAULT_IMAGE
  const canAdd = product.available !== false

  return (
    <div
      className="product-card group"
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={() => canAdd && onAdd(product)}
    >
      <div className="product-image overflow-hidden rounded-xl">
        <img
          src={img}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
      </div>
      <div className="mt-4 relative z-10">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-base sm:text-lg font-semibold truncate font-body">{product.name}</div>
            {product.category ? (
              <div className="text-xs text-stone-500 uppercase tracking-wide">{product.category}</div>
            ) : null}
          </div>
          <div className="font-display text-lg font-semibold text-royal-gold shrink-0">{product.price}</div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className={`tag ${product.available ? 'tag-available' : 'tag-unavailable'}`}>
            {product.available ? 'Available' : 'Out of stock'}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); if (canAdd) onAdd(product) }}
            disabled={!canAdd}
            className="btn-primary flex items-center gap-1.5 text-sm py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiPlus /> {canAdd ? 'Add' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  )
}
