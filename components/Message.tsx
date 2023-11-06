import { MessageProps } from "types/typings"

export default function Message({
  category,
  title,
  description,
}: MessageProps) {
  return (
    <div className="m-20 text-center">
      <h2 className="text-base font-semibold uppercase tracking-wide text-green-600">
        {category}
      </h2>
      <p className="mt-1 text-4xl font-extrabold text-zinc-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
        {title}
      </p>
      <p className="mx-auto mt-5 max-w-xl text-xl text-zinc-500 dark:text-zinc-400">
        {description}
      </p>
    </div>
  )
}
