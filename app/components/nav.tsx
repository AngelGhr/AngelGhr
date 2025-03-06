'use client'
import { ArrowLeft, Eye } from 'lucide-react'
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

	useEffect(() => {
		if (!ref.current) return
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		)

		observer.observe(ref.current)
		return () => observer.disconnect()
	}, [])

	return (
		<header ref={ref}>
			<div className={twMerge(
				'fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b',
				isIntersecting ? 'bg-zinc-900/0 border-transparent' : 'bg-zinc-900/500  border-zinc-800 '
			)}>
				<div className='container flex flex-row-reverse items-center justify-between p-6 mx-auto'>
					<div className='flex justify-between gap-8'>
						{navLinks.map((link) => <Link href={link.link} className='duration-200 text-zinc-400 hover:text-zinc-100'>{link.name}</Link>)}

						{views && <span
							title="View counter for this page"
							className={twMerge(
								'duration-200 hover:font-medium flex items-center gap-1',
								isIntersecting ? " text-zinc-400 hover:text-zinc-100" : "text-zinc-600 hover:text-zinc-900"
							)}>
							<Eye className='w-5 h-5 mr-1' />{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
						</span>}
					</div>

					<Link	href={`/${backPath ?? ''}`} className='duration-200 text-zinc-300 hover:text-zinc-100'>
						<ArrowLeft className='w-6 h-6 ' />
					</Link>
				</div>
			</div>
		</header>
	)
}
