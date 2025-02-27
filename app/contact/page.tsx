'use client'
import Link from 'next/link'
import { Navigation } from '@components/nav'
import { Card } from '@components/card'
import Image from 'next/image'
import Footer from '@components/footer'

const socials = [
	{
		icon: 'instagram.svg',
		href: 'https://instagram.com/AngelGhr',
		label: 'Instagram',
		handle: '@AngelGhr',
	},
	{
		icon: 'tiktok.svg',
		href: 'https://tiktok.com/@angelghrmx',
		label: 'TikTok',
		handle: '@AngelGhrMx',
	},
	{
		icon: 'facebook.svg',
		href: 'https://facebook.com/AngelGhr',
		label: 'Facebook',
		handle: '/AngelGhr',
	},
	{
		icon: 'linkedin.svg',
		href: 'https://www.linkedin.com/in/angelghr',
		label: 'LinkedIn',
		handle: '/angelghr',
	},
	{
		icon: 'youtube.svg',
		href: 'https://youtube.com/@AngelGhrMx',
		label: 'YouTube',
		handle: '@AngelGhrMx',
	},
	{
		icon: 'buymeacoffee.svg',
		href: 'https://www.buymeacoffee.com/AngelGhr',
		label: 'Buy me a coffee',
		handle: '@AngelGhr',
	}
]

export default function Example() {
	return (
		<div className=' bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0'>
			<Navigation />
			<div className='container flex items-center justify-center min-h-screen px-4 mx-auto'>
				<div className='grid w-full grid-cols-2 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16'>
					{socials.map((social) => (
						<Card>
							<Link
								href={social.href}
								target='_blank'
								className='p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-16 md:p-16'
							>
								<span
									className='absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent'
									aria-hidden='true'
								/>
								<span className='relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange'>
									<Image src={`/icons/${social.icon}`} width={48} height={48} alt={social.label} title={social.label} className='invert' />
								</span>
								<div className='z-10 flex flex-col items-center'>
									<span className='lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display'>
										{social.handle}
									</span>
									<span className='mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200'>
										{social.label}
									</span>
								</div>
							</Link>
						</Card>
					))}
				</div>
			</div>
			<Footer />
		</div>
	)
}
