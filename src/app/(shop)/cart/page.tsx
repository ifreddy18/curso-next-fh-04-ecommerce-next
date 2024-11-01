import Link from 'next/link'

import Image from 'next/image'
import { redirect } from 'next/navigation'

import { QuantitySelector, Title } from '@/components'
import { ProductsInCart } from './ui/ProductsInCart'
import { OrderSummary } from './ui/OrderSummary'

// import { initialData } from '@/seed/seed'

// const productsInCart = [
// 	initialData.products[0],
// 	initialData.products[1],
// 	initialData.products[2],
// ]

export default function CartPage() {
	// TODO: when cart is empty
	// redirect('/empty');

	return (
		<div className="mb-72 flex items-center justify-center px-10 sm:px-0">
			<div className="flex w-[1000px] flex-col">
				<Title title="Cart" />

				<div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
					{/* Carrito */}
					<div className="mt-5 flex flex-col">
						<span className="text-xl">Add more products</span>
						<Link href="/" className="mb-5 underline">
							Continúa comprando
						</Link>

						{/* Items */}
						<ProductsInCart />
					</div>

					{/* Checkout - Resumen de orden */}
					<div className="h-fit rounded-xl bg-white p-7 shadow-xl">
						<h2 className="mb-2 text-2xl">Order summary</h2>

						<OrderSummary />

						<div className="mb-2 mt-5 w-full">
							<Link
								className="btn-primary flex justify-center"
								href="/checkout/address"
							>
								Checkout
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
