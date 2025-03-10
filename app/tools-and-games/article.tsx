import Link from 'next/link'
import { ContentTool } from '@root/types/redisContent'
import Image from 'next/image'

type Props = {
	tool: ContentTool
	views: number
}

export const Article: React.FC<Props> = ({ tool, views }) => {
	return (
		<Link href={`/tools-and-games/${tool.slug}`}>
			<article className='p-4 md:p-8'>
				<div className='flex justify-between gap-2 items-center'>
					<span className='text-xs duration-1000 text-zinc-200 group-hover:text-white group-hover:border-zinc-200 drop-shadow-orange'>
						{tool.date ? (
							<time dateTime={new Date(tool.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
									new Date(tool.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className='text-zinc-500 text-xs  flex items-center gap-1'>
						<Image src='/icons/eye.svg' width={24} height={24} alt='View counter' title='View counter' />	{Intl.NumberFormat('en-US', { notation: 'compact' }).format(views)}
					</span>
				</div>
				<h2 className='z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display'>
					{tool.title}
				</h2>
				<p className='z-20 mt-4 text-sm  duration-1000 text-zinc-400 group-hover:text-zinc-200'>
					{tool.description}
				</p>
			</article>
		</Link>
	)
}
