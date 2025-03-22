'use client'
import ContactFormGeneral from '@components/contactForms/contactFormGeneral'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

export const FormContent = {
	General: {
		Subject: 'Contact from AngelGhr.',
	},
	Bug: {
		Subject: 'Found a Bug on your site...',
		Description: 'Please provide a small description with pictures and, if available, replication steps.'
	},
	CustomDesign: {
		Subject: 'I need a custom design.',
		Description: 'Please provide pictures, measurements or general idea. If you\'d like to use one of our current designs as an initial idea, initiate the contact process from the product page.'
	},
	Personalise: {
		Subject: 'I need a custom design based on a product.',
		Description: 'Please provide pictures, measurements or general idea.'
	}
}

interface ContactFormProps {
	isOpen: boolean
	formContent: { Subject: string, Description?: string }
	setIsContactFormOpen: Dispatch<SetStateAction<boolean>>
}

export default function ContactForm({ isOpen = false, formContent, setIsContactFormOpen }: ContactFormProps) {
	useEffect(() => {
		if (isOpen) {
			document.querySelector('body')?.classList.add('disable-scroll')
		} else {
			document.querySelector('body')?.classList.remove('disable-scroll')
		}
	}, [isOpen])

	if (!ContactForm) {
		return null
	}

	return (
		<div className={twMerge(
			'flex items-center fixed z-100 top-0 left-0 h-full w-full backdrop-blur duration-200 bg-zinc-900/0 justify-center',
			!isOpen && 'hidden'
		)} onClick={() => setIsContactFormOpen(false)}>
			<ContactFormGeneral subject={formContent.Subject} description={formContent.Description} />
		</div>
	)
}
