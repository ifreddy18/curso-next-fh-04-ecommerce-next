'use client'

import { generatePaginationNumbers } from '@/utils'
import Link from 'next/link'
import clsx from 'clsx'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

interface Props {
	totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const pageString = searchParams.get('page') ?? 1
	const currentPage = isNaN(+pageString) ? 1 : +pageString

	if (currentPage < 1 || isNaN(+pageString)) {
		redirect(pathname)
	}

	const allPages = generatePaginationNumbers(currentPage, totalPages)

	const createPageUrl = (pageNumber: number | string): string => {
		const params = new URLSearchParams(searchParams)

		if (
      //? click in ...
      pageNumber === '...' ||
      //? Click in previous when page is 1 OR click in next when page is the last
      +pageNumber > totalPages
    ) {
			//? Return to same page
			return `${pathname}?${params.toString()}`
		}

		if (+pageNumber <= 0) {
			//? href="/";
			return `${pathname}`
		}

    //? 2,3,4, etc...
		params.set('page', pageNumber.toString())
		return `${pathname}?${params.toString()}`
	}

  const previousPage = (): string => createPageUrl(currentPage - 1)
  const nextPage = (): string => createPageUrl(currentPage + 1)

	return (
		<div className="mb-32 mt-10 flex justify-center text-center">
			<nav aria-label="Page navigation example">
				<ul className="list-style-none flex">
					<li className="page-item">
						<Link
							className="page-link relative block rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
							href={previousPage()}
						>
							<IoChevronBackOutline size={30} />
						</Link>
					</li>

					{allPages.map((page, index) => (
						<li key={page} className="page-item">
							<Link
								className={clsx(
									'page-link relative block rounded border-0 px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none',
									{
										'bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:text-white':
											page === currentPage,
									},
								)}
								href={createPageUrl(page)}
							>
								{page}
							</Link>
						</li>
					))}

					<li className="page-item">
						<Link
							className="page-link relative block rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
							href={nextPage()}
						>
							<IoChevronForwardOutline size={30} />
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}
