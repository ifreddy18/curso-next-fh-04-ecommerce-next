//! ARCHIVO DIFERENTE AL DEL CURSO

'use client'

import Link from 'next/link'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import {
	IoCloseOutline,
	IoLogInOutline,
	IoLogOutOutline,
	IoPeopleOutline,
	IoPersonOutline,
	IoSearchOutline,
	IoShirtOutline,
	IoTicketOutline,
} from 'react-icons/io5'

import { useUIStore } from '@/store'
import { logout } from '@/actions/auth/logout'

export const Sidebar = () => {
	const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen)
	const closeMenu = useUIStore((state) => state.closeSideMenu)

	const { data: session } = useSession()
	const isAuthenticated = !!session?.user
	const isAdmin = session?.user.role === 'admin'

	return (
		<div>
			{/* Background black */}
			{isSideMenuOpen && (
				<div className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-30" />
			)}

			{/* Blur */}
			{isSideMenuOpen && (
				<div
					onClick={closeMenu}
					className="fade-in fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-sm backdrop-filter"
				/>
			)}

			{/* Sidemenu */}
			<nav
				className={clsx(
					'fixed right-0 top-0 z-20 h-screen w-[300px] transform bg-white p-5 shadow-2xl transition-all duration-300',
					{
						'translate-x-full': !isSideMenuOpen,
					},
				)}
			>
				<IoCloseOutline
					size={36}
					className="absolute right-5 top-5 cursor-pointer"
					onClick={() => closeMenu()}
				/>

				{/* Input */}
				<div className="relative mt-10">
					<IoSearchOutline size={20} className="absolute left-2 top-2" />
					<input
						type="text"
						placeholder="Buscar"
						className="w-full rounded border-b-2 border-gray-200 bg-gray-50 py-1 pl-10 pr-10 focus:border-blue-500 focus:outline-none"
					/>
				</div>

				{/* Menú */}

				{isAuthenticated && (
					<>
						<Link
							href="/profile"
							onClick={() => closeMenu()}
							className="mt-3 flex items-center rounded p-2 transition-all hover:bg-gray-100"
						>
							<IoPersonOutline size={30} />
							<span className="text-l ml-3">Profile</span>
						</Link>

						<Link
							href="/orders"
							className="mt-3 flex items-center rounded p-2 transition-all hover:bg-gray-100"
						>
							<IoTicketOutline size={30} />
							<span className="text-l ml-3">Orders</span>
						</Link>
					</>
				)}

				{isAuthenticated && (
					<button
						className="mt-3 flex w-full items-center rounded p-2 transition-all hover:bg-gray-100"
						onClick={() => logout()}
					>
						<IoLogOutOutline size={30} />
						<span className="text-l ml-3">Logout</span>
					</button>
				)}

				{!isAuthenticated && (
					<>
						<Link
							href="/auth/login"
							className="mt-3 flex items-center rounded p-2 transition-all hover:bg-gray-100"
							onClick={() => closeMenu()}
						>
							<IoLogInOutline size={30} />
							<span className="text-l ml-3">Login</span>
						</Link>
						<Link
							href="/auth/new-account"
							className="mt-3 flex items-center rounded p-2 transition-all hover:bg-gray-100"
							onClick={() => closeMenu()}
						>
							<IoLogInOutline size={30} />
							<span className="text-l ml-3">Sign up</span>
						</Link>
					</>
				)}

				{isAdmin && (
					<>
						{/* Line Separator */}
						<div className="my-10 h-px w-full bg-gray-200" />

						<Link
							href="/admin/products"
							className="mt-3 flex items-center rounded p-2 transition-all hover:bg-gray-100"
							onClick={() => closeMenu()}
						>
							<IoShirtOutline size={30} />
							<span className="text-l ml-3">Products</span>
						</Link>

						<Link
							href="/admin/orders"
							className="mt-3 flex items-center rounded p-2 transition-all hover:bg-gray-100"
							onClick={() => closeMenu()}
						>
							<IoTicketOutline size={30} />
							<span className="text-l ml-3">Orders</span>
						</Link>

						<Link
							href="/admin/users"
							className="mt-3 flex items-center rounded p-2 transition-all hover:bg-gray-100"
							onClick={() => closeMenu()}
						>
							<IoPeopleOutline size={30} />
							<span className="text-l ml-3">Users</span>
						</Link>
					</>
				)}
			</nav>
		</div>
	)
}
function logoutAction() {
	throw new Error('Function not implemented.')
}
