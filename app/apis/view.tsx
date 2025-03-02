'use client'
import { useEffect } from 'react'

interface ReportViewProps {
	slug: string,
	category: string
}

export default async function ReportView({ slug, category }: ReportViewProps) {
	useEffect(() => {
		fetch('/api/incr', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ slug, category })
		})
	}, [slug, category])

	return null
}
