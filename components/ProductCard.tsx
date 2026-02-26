import React from 'react'
import { Product } from '../lib/entities/Product'

interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const addToCart = () => {
        fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: product.id })
        }).then(res => {
            if (res.ok) {
                alert('Added to cart!')
            }
        })
    }

    return (
        <div className="border rounded-lg p-4 shadow-md">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            <button onClick={addToCart} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                Add to Cart
            </button>
        </div>
    )
}

export default ProductCard
