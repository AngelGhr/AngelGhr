import { ContentTool, ContentTools } from '@root/types/redisContent'
import ArticleHeader from '@components/articleHeader'
import ReportView from '@apis/view'
import { Redis } from '@upstash/redis'
import Navigation from '@components/nav'
import React from 'react'

export const revalidate = 60

type Props = {
  params: Promise<any>
}

const redis = Redis.fromEnv()

export default async function PostPage({ params }: Props) {
  const slug = await params.then(params => params.slug)
  const availableTools: ContentTools | null = await redis.json.get('tools')

  if (!availableTools) {
    return null
  }

  const currentTool: ContentTool | undefined = availableTools.find((tool) => tool.slug === slug)

  if (!currentTool) {
    return null
  }

  const views = await redis.get<number>(`pageviews:tools:${currentTool.id}`) ?? 0

  const Component = await import(`../../components/${currentTool.component}/main.tsx`).then(component => component.default)

  return (
    <div className='bg-zinc-50 min-h-screen'>
      <Navigation views={views} backPath='tools-and-games' />
      <ArticleHeader tool={currentTool} />
      <ReportView slug={currentTool.slug} category='tools' />

      <article className='px-4 py-12 mx-auto prose prose-zinc prose-quoteless'>
        {Component && <Component />}
      </article>
    </div>
  )
}
