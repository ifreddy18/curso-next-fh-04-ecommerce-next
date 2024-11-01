import { auth } from '@/auth.config'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	try {
		const session = await auth()

		if (session?.user.role !== 'admin') {
			redirect('/login')
		}
	} catch (error) {
		redirect('/login')
	}

	return <>{children}</>
}
