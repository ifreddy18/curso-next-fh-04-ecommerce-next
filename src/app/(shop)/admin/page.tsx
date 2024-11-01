'use client'

import { auth } from '@/auth.config'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminPage() {
	const router = useRouter()

	useEffect(() => {
		async function checkAuth() {
			const session = await auth()
			if (session?.user.role !== 'admin') {
				router.push('/login')
			}
		}
		checkAuth()
	}, [router])

	return (
		<div>
			<h1>Admin Page</h1>
		</div>
	)
}
