import Link from 'next/link'

import { PayPalButton, Title, OrderStatus } from '@/components'
import { initialData } from '@/seed/seed'
import Image from 'next/image'
import clsx from 'clsx'
import { IoCardOutline } from 'react-icons/io5'
import { getOrderById } from '@/actions/order/get-order-by-id'
import { redirect } from 'next/navigation'
import { currencyFormat } from '@/utils'

const productsInCart = [
	initialData.products[0],
	initialData.products[1],
	initialData.products[2],
]

interface Props {
	params: {
		id: string
	}
}

export default async function OrdersByIdPage({ params }: Props) {
	const { id } = params

	// Todo: Llamar el server action

	const { ok, order } = await getOrderById(id)

	if (!ok) {
		redirect('/')
	}

	const address = order!.OrderAddress

	return (
		<div className="mb-72 flex items-center justify-center px-10 sm:px-0">
			<div className="flex w-[1000px] flex-col">
				<Title title={`Orden #${id.split('-').at(-1)}`} />

				<div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
					{/* Carrito */}
					<div className="mt-5 flex flex-col">
						<div
							className={clsx(
								'mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white',
								{
									'bg-red-500': !order!.isPaid,
									'bg-green-700': order!.isPaid,
								},
							)}
						>
							<IoCardOutline size={30} />
							{/* <span className="mx-2">Pendiente de pago</span> */}
							<span className="mx-2">
								{order?.isPaid ? 'Pagada' : 'No pagada'}
							</span>
						</div>

						{/* Items */}
						{order!.OrderItem.map((item) => (
							<div
								key={item.product.slug + '-' + item.size}
								className="mb-5 flex"
							>
								<Image
									src={`/products/${item.product.ProductImage[0].url}`}
									width={100}
									height={100}
									style={{
										width: '100px',
										height: '100px',
									}}
									alt={item.product.title}
									className="mr-5 rounded"
								/>

								<div>
									<p>{item.product.title}</p>
									<p>
										${item.price} x {item.quantity}
									</p>
									<p className="font-bold">
										Subtotal: {currencyFormat(item.price * item.quantity)}
									</p>
								</div>
							</div>
						))}
					</div>

					{/* Checkout - Resumen de orden */}
					<div className="rounded-xl bg-white p-7 shadow-xl">
						<h2 className="mb-2 text-2xl">Dirección de entrega</h2>
						<div className="mb-10">
							<p className="text-xl">
								{address!.firstName} {address!.lastName}
							</p>
							<p>{address!.address}</p>
							<p>{address!.address2}</p>
							<p>{address!.postalCode}</p>
							<p>
								{address!.city}, {address!.countryId}
							</p>
							<p>{address!.phone}</p>
						</div>

						{/* Divider */}
						<div className="mb-10 h-0.5 w-full rounded bg-gray-200" />

						<h2 className="mb-2 text-2xl">Resumen de orden</h2>

						<div className="grid grid-cols-2">
							<span>No. Productos</span>
							<span className="text-right">
								{order?.itemsInOrder === 1
									? '1 artículo'
									: `${order?.itemsInOrder} artículos`}
							</span>

							<span>Subtotal</span>
							<span className="text-right">
								{currencyFormat(order!.subTotal)}
							</span>

							<span>Impuestos (15%)</span>
							<span className="text-right">{currencyFormat(order!.tax)}</span>

							<span className="mt-5 text-2xl">Total:</span>
							<span className="mt-5 text-right text-2xl">
								{currencyFormat(order!.total)}
							</span>
						</div>

						<div className="mb-2 mt-5 w-full">
							{order?.isPaid ? (
								<OrderStatus isPaid={order?.isPaid ?? false} />
							) : (
								<PayPalButton amount={order!.total} orderId={order!.id} />
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
