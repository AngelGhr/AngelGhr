'use client'
import { ContentModel } from '@root/types/redisContent'
import { useState } from 'react'

type Props = {
	model: ContentModel
}

export default function ModelHeader({ model }: Props) {
	const [currentImage, setCurrentImage] = useState<string>('0001')

	setTimeout(() => {
		const currentImageNumber = parseInt(currentImage)
		if(currentImageNumber < 36) {
			setCurrentImage(`000${currentImageNumber+1}`.slice(-4))
		} else {
			setCurrentImage('0001')
		}
	}, 200)

	return (
		<div className='relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black'>
			<div className='container mx-auto relative isolate overflow-hidden py-24 sm:py-32'>
				<div className='mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center'>
					<div className='mx-auto max-w-2xl lg:mx-0'>
						<h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl font-display'>
							{model.title}
						</h1>
						<p className='mt-6 text-lg leading-8 text-zinc-300'>
							{model.description}
						</p>

						{model.has360 && 
							<img src={`https://angelghr.media/${model.id}/360/${currentImage}.png`} width={300} height={300} className='image-border mt-4 inline-block' />
						}
					</div>

					<div className='mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none'>
						<div className='grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10'>
							
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
