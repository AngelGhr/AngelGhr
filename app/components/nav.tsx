'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const navLinks = [
	{ link: '/tools-and-games', name: 'Tools & Games' },
	{ link: '/3d-models-and-shop', name: '3D Models & Shop' },
	{ link: '/contact', name: 'Contact' }
]

interface NavigationProps {
	views?: number
	backPath?: string
}

export default function Navigation({ views, backPath }: NavigationProps) {
	const ref = useRef<HTMLElement>(null)
	const [isIntersecting, setIntersecting] = useState(true)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	useEffect(() => {
		if (!ref.current) return
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		)

		observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	return <>
		<header ref={ref}>
			<div className={twMerge(
				'fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b w-screen',
				isIntersecting ? 'bg-zinc-900/0 border-transparent' : 'bg-zinc-900/500 border-zinc-800'
			)}>
				<div className='container flex flex-row-reverse items-center justify-between mx-auto px-6'>
					<div className='max-md:hidden flex justify-between gap-8 py-6'>
						{navLinks.map((link, index) => <Link key={index} href={link.link} className='duration-200 text-zinc-400 hover:text-zinc-100'>{link.name}</Link>)}

						{views && <span	title='View counter for this page' className='duration-200 hover:font-medium flex items-center gap-1 text-zinc-400 hover:text-zinc-900'>
							<Image src='/icons/eye.svg' width={24} height={24} alt='View counter' title='View counter' /> {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
						</span>}
					</div>

					<div className='md:hidden justify-between py-4 pl-4 cursor-pointer' onClick={() => setIsMenuOpen(!isMenuOpen)}>
						<span className={twMerge(
							'duration-300 before:duration-300 after:duration-300 block w-5 h-0.5 bg-zinc-400 relative before:block before:absolute before:w-5 before:h-0.5 before:top-[-6px] before:left-0 before:bg-zinc-400 after:block after:absolute after:w-5 after:h-0.5 after:bottom-[-6px] after:left-0 after:bg-zinc-400',
							isMenuOpen && 'bg-transparent before:rotate-45 after:-rotate-45 before:top-0 after:bottom-0'
						)} />
					</div>

					<div className='flex gap-8'>
						<Link	href={`/${backPath ?? ''}`} className='duration-200 text-zinc-300 hover:text-zinc-100 py-6'>
							<Image src='/icons/arrowleft.svg' width={24} height={24} alt='View counter' title='View counter' />
						</Link>

						<Link	href='/' className='duration-200 text-zinc-300 hover:text-zinc-100 py-1'>
							<Image src='/logo-angelghr.png' width={64} height={64} alt='View counter' title='View counter' />
						</Link>
					</div>
				</div>
			</div>

			<div className={twMerge('md:hidden fixed z-60 absolute top-21 right-0 overflow-hidden duration-300 h-0', isMenuOpen && 'h-screen')}>
				<div className={twMerge('bg-zinc-900/500 border-zinc-800 rounded-lg backdrop-blur-md duration-300', !isMenuOpen && 'translate-x-full')}>
					<div className='flex flex-col justify-between gap-8 p-4 w-50'>
						{navLinks.map((link, index) => <Link key={index} href={link.link} className='duration-200 text-zinc-400 hover:text-zinc-100 p-2'>{link.name}</Link>)}

						{views && <span	title='View counter for this page' className='duration-200 hover:font-medium flex items-center gap-1 p-2 text-zinc-400 hover:text-zinc-900'>
							<Image src='/icons/eye.svg' width={24} height={24} alt='View counter' title='View counter' /> {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
						</span>}
					</div>
				</div>
			</div>
		</header>
	</>
}
