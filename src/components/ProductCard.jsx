import React from "react";
import { FiPlus } from "react-icons/fi";

export default function ProductCard({ product, onAdd, index = 0 }) {

  const img =
    product.image?.data
      ? `data:${product.image.contentType};base64,${product.image.data}`
      : "https://placehold.co/400x300?text=No+Image";

  const canAdd = product.available !== false;

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
          onError={(e) => {
            e.target.src =
              "https://placehold.co/400x300?text=No+Image";
          }}
        />
      </div>

      <div className="mt-4">
        <div className="flex justify-between">
          <div>
            <div className="font-semibold">{product.name}</div>
            <div className="text-xs text-gray-500">
              {product.category}
            </div>
          </div>

          <div className="text-royal-gold font-bold">
            ₹{product.price}
          </div>
        </div>

        <div className="mt-3 flex justify-between items-center">
          <div
            className={`tag ${
              canAdd
                ? "tag-available"
                : "tag-unavailable"
            }`}
          >
            {canAdd ? "Available" : "Out of Stock"}
          </div>

          <button
            className="btn-primary flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              if (canAdd) onAdd(product);
            }}
          >
            <FiPlus /> Add
          </button>
        </div>
      </div>
    </div>
  );
}