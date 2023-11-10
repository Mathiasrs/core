import { type } from "os"

interface Logo {
  color: string
  className?: string
}

interface Photo {
  alt: string
  src: string | StaticImport
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
  status?: string
  userId?: string
  theme?: string
}

interface Settings {
  id?: string
  userId?: string
  theme?: string
  locale?: string
}

interface Permission {
  id: string
  permissionKey: string
  value: boolean
}

interface Image {
  secure_url?: any
  id: string
  image: string
}

interface MessageProps {
  category: string
  title: string
  description: string
}

interface Locale {
  id: string
  code: string
  name: string
  default: boolean
  tenantId: string
}
