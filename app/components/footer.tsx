'use client'

export default function Footer() {
	return (
		<footer className='mt-8'>
			<div className="container flex items-center gap-8 p-6 mx-auto">
				<p className="duration-200 text-zinc-400 hover:text-zinc-100">
					{`AngelGhr ${new Date().getFullYear()} - Made with 💝 by Angel Garza.`}
				</p>
			</div>
		</footer>
	)
}
