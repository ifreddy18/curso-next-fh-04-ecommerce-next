'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

import { titleFont } from '@/config/fonts'
import { useCartStore, useUIStore } from '@/store'

export const TopMenu = () => {
	const openSideMenu = useUIStore((state) => state.openSideMenu)
	const totalItemsInCart = useCartStore((store) => store.getTotalItems())

	//! Solventa error en la hidratación del componente
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(false)
	}, [])

	return (
		<nav className="flex w-full items-center justify-between px-5">
			{/* Logo */}
			<div>
				<Link href="/">
					<span className={`${titleFont.className} font-bold antialiased`}>
						Teslo
					</span>
					<span> | Shop</span>
				</Link>
			</div>

			{/* Center menu */}
			<div className="hidden sm:block">
				<Link
					className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
					href="/gender/men"
				>
					Men
				</Link>
				<Link
					className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
					href="/gender/women"
				>
					Women
				</Link>
				<Link
					className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
					href="/gender/kid"
				>
					Kid
				</Link>
			</div>

			{/* Search, Cart, Menu */}
			<div className="flex items-center">
				<Link href="/search" className="mx-2">
					<IoSearchOutline className="h-5 w-5" />
				</Link>
				<Link
					href={totalItemsInCart === 0 && !isLoading ? '/empty' : '/cart'}
					className="mx-2"
				>
					<div className="relative">
						{!isLoading && totalItemsInCart > 0 && (
							<span className="absolute -right-2 -top-2 rounded-full bg-blue-700 px-1 text-xs font-bold text-white">
								{totalItemsInCart}
							</span>
						)}
						<IoCartOutline className="h-5 w-5" />
					</div>
				</Link>
				<button
					className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
					onClick={() => openSideMenu()}
				>
					Menu
				</button>
			</div>
		</nav>
	)
}
