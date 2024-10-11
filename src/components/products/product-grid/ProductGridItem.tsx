'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/interfaces'

interface Props {
	product: Product
}

export const ProductGridItem = ({ product }: Props) => {
	const defaultImage = product.images[0]
	const secondImage =
		product.images.length > 1 ? product.images[1] : defaultImage

	const [displayImage, setDisplayImage] = useState(defaultImage)

	const onMouseEnter = () => setDisplayImage(secondImage)
	const onMouseLeave = () => setDisplayImage(defaultImage)
	

	return (
		<div className="fade-in overflow-hidden rounded-md">
			<Link href={`/product/${product.slug}`}>
				<Image
					onMouseEnter={() => onMouseEnter()}
					onMouseLeave={() => onMouseLeave()}
					src={`/products/${displayImage}`}
					alt={product.title}
					className="w-full object-cover"
					width={500}
					height={500}
				/>
			</Link>

			<div className="flex flex-col p-2">
				<Link href={`/product/${product.slug}`} className="hover:text-blue-600">
					{product.title}
				</Link>
				<span className="font-bold">${product.price}</span>
			</div>
		</div>
	)
}
