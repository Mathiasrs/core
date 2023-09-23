import { ThemeSelector } from "@/components/ThemeSelector"

export default function Home() {
  return (
    <div className="grid gap-4 items-center justify-center m-20 text-4xl">
      <h1>Core Initial</h1>

      <div className="flex place-self-center">
        <ThemeSelector />
      </div>
    </div>
  )
}
