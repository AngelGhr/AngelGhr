'use client'

interface GoogleAdProps {
	adSlot: string
}

export default function GoogleAd({ adSlot }: GoogleAdProps) {
	return <>
		<script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.GOOGLE_ADS_CLIENT_ID}`} crossOrigin='anonymous'></script>
			<ins
				className='adsbygoogle'
				style={{ display: 'block' }}
				data-ad-client={process.env.GOOGLE_ADS_CLIENT_ID}
				data-ad-slot={adSlot}
				data-ad-format='auto'
				data-full-width-responsive='true'
			/>
		<script>(adsbygoogle = window.adsbygoogle || []).push({})</script>
	</>
}
