import { ContentTool, ContentTools } from '@root/types/redisContent'
import { Header } from './header'
import { ReportView } from './view'
import { Redis } from '@upstash/redis'

export const revalidate = 60

type Props = {
  params: {
    slug: string
  }
}

const redis = Redis.fromEnv()

export default async function PostPage({ params }: Props) {
  const slug = params?.slug
  const availableTools: ContentTools | null = await redis.json.get('tools')

  if (!availableTools) {
    return null
  }

  const currentTool: ContentTool | undefined = availableTools.find((tool) => tool.slug === slug)

  if (!currentTool) {
    return null
  }

  const views = await redis.get<number>(`pageviews:tools:${currentTool.id}`) ?? 0

  return (
    <div className='bg-zinc-50 min-h-screen'>
      <Header tool={currentTool} views={views} />
      <ReportView slug={currentTool.slug} />

      <article className='px-4 py-12 mx-auto prose prose-zinc prose-quoteless'>
        {currentTool.description}
      </article>
    </div>
  )
}
