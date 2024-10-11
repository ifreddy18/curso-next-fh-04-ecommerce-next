import Image from 'next/image'
import Link from 'next/link'
import { titleFont } from '@/config/fonts'

export const PageNotFound = () => {
	return (
		<div className="flex h-[800px] w-full flex-col-reverse items-center justify-center align-middle md:flex-row">
			<div className="mx-5 px-5 text-center">
				<h2 className={`${titleFont.className} text-9xl antialiased`}>404</h2>
				<p className="text-xl font-semibold">Whoops! Something went wrong.</p>
				<p className="font-light">
					<span>Go back to </span>
					<Link href="/" className="font-normal transition-all hover:underline">
						Home
					</Link>
				</p>
			</div>

			<div className="mx-5 px-5">
				<Image
					src="/imgs/starman_750x750.png"
					alt="Starman"
					className="p-5 sm:p-0"
					width={550}
					height={550}
				/>
			</div>
		</div>
	)
}
