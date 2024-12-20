'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import {
	CreateOrderData,
	CreateOrderActions,
	OnApproveActions,
	OnApproveData,
} from '@paypal/paypal-js'
import { paypalCheckPayment } from '@/actions/payments/paypal-check-payment'
import { setTransactionId } from '@/actions/payments/set-transaction-id'

interface Props {
	orderId: string
	amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {
	const [{ isPending }] = usePayPalScriptReducer()

	const rountedAmount = Math.round(amount * 100) / 100 //123.23

	if (isPending) {
		return (
			<div className="mb-16 animate-pulse">
				<div className="h-11 rounded bg-gray-300" />
				<div className="mt-2 h-11 rounded bg-gray-300" />
			</div>
		)
	}

	const createOrder = async (
		data: CreateOrderData,
		actions: CreateOrderActions,
	): Promise<string> => {
		const transactionId = await actions.order.create({
			purchase_units: [
				{
					invoice_id: orderId,
					amount: {
						value: `${rountedAmount}`,
						currency_code: '$',
					},
				},
			],
			intent: 'CAPTURE',
		})

		const { ok } = await setTransactionId(orderId, transactionId)
		if (!ok) {
			throw new Error('No se pudo actualizar la orden')
		}

		return transactionId
	}

	const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
		const details = await actions.order?.capture()
		if (!details) return

		await paypalCheckPayment(details.id!)
	}

	return (
		<div className="relative z-0">
			<PayPalButtons createOrder={createOrder} onApprove={onApprove} />
		</div>
	)
}
