export interface IPost {
  id: number
  slug: string
  featured_media: number
  title: {
    rendered: string
  }
  excerpt: {
    rendered: string
  }
  content: {
    rendered: string
  }
  author: number
  modified: string
}

export interface ICategory {
  id: number
  slug: string
  name: string
  description: string
}

export interface IUser {
  id: number
  slug: string
  name: string
  avatar_urls: {
    96: string
  }
}
