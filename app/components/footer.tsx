'use client'

import Image from "next/image"
import Link from "next/link"

export const socials = [
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

export default function Footer() {
	return (
		<footer className='mt-8 container flex max-md:flex-col items-center gap-8 p-6 mx-auto text-center'>
			<p className='duration-200 text-zinc-400 hover:text-zinc-100'>
				{`AngelGhr ${new Date().getFullYear()} - Made with 💝 by Angel Garza.`}
			</p>
			<div className='flex-1 flex gap-2 justify-end'>
				{socials.map((social, index) => (
					<Link key={index} href={social.href} target='_blank' className='w-8 h-8'>
						<Image src={`/icons/${social.icon}`} width={32} height={32} alt={social.label} title={social.label} className='invert' />
					</Link>
				))}
			</div>
		</footer>
	)
}
