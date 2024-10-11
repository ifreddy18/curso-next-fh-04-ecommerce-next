'use client'

import { useState } from 'react'

import { QuantitySelector, SizeSelector } from '@/components'
import type { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/store'

interface Props {
	product: Product
}

export const AddToCart = ({ product }: Props) => {
	const addProductToCart = useCartStore((state) => state.addProductTocart)

	const [selectedSize, setSelectedSize] = useState<Size | undefined>()
	const [selectedQuantity, setSelectedQuantity] = useState<number>(1)
	const [wasSubmited, setWasSubmited] = useState(false)

	const addToCart = () => {
		setWasSubmited(true)

		if (!selectedSize) return

		const cartProduct: CartProduct = {
			id: product.id,
			slug: product.slug,
			title: product.title,
			price: product.price,
			image: product.images[0],
			quantity: selectedQuantity,
			size: selectedSize,
		}

		addProductToCart(cartProduct)
		setWasSubmited(false)
		setSelectedQuantity(1)
		setSelectedSize(undefined)
	}

	return (
		<>
			{wasSubmited && !selectedSize && (
				<span className="fade-in mt-2 text-red-500">
					Must be a size selected*
				</span>
			)}

			{/* Selector de Tallas */}
			<SizeSelector
				selectedSize={selectedSize}
				availableSizes={product.sizes}
				onSizeChanged={setSelectedSize}
			/>

			{/* Selector de Cantidad */}
			<QuantitySelector
				quantity={selectedQuantity}
				onQuantityChanged={setSelectedQuantity}
			/>

			{/* Button */}
			<button onClick={addToCart} className="btn-primary my-5">
				Add to cart
			</button>
		</>
	)
}
