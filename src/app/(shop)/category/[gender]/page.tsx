export const revalidate = 30 // 60 segundos

import { redirect } from 'next/navigation'
import { Gender } from '@prisma/client'

import { getPaginatedProductsWithImages } from '@/actions'
import { Title, ProductGrid, Pagination } from '@/components'

// import { initialData } from '@/seed/seed'
// const seedProducts = initialData.products

const labels: Record<string, string> = {
	men: 'for men',
	women: 'for women',
	kid: 'for kids',
	unisex: 'for everyone',
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
			gender: gender as Gender,
		})

	//? Go to page -> Not Found
	// if (gender === 'kids') notFound()

	// const products = seedProducts.filter((product) => product.gender === gender)

	if (products.length === 0) {
		redirect(`/gender/${gender}`)
	}

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
