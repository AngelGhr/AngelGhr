import { ContentModel, ContentModels } from '@root/types/redisContent'
import ReportView from '@apis/view'
import { Redis } from '@upstash/redis'
import Navigation from '@components/nav'
import ModelContent from '@root/app/components/modelContent'
import Footer from '@root/app/components/footer'

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
    <div className='min-h-screen bg-gradient-to-tl from-black via-zinc-900 to-black'>
      <Navigation views={views} backPath='3d-models-and-shop' />
      <ModelContent model={currentModel} />
      <Footer />
      <ReportView id={currentModel.id} category='models' />
    </div>
  )
}
