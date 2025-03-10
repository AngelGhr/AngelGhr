'use client'
import { ContentModel } from '@root/types/redisContent'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type ModelContentProps = {
	model: ContentModel
}

export default function ModelContent({ model }: ModelContentProps) {
	const [currentImage, setCurrentImage] = useState<string>('0001')

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
							{model.description}
						</p>

						{model.has360 && <img src={`https://angelghr.media/${model.id}/360/${currentImage}.png`} width={300} height={300} className='image-border mt-4 inline-block' />}
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
