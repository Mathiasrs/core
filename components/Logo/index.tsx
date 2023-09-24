import clsx from "clsx"

export function Logo({ isLarge }: { isLarge?: boolean }) {
  return <div className={clsx(isLarge ? "text-6xl" : "text-xl")}>Core</div>
}
