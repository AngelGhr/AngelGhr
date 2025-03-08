interface ReportViewProps {
	id: string,
	category: string
}

export default async function ReportView({ id, category }: ReportViewProps) {
	const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://angelghr.de"

	fetch(`${baseUrl}/api/incr`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id, category })
	})

	return null
}
