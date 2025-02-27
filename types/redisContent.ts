export interface ContentTools extends Array<ContentTool>{}

export interface ContentTool {
    id: string
    slug: string
    date: string
    title: string
    published: boolean
    description: string
}