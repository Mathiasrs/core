import { queryClient } from "@/app/providers"
import { useQuery } from "@tanstack/react-query"

interface ToggleState {
  isOpen: boolean
}

export function useToggleEditUserSheet() {
  const { data: isOpen } = useQuery(["isEditUserSheetOpen"], () => ({
    isOpen: false,
  }))

  const setIsOpen = () => {
    queryClient.setQueryData(
      ["isEditUserSheetOpen"],
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
