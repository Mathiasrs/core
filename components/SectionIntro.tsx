export default function SectionIntro({ title, decription }: any) {
  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {title}
      </h3>
      <p className="text-muted-foreground">{decription}</p>
    </>
  )
}
