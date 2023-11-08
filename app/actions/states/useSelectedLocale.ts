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
  const getStoredLocale = (): Locale => {
    const storedLocaleCode =
      typeof window !== "undefined"
        ? localStorage.getItem("selectedLocale")
        : null
    const storedLocale = storedLocaleCode
      ? locales.find((locale) => locale.code === storedLocaleCode)
      : null
    return (
      storedLocale || locales.find((locale) => locale.default) || fallbackLocale
    )
  }

  const { data: selectedLocale } = useQuery<Locale>({
    queryKey: ["selectedLocale"],
    queryFn: getStoredLocale,
    initialData: getStoredLocale,
  })

  const setSelectedLocale = (newLocale: Locale) => {
    localStorage.setItem("selectedLocale", newLocale.code)
    queryClient.setQueryData<Locale>(["selectedLocale"], newLocale)
  }

  return { selectedLocale, setSelectedLocale }
}
