export const revalidate = 604800 //7 días

import { Metadata, ResolvingMetadata } from 'next'

import { notFound } from 'next/navigation'

// import { initialData } from '@/seed/seed'
import { titleFont } from '@/config/fonts'
import {
	ProductSlideshow,
	ProductMobileSlideshow,
	StockLabel,
} from '@/components'

import { AddToCart } from './ui/AddToCart'
import { getProductBySlug } from '@/actions/product/get-product-by-slug'

interface Props {
	params: {
		slug: string
	}
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	// read route params
	const slug = params.slug

	// fetch data
	const product = await getProductBySlug(slug)

	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || []

	return {
		title: product?.title ?? 'Product not found',
		description: product?.description ?? '',
		openGraph: {
			title: product?.title ?? 'Product not found',
			description: product?.description ?? '',
			// images: [], // https://misitioweb.com/products/image.png
			images: [`/products/${product?.images[1]}`],
		},
	}
}

export default async function ProductSlugPage({ params }: Props) {
	const { slug } = params
	// const product = initialData.products.find((product) => product.slug === slug)
	const product = await getProductBySlug(slug)

	if (!product) notFound()

	return (
		<div className="mb-20 mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
			{/* Slideshow */}
			<div className="col-span-1 md:col-span-2">
				{/* Mobile Slideshow */}
				<ProductMobileSlideshow
					title={product.title}
					images={product.images}
					className="block md:hidden"
				/>

				{/* Desktop Slideshow */}
				<ProductSlideshow
					title={product.title}
					images={product.images}
					className="hidden md:block"
				/>
			</div>

			{/* Detalles */}
			<div className="col-span-1">
				<StockLabel slug={slug} />

				<h1 className={` ${titleFont.className} text-xl font-bold antialiased`}>
					{product.title}
				</h1>
				<p className="mb-5 text-lg">{product.price}</p>

				<AddToCart product={product} />

				{/* Descripción */}
				<h3 className="text-sm font-bold">Description</h3>
				<p className="font-light">{product.description}</p>
			</div>
		</div>
	)
}
