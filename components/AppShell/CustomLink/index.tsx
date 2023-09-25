import Link from "next/link"

export default function CustomLink({ href, children, disabled, isNewTap, ...props }: any) {
  return (
    <>
      {disabled ? (
        <div {...props}>{children}</div>
      ) : (
        <>
          {isNewTap ? (
            <Link href={href} target="_blank" {...props}>
              {children}
            </Link>
          ) : (
            <Link href={href} {...props}>
              {children}
            </Link>
          )}
        </>
      )}
    </>
  )
}
