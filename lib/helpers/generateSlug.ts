export function generateSlug(title: string) {
  const lowerCaseTitle = title.toLowerCase()

  const slug = lowerCaseTitle
    .replace(/[^a-zA-Z0-9 -]/g, "")
    .replace(/\s+/g, "-")

  return slug
}
