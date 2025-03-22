'use client'

import Link from 'next/link'
import Navigation from '@root/app/components/nav'
import { Card } from '@components/card'
import Image from 'next/image'
import Footer, { Social, socials } from '@components/footer'
import ContactForm, { FormContent } from '@components/contactForms/contactFormHandler'
import { useState } from 'react'

const ContactCard = (social: Social, index?: number) => {
	return <Card key={index}>
		<Link
			href={social.href}
			target='_blank'
			className='p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-16 md:p-16'
		>
			<span	className='absolute w-px top-16 md:top-28 h-1/2 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent' aria-hidden='true' />
			<span className='relative z-10 flex items-center justify-center w-12 h-12 text-sm text-zinc-200 group-hover:text-white'>
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
}

export default function ContactPage() {
	const [ isContactFormOpen, setIsContactFormOpen ] = useState<boolean>(false)

	return (
		<div className=' bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0'>
			<Navigation />
			<div className='container flex items-center justify-center min-h-screen px-4 mx-auto'>
				<div className='grid w-full grid-cols-2 gap-8 mx-auto mt-32 sm:mt-0 md:grid-cols-4 lg:gap-16'>
					{socials.map((social, index) => ContactCard(social, index))}

					<Card>
						<Link
							onClick={(event) => { 
								event.preventDefault()
								setIsContactFormOpen(true)	
							}}
							href='#'
							className='p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-16 md:p-16'
						>
							<span	className='absolute w-px top-16 md:top-28 h-1/2 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent' aria-hidden='true' />
							<span className='relative z-10 flex items-center justify-center w-12 h-12 text-sm text-zinc-200 group-hover:text-white'>
								<Image src='/icons/envelope.svg' width={48} height={48} alt='Contact Me' title='Contact Me' className='invert' />
							</span>
							<div className='z-10 flex flex-col items-center'>
								<span className='lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display'>@angelghr.de</span>
								<span className='mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200'>Contact Me</span>
							</div>
						</Link>
					</Card>
				</div>
			</div>
			<Footer />
			<ContactForm formContent={FormContent.General} isOpen={isContactFormOpen} setIsContactFormOpen={setIsContactFormOpen} />
		</div>
	)
}
