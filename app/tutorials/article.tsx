'use client'

import Link from 'next/link'
import { ContentTutorial } from '@root/types/redisContent'
import Image from 'next/image'
import ReportView from '@apis/view'

type ArticleProps = {
	tutorial: ContentTutorial
	views: number
}

export default function Article({ tutorial, views }: ArticleProps) {
	return <Link
		href={tutorial.slug}
		onClick={async (event) => {
			await ReportView({ id: tutorial.id, category: 'tutorials'})
		}}
	>
		<article className='p-4 md:p-8 pb-16 md:pb-20'>
			<div className='flex justify-between gap-2 items-center mb-2'>
				<span className='text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange'>
					<time dateTime={new Date(tutorial.date).toISOString()}>
						{Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(tutorial.date))}
					</time>
				</span>
				<span className='text-zinc-500 text-xs flex items-center gap-1'>
					<Image src='/icons/eye.svg' width={24} height={24} alt='View counter' title='View counter' /> {Intl.NumberFormat('en-US', { notation: 'compact' }).format(views)}
				</span>
			</div>

			<img src={`https://angelghr.media/tutorials/${tutorial.id}/${tutorial.media}`} width={200} height={150} className='image-border' />

			<h2 className='z-20 mt-2 text-lg font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display'>
				{tutorial.title}
			</h2>
		</article>
	</Link>
}
