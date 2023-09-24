import Link from "next/link"

export default function CustomLink({ href, children, disabled, ...props }: any) {
  return (
    <>
      {disabled ? (
        <div {...props}>{children}</div>
      ) : (
        <Link href={href} {...props}>
          {children}
        </Link>
      )}
    </>
  )
}
