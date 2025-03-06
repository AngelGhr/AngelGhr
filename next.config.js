/** @type {import('next').NextConfig} */

const nextConfig = {
	async redirects() {
		return [{
			source: '/:path*',
			has: [{
				type: 'host',
				value: 'me.angelghr.de',
			}],
			permanent: false,
			destination: 'https://angelghr.de/contact/',
		}]
	},
	pageExtensions: ['js', 'jsx', 'ts', 'tsx']
}
 
module.exports = nextConfig