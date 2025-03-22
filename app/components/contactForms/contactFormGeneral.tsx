'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { twMerge } from 'tailwind-merge'
import { FormContent } from './contactFormHandler'

const EMAIL = 'hey@angelghr.de'

interface ContactFormGeneralProps {
  subject: string
  description?: string
}

export default function ContactFormGeneral({ subject, description }: ContactFormGeneralProps) {
  const recaptchaRef = useRef<ReCAPTCHA>(null)
	const [hasError, setHasError] = useState<boolean>(false)
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleCaptchaSubmission(token: string | null) {
    setIsLoading(true)
    try {
      if (token) {
        await fetch('/api/captcha', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token })
        })
				setHasError(false)
        setIsVerified(true)
      }
    } catch (e) {
			setHasError(true)
      setIsVerified(false)
    }
    setIsLoading(false)
  }

  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token)
  }

  function handleExpired() {
    setIsVerified(false)
  }

	const isButtonEnabled = isVerified && !hasError

	return <>
		<div id='contactform-general' className='flex flex-col items-center absolute z-100 top-0 left-0 h-full w-full backdrop-blur duration-200 bg-zinc-900/0 justify-center'>
			<ReCAPTCHA
				sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
				ref={recaptchaRef}
				onChange={handleChange}
				onExpired={handleExpired}
				className='flex justify-center'
			/>
      <p className='w-full max-w-80 my-4 text-white text-center'>{description}</p>
			<Link
				className={twMerge(
          'bg-transparent px-8 py-2 border border-zinc-200 text-zinc-200 rounded-lg mt-4',
          !isButtonEnabled && 'opacity-20 cursor-not-allowed'
        )}
				type='submit'
				href={isButtonEnabled
          ? `mailto:${EMAIL}?subject=${subject}${subject === FormContent.Personalise.Subject ? `&body=Reference: ${window.location.pathname}` : ''}`
          : '#'
        }
			>
				Send Email!
        {isLoading && <Image className='ml-2 inline-block animate-spin' src='/icons/loader.svg' width={20} height={20} alt='Loader' title='Loader' />}
			</Link>
		</div>
		<div className='fixed z-140 block top-1 right-2 w-8 h-8 bg-zinc-900/0 rounded-lg text-white text-center pt-0.5'>x</div>
	</>
}
