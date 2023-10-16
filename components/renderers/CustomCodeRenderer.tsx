"use client"

function CustomCodeRenderer({ data }: any) {
  data

  return (
    <pre className="rounded-md bg-zinc-800 p-4">
      <code className="text-sm text-zinc-100">{data.code}</code>
    </pre>
  )
}

export default CustomCodeRenderer
