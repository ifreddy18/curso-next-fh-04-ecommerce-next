export const revalidate = 30 // 60 segundos

import { getPaginatedProductsWithImages } from '@/actions'
import { Title, ProductGrid, Pagination } from '@/components'
import type { Category } from '@/interfaces'

// import { initialData } from '@/seed/seed'
// const seedProducts = initialData.products

const labels: Record<string, string> = {
	men: 'para hombres',
	women: 'para mujeres',
	kid: 'para niños',
	unisex: 'para todos',
}

interface Props {
	params: {
		gender: string
	}
	searchParams: {
		page?: string
	}
}

export default async function ({ params, searchParams }: Props) {
	const { gender } = params

	const page = searchParams.page ? parseInt(searchParams.page) : 1

	const { products, currentPage, totalPages } =
		await getPaginatedProductsWithImages({
			page,
			gender: gender as Category,
		})

	//? Go to page -> Not Found
	// if (gender === 'kids') notFound()

	// const products = seedProducts.filter((product) => product.gender === gender)

	return (
		<>
			<Title
				title={labels[gender]}
				subtitle={`Products for ${gender}`}
				className="mb-2"
			/>
			<ProductGrid products={products} />

			<Pagination totalPages={totalPages} />
		</>
	)
}
