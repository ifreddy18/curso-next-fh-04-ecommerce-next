export const revalidate = 0

import { getPaginatedOrders } from '@/actions/order/get-paginated-orders'
// https://tailwindcomponents.com/component/hoverable-table
import { Pagination, Title } from '@/components'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { IoCardOutline } from 'react-icons/io5'

export default async function OrdersPage() {
	const { ok, orders = [] } = await getPaginatedOrders()

	if (!ok) {
		redirect('/auth/login')
	}

	return (
		<>
			<Title title="All the orders" />

			<div className="mb-10">
				<table className="min-w-full">
					<thead className="border-b bg-gray-200">
						<tr>
							<th
								scope="col"
								className="px-6 py-4 text-left text-sm font-medium text-gray-900"
							>
								#ID
							</th>
							<th
								scope="col"
								className="px-6 py-4 text-left text-sm font-medium text-gray-900"
							>
								Fullname
							</th>
							<th
								scope="col"
								className="px-6 py-4 text-left text-sm font-medium text-gray-900"
							>
								State
							</th>
							<th
								scope="col"
								className="px-6 py-4 text-left text-sm font-medium text-gray-900"
							>
								Options
							</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr
								key={order.id}
								className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
							>
								<td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
									{order.id.split('-').at(-1)}
								</td>
								<td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
									{order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
								</td>
								<td className="flex items-center whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
									{order.isPaid ? (
										<>
											<IoCardOutline className="text-green-800" />
											<span className="mx-2 text-green-800">Paid</span>
										</>
									) : (
										<>
											<IoCardOutline className="text-red-800" />
											<span className="mx-2 text-red-800">Pending</span>
										</>
									)}
								</td>
								<td className="px-6 text-sm font-light text-gray-900">
									<Link
										href={`/orders/${order.id}`}
										className="hover:underline"
									>
										See order
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<Pagination totalPages={1} />
			</div>
		</>
	)
}
