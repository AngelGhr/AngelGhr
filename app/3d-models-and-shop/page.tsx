import React from 'react'
import Navigation from '@components/nav'
import { Card } from '@components/card'
import { Article } from './article'
import { Redis } from '@upstash/redis'
import { ContentModels } from '@root/types/redisContent'

const redis = Redis.fromEnv()

export const revalidate = 60
export default async function ModelsPage() {
  const isPreview = process.env.PREVIEW_DOMAIN
  const previewSubdomain = isPreview ? `${isPreview}:` : ''
  const contentNameToGet = `${previewSubdomain}models`
  const availableModels: ContentModels | null = await redis.json.get(contentNameToGet)

  if (!availableModels) {
    return null
  }

  const views = (
    await redis.mget<number[]>(...availableModels.map((p) => ['pageviews', 'models', p.id].join(':')))
  ).reduce((acc, v, i) => {
    acc[availableModels[i].slug] = v ?? 0
    return acc
  }, {} as Record<string, number>)

  const sorted = availableModels
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() - new Date(a.date ?? Number.POSITIVE_INFINITY).getTime())

  return (
    <div className='relative pb-16'>
      <Navigation />
      <div className='container px-6 pt-20 mx-auto space-y-8 lg:px-8 md:space-y-16 md:pt-24 lg:pt-32'>
        <div className='max-w-2xl mx-auto lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl'>
            Models
          </h2>
          <p className='mt-4 text-zinc-400'>
            3D Models designed by me and Online Shop.
          </p>
        </div>
        <div className='w-full h-px bg-zinc-800' />

        <div className='grid grid-cols-2 gap-4 mx-auto lg:mx-0 md:grid-cols-3 lg:grid-cols-4'>
          {sorted.map((model) => (
            <Card key={model.slug}>
              <Article model={model} views={views[model.slug] ?? 0} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
