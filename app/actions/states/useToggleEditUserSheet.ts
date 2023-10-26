import { queryClient } from "@/app/providers"
import { useQuery } from "@tanstack/react-query"

interface ToggleState {
  isOpen: boolean
}

export function useToggleEditUserSheet() {
  const { data: isOpen } = useQuery({
    queryKey: ["isEditUserSheetOpen"],
    queryFn: () => ({ isOpen: false }),
  })

  const setIsOpen = () => {
    queryClient.setQueriesData(
      { queryKey: ["isEditUserSheetOpen"] },
      (prev: ToggleState | undefined) => {
        if (!prev) {
          return { isOpen: false }
        }
        return {
          ...prev,
          isOpen: !prev.isOpen,
        }
      },
    )
  }

  return { isOpen, setIsOpen }
}
