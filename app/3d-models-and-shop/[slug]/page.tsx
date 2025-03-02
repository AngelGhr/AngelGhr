import { ContentModel, ContentModels } from '@root/types/redisContent'
import { Header } from './header'
import ReportView from '@apis/view'
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
  const availableModels: ContentModels | null = await redis.json.get('models')

  if (!availableModels) {
    return null
  }

  const currentModel: ContentModel | undefined = availableModels.find((model) => model.slug === slug)

  if (!currentModel) {
    return null
  }

  const views = await redis.get<number>(`pageviews:models:${currentModel.id}`) ?? 0

  return (
    <div className='bg-zinc-50 min-h-screen'>
      <Header tool={currentModel} views={views} />
      <ReportView slug={currentModel.slug} category='models' />

      <article className='px-4 py-12 mx-auto prose prose-zinc prose-quoteless'>
        {currentModel.description}
      </article>
    </div>
  )
}
