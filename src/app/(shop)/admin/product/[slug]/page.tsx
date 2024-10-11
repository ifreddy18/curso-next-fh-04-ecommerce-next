import { redirect } from 'next/navigation'

import { Product } from '@prisma/client'

import { getCategories, getProductBySlug } from '@/actions'
import { Title } from '@/components'

import { ProductForm } from './ui/ProductForm'

interface Props {
	params: {
		slug: string
	}
}

export default async function ProductPage({ params }: Props) {
	const { slug } = params

	const [product, categories] = await Promise.all([
		getProductBySlug(slug),
		getCategories(),
	])

	// Todo: new
	if (!product && slug !== 'new') {
		redirect('/admin/products')
	}

	const title = slug === 'new' ? 'New product' : 'Edit product'

	return (
		<>
			<Title title={title} />

			<ProductForm
				product={product ?? ({} as Partial<Product>)}
				categories={categories}
			/>
		</>
	)
}
