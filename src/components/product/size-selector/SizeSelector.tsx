import clsx from 'clsx'
import type { Size } from '@/interfaces'

interface Props {
	selectedSize?: Size
	availableSizes: Size[] // ['SX', 'M', 'XL', 'XXL']
	onSizeChanged: (size: Size) => void
}

export const SizeSelector = ({
	selectedSize,
	availableSizes,
	onSizeChanged,
}: Props) => {
	return (
		<div className="my-5">
			<h3 className="mb-4 font-bold">Available sizes</h3>

			<div className="flex">
				{availableSizes.map((size) => (
					<button
						key={size}
						onClick={() => onSizeChanged(size)}
						className={clsx('mx-2 text-lg hover:underline', {
							underline: size === selectedSize,
						})}
					>
						{size}
					</button>
				))}
			</div>
		</div>
	)
}
