import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { Product } from '../lib/entities/Product'

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err))
    }, [])

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-4">E-Commerce Store</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default HomePage
