'use client'
import Link from 'next/link'

type Props = {
	tool: {
		url?: string
		title: string
		description: string
		repository?: string
	}
}

export default function ArticleHeader({ tool }: Props) {

	const links: { label: string; href: string }[] = []
	if (tool.repository) {
		links.push({
			label: 'GitHub',
			href: `https://github.com/${tool.repository}`,
		})
	}
	if (tool.url) {
		links.push({
			label: 'Website',
			href: tool.url,
		})
	}

	return (
		<div className='relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black'>
			<div className='container mx-auto relative isolate overflow-hidden py-24 sm:py-32'>
				<div className='mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center'>
					<div className='mx-auto max-w-2xl lg:mx-0'>
						<h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl font-display'>
							{tool.title}
						</h1>
						<p className='mt-6 text-lg leading-8 text-zinc-300'>
							{tool.description}
						</p>
					</div>

					<div className='mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none'>
						<div className='grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10'>
							{links.map((link) => (
								<Link target='_blank' key={link.label} href={link.href}>
									{link.label} <span aria-hidden='true'>&rarr</span>
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
