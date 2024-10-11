import type { Metadata } from 'next'

import { inter } from '@/config/fonts'
import { Providers } from "@/components";

import './globals.css'

export const metadata: Metadata = {
	// title: 'Ecommerce Name',
	title: {
		template: '%s | Ecommerce Name', //? %s es comodin
		default: 'Home | Ecommerce Name',
	},
	description: 'Virtual shop',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
