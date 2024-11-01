'use client'
import { useEffect, useState } from 'react'

import Image from 'next/image'

import { useCartStore } from '@/store'
import { QuantitySelector } from '@/components'
import Link from 'next/link'

export const ProductsInCart = () => {
	const productsInCart = useCartStore((state) => state.cart)
	const updateProductQuantity = useCartStore(
		(state) => state.updateProductQuantity,
	)
	const removeProduct = useCartStore((state) => state.removeProduct)

	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		setLoaded(true)
	})

	if (!loaded) {
		return <p>Loading...</p>
	}

	return (
		<>
			{productsInCart.map((product) => (
				<div key={`${product.slug}-${product.size}`} className="mb-5 flex">
					<Image
						src={`/products/${product.image}`}
						width={100}
						height={100}
						style={{
							width: '100px',
							height: '100px',
						}}
						alt={product.title}
						className="mr-5 rounded"
					/>

					<div>
						<Link
							className="cursor-pointer hover:underline"
							href={`/product/${product.slug} `}
						>
							{product.size} - {product.title}
						</Link>

						<p>${product.price}</p>
						<QuantitySelector
							quantity={product.quantity}
							onQuantityChanged={(quantity) =>
								updateProductQuantity(product, quantity)
							}
						/>

						<button
							onClick={() => removeProduct(product)}
							className="mt-3 underline"
						>
							Remover
						</button>
					</div>
				</div>
			))}
		</>
	)
}
