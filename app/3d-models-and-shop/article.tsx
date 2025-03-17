import Link from 'next/link'
import { ContentModel } from '@root/types/redisContent'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

type Props = {
	model: ContentModel
	views: number
}


export const Article: React.FC<Props> = ({ model, views }) => {
	const isComingSoon = model.isComingSoon
	const productPrice = model.price && model.price > 0 && new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(model.price)

	return (
		<Link href={isComingSoon ? '#' : `/3d-models-and-shop/${model.slug}`} className={twMerge(isComingSoon && 'pointer-events-none')}>
			<article className='p-4 md:p-8 pb-16 md:pb-20'>
				<div className='flex justify-between gap-2 items-center mb-2'>
					<span className='text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange'>
						{(model.date && !isComingSoon) ? (
							<time dateTime={new Date(model.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(model.date))}
							</time>
						) : (
							<span>Coming Soon!</span>
						)}
					</span>
					<span className='text-zinc-500 text-xs flex items-center gap-1'>
						<Image src='/icons/eye.svg' width={24} height={24} alt='View counter' title='View counter' /> {Intl.NumberFormat('en-US', { notation: 'compact' }).format(views)}
					</span>
				</div>

				{(isComingSoon || !model.has360) ? (
					<div className='w-full max-w-50 aspect-square overflow-hidden relative rounded-xl'>
						<div className='rounded-full bg-zinc-200 blur-xl absolute top-0 left-0 w-full h-full'></div>
						<p className='text-2xl md:text-4xl text-zinc-700 absolute top-8 md:top-12 left-0 text-center border-3 px-4 py-2 rounded-lg -rotate-20'>Coming Soon!</p>
					</div>
				) : (
					<img src={`https://angelghr.media/${model.id}/360/0001.png`} width={200} height={200} className='image-border' />
				)}

				<h2 className='z-20 mt-2 text-lg font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display'>
					{model.title}
				</h2>
				<p className='z-20 mt-2 text-sm duration-1000 text-zinc-400 group-hover:text-zinc-200'>
					{model.description}
				</p>

				<p className='z-20 absolute bottom-4 md:bottom-8 text-lg font-bold duration-1000 text-zinc-400 group-hover:text-zinc-200'>
					{(isComingSoon || !productPrice) ? 'X,XX €' : productPrice}
				</p>
			</article>
		</Link>
	)
}
