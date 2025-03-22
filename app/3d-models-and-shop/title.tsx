'use client'
import Link from 'next/link'
import { useState } from 'react'
import ContactForm, { FormContent } from '@components/contactForms/contactFormHandler'
import Image from 'next/image'

export default function Title() {
	const [isCustomFormOpen, setIsCustomFormOpen] = useState<boolean>(false)

	return <>
		<div className='max-w-2xl mx-auto lg:mx-0'>
			<h2 className='text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl'>
				Models
			</h2>
			<p className='mt-4 text-zinc-400'>
				Discover high-quality 3D-printed car accessories and tools designed for style, functionality, and durability. We offer a range of customizable designs, allowing you to personalize your car with unique, precision-crafted parts. Whether you're looking for practical upgrades or stylish enhancements, we've got you covered!
			</p>
			<Link
				href='#'
				onClick={(event) => {
					event.preventDefault()
					setIsCustomFormOpen(true)
				}}
				className='mt-4 inline-flex overflow-hidden text-white rounded group border border-white'
			>
				<span className='px-3.5 py-2 text-white bg-white/80 group-hover:bg-white flex items-center justify-center duration-300'>
					<Image src='/icons/customdesign.svg' width={20} height={20} alt='Shopping Bag' title='Shopping Bag' />
				</span>
				<span className='p-4'>Get your custom design here...</span>
			</Link>
		</div>
		<ContactForm formContent={FormContent.CustomDesign} isOpen={isCustomFormOpen} setIsContactFormOpen={setIsCustomFormOpen} />
	</>
}
