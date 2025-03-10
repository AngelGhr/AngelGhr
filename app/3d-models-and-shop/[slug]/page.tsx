import { ContentModel, ContentModels } from '@root/types/redisContent'
import ReportView from '@apis/view'
import { Redis } from '@upstash/redis'
import Navigation from '@components/nav'
import ModelHeader from '@root/app/components/modelHeader'

export const revalidate = 60

type Props = {
  params: Promise<any>
}

const redis = Redis.fromEnv()

export default async function PostPage({ params }: Props) {
  const slug = await params.then(params => params.slug)
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
      <Navigation views={views} backPath='3d-models-and-shop' />
      <ModelHeader model={currentModel} />
      <ReportView id={currentModel.id} category='models' />

      <article className='px-4 py-12 mx-auto prose prose-zinc prose-quoteless'>
      </article>
    </div>
  )
}
