'use client'

import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const OrderSummary = () => {
	const router = useRouter()

	const [loaded, setLoaded] = useState(false)
	const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
		state.getSummaryInformation(),
	)

	useEffect(() => {
		setLoaded(true)
	}, [])

	useEffect(() => {
		if (itemsInCart === 0 && loaded === true) {
			router.replace('/empty')
		}
	}, [itemsInCart, loaded])

	if (!loaded) return <p>Loading...</p>

	return (
		<div className="grid grid-cols-2">
			<span>Total items</span>
			<span className="text-right">
				{itemsInCart === 1 ? '1 item' : `${itemsInCart} items`}
			</span>

			<span>Subtotal</span>
			<span className="text-right">{currencyFormat(subTotal)}</span>

			<span>Taxes (15%)</span>
			<span className="text-right">{currencyFormat(tax)}</span>

			<span className="mt-5 text-2xl">Total:</span>
			<span className="mt-5 text-right text-2xl">{currencyFormat(total)}</span>
		</div>
	)
}
