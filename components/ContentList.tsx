import ContentCard from "./ContentCard"
import SectionIntro from "./SectionIntro"

export default function ContentList({ data }: any) {
  return (
    <div className="grid gap-6">
      <SectionIntro
        title="All content"
        decription="Here is a list of all the content available. Consider searching or sort by label for quicker access to the specific content you seek."
      />

      <div className="grid gap-6">
        {data.map((content: any) => {
          return <ContentCard key={content?.id} data={content} />
        })}
      </div>
    </div>
  )
}
