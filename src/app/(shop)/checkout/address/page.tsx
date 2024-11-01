import { Title } from '@/components'
import { AddressForm } from './ui/AddressForm'

import { auth } from '@/auth.config'
import { getCountries } from '@/actions/country/get-countries'
import { getUserAddress } from '@/actions/address/get-user-address'

export default async function AddressPage() {
	const countries = await getCountries()

	const session = await auth()

	if (!session?.user) {
		return <h3 className="text-5xl">500 - No hay sesión de usuario</h3>
	}

	const userAddress = (await getUserAddress(session.user.id)) ?? undefined

	return (
		<div className="mb-72 flex flex-col px-10 sm:items-center sm:justify-center sm:px-0">
			<div className="flex w-full flex-col justify-center text-left xl:w-[1000px]">
				<Title title="Dirección" subtitle="Dirección de entrega" />

				<AddressForm countries={countries} userStoredAddress={userAddress} />
			</div>
		</div>
	)
}
