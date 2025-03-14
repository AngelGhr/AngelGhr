'use client'

import ContactFormGeneral from '@components/contactForms/contactFormGeneral'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

interface ContactFormProps {
	isOpen: boolean
	formType: 'General'
	setIsContactFormOpen: Dispatch<SetStateAction<boolean>>
}

export default function ContactForm({ isOpen = false, formType, setIsContactFormOpen }: ContactFormProps) {
	const ContactForm = formType === 'General' && ContactFormGeneral

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
			<ContactForm />
		</div>
	)
}
