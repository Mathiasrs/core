import { type } from "os"

interface Logo {
  color: string
  className?: string
}

interface Photo {
  id: string
  caption: string
  media_url: string
  url: string
  alternativeText: string
  isFeatured: boolean
  externalUrl: string
  contentId: string
  timestamp: string
  media_type: string
  permalink: string
  date: date
}

interface Session {
  user: any
  email: string
  id: string
  image: string
  name: string
}

interface User {
  id?: string
  name?: string
  about?: string
  image?: string
  url?: string
  userId?: string
}

interface Image {
  secure_url?: any
  id: string
  image: string
}
