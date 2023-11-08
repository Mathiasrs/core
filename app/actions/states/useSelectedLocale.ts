import { queryClient } from "@/app/providers"
import { useQuery } from "@tanstack/react-query"

// types
import { Locale } from "types/typings"

const fallbackLocale: Locale = {
  id: "",
  code: "en-US",
  name: "English (US)",
  default: true,
  tenantId: "",
}

export function useSelectedLocale(locales: Locale[]) {
  const defaultLocale =
    locales.find((locale) => locale.default) || fallbackLocale

  const { data: selectedLocale } = useQuery<Locale>({
    queryKey: ["selectedLocale"],
    queryFn: () => defaultLocale,
    initialData: defaultLocale,
  })

  const setSelectedLocale = (newLocale: Locale) => {
    queryClient.setQueryData<Locale>(["selectedLocale"], newLocale)
  }

  return { selectedLocale, setSelectedLocale }
}
