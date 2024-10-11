'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

import type { Address, Size } from '@/interfaces'
import { placeOrder } from '@/actions'
import { useAddressStore, useCartStore } from '@/store'
import { currencyFormat } from '@/utils'

export const PlaceOrder = () => {
	const router = useRouter()
	const [loaded, setLoaded] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [isPlacingOrder, setIsPlacingOrder] = useState(false)

	const address = useAddressStore((state) => state.address)

	const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
		state.getSummaryInformation(),
	)
	const cart = useCartStore((state) => state.cart)
	const clearCart = useCartStore((state) => state.clearCart)

	useEffect(() => {
		setLoaded(true)
	}, [])

	const onPlaceOrder = async () => {
		setIsPlacingOrder(true)
		// await sleep(2);

		const productsToOrder = cart.map((product) => ({
			productId: product.id,
			quantity: product.quantity,
			size: product.size,
		}))

		//! Server Action
		const placeOrderAddress: Address = {
			firstName: address.firstName,
			lastName: address.lastName,
			address: address.address,
			address2: address.address2,
			postalCode: address.postalCode,
			city: address.city,
			country: address.country,
			phone: address.phone,
		}
		console.log({ placeOrderAddress })
		const resp = await placeOrder(productsToOrder, placeOrderAddress)
		if (!resp.ok) {
			setIsPlacingOrder(false)
			setErrorMessage(resp.message)
			return
		}

		//* Todo salio bien!
		clearCart()
		router.replace('/orders/' + resp.order?.id)
	}

	if (!loaded) {
		return <p>Loading...</p>
	}

	return (
		<div className="rounded-xl bg-white p-7 shadow-xl">
			<h2 className="mb-2 text-2xl">Delivery address</h2>
			<div className="mb-10">
				<p className="text-xl">
					{address.firstName} {address.lastName}
				</p>
				<p>{address.address}</p>
				<p>{address.address2}</p>
				<p>{address.postalCode}</p>
				<p>
					{address.city}, {address.country}
				</p>
				<p>{address.phone}</p>
			</div>

			{/* Divider */}
			<div className="mb-10 h-0.5 w-full rounded bg-gray-200" />

			<h2 className="mb-2 text-2xl">Order summary</h2>

			<div className="grid grid-cols-2">
				<span>Products count</span>
				<span className="text-right">
					{itemsInCart === 1 ? '1 item' : `${itemsInCart} items`}
				</span>

				<span>Subtotal</span>
				<span className="text-right">{currencyFormat(subTotal)}</span>

				<span>Taxes (15%)</span>
				<span className="text-right">{currencyFormat(tax)}</span>

				<span className="mt-5 text-2xl">Total:</span>
				<span className="mt-5 text-right text-2xl">
					{currencyFormat(total)}
				</span>
			</div>

			<div className="mb-2 mt-5 w-full">
				<p className="mb-5">
					{/* Disclaimer */}
					<span className="text-xs">
						By clicking in &quot;Place order&quot;, you accept our{' '}
						<a href="#" className="underline">
							terms and conditions
						</a>{' '}
						and{' '}
						<a href="#" className="underline">
							privacy policy
						</a>
					</span>
				</p>

				<p className="text-red-500">{errorMessage}</p>

				<button
					// href="/orders/123"
					onClick={onPlaceOrder}
					className={clsx({
						'btn-primary': !isPlacingOrder,
						'btn-disabled': isPlacingOrder,
					})}
				>
					Place order
				</button>
			</div>
		</div>
	)
}
