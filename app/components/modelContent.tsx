'use client'
import { ContentModel } from '@root/types/redisContent'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

type ModelContentProps = {
	model: ContentModel
}

export default function ModelContent({ model }: ModelContentProps) {
	const [currentImage, setCurrentImage] = useState<string>('0001')
	const [activeImage, setActiveImage] = useState<number>(model.has360 ? 0 : 1)
	const productPrice = model.price && model.price > 0 && new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(model.price)

	setTimeout(() => {
		const currentImageNumber = parseInt(currentImage)
		const newImageNumber = currentImageNumber < 36 ? currentImageNumber+1 : 1
		setCurrentImage(`000${newImageNumber}`.slice(-4))
	}, 200)

	return (
			<div className='container mx-auto relative isolate overflow-hidden py-24 sm:py-32'>
				<div className='mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center'>
					<div className='mx-auto max-w-2xl lg:mx-0'>
						<h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl font-display'>
							{model.title}
						</h1>
						<p className='mt-6 text-lg leading-8 text-zinc-300'>
							{model.shortDescription}
						</p>

						{(model.has360 || (model.media && model.media.length > 0)) && (
							<div className='mt-4 inline-block relative'>

								{((model.has360 && activeImage > 0) || (!model.has360 && activeImage > 1)) && (
									<div className='absolute top-1/2 -left-10 cursor-pointer' onClick={() => setActiveImage(activeImage-1)}><img src='/icons/left.svg' width={32} height={32} /></div>
								)}

								<div className='w-65 md:w-100 overflow-hidden rounded-lg relative'>
									{model.has360 && <img src={`https://angelghr.media/${model.id}/360/${currentImage}.png`} width={400} height={400} className='image-border' />}

									{model.media && model.media.length > 0 && model.media.map((media, index) => {
										return <img key={index} src={`https://angelghr.media/${model.id}/gallery/${media}`} width={400} height={400} className={twMerge('absolute top-0 duration-300', activeImage <= index && 'translate-x-full')} />
									})}
								</div>

								{model.media && model.media.length >= activeImage+1 && (
									<div className='absolute top-1/2 -right-10 cursor-pointer' onClick={() => setActiveImage(activeImage+1)}><img src='/icons/right.svg' width={32} height={32} /></div>
								)}
							</div>
						)}
					</div>

					<div className='mx-auto max-w-2xl lg:mx-0 group'>
						<h3 className='text-lg uppercase duration-1000 text-zinc-400 group-hover:text-zinc-200'>
							Product Price
						</h3>
						<p className='text-5xl font-bold duration-1000 text-zinc-400 group-hover:text-zinc-200'>
							{productPrice ?? 'X,XX €'} <span className='text-sm font-normal'>each</span>
						</p>
					</div>

					{model.links && (
						<div className='mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none'>
							<div className='grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10'>
								{model.links.etsy && (
									<Link href={model.links.etsy} target='_blank' className="inline-flex overflow-hidden text-white rounded group border border-etsy">
										<span className="px-3.5 py-2 text-white bg-etsy/80 group-hover:bg-etsy flex items-center justify-center duration-300">
											<Image src='/icons/shopbag.svg' width={20} height={20} alt='Shopping Bag' title='Shopping Bag' />
										</span>
										<span className='p-4'>Buy now on Etsy!</span>
									</Link>
								)}

								{model.links.ebay && (
									<Link href={model.links.ebay} target='_blank' className="inline-flex overflow-hidden text-white rounded group border border-ebay">
										<span className="px-3.5 py-2 text-white bg-ebay/80 group-hover:bg-ebay flex items-center justify-center duration-300">
											<Image src='/icons/shopbag.svg' width={20} height={20} alt='Shopping Bag' title='Shopping Bag' />
										</span>
										<span className='p-4'>Buy now on eBay!</span>
									</Link>
								)}
							</div>
						</div>
					)}
				</div>
		</div>
	)
}
