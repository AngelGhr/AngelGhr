'use client'

import { useEffect } from "react";

export default function ContactFormGeneral() {
	useEffect(() => {
		const loadForm = () => {
			let r, d=document, gt=d.getElementById, cr=d.createElement, tg=d.getElementsByTagName, id="aidaform-app";
			if (!gt.call(d,id)) {
				r=cr.call(d,"script");
				r.id=id;
				// @ts-ignore
				r.src="https://widget.aidaform.com/embed.js";
				d.getElementById('contactform-general')?.appendChild(r);
			}
		}
	
		loadForm()
	}, [])

	return <>
		<div id='contactform-general' className='flex items-center absolute z-100 top-0 left-0 h-full w-full backdrop-blur duration-200 bg-zinc-900/0 justify-center'>
			<div className='bg-zinc-900/0 rounded-lg overflow-hidden w-7/8 max-w-180 h-7/8 max-h-180 overflow-y-scroll' data-aidaform-app="form202405" data-url="https://angelghr.aidaform.com/free-basic-contact-form" data-width="100%" data-height="500px" data-do-resize />
		</div>
		<div className='fixed z-140 block top-1 right-2 w-8 h-8 bg-zinc-900/0 rounded-lg text-white text-center pt-0.5'>x</div>
	</>
}
