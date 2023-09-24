import { FaFingerprint } from "react-icons/fa6"
import { MdSpaceDashboard } from "react-icons/md"

const navigationItems = [
  {
    href: "/dashboard",
    name: "Dashboard",
    icon: MdSpaceDashboard,
    roles: ["admin", "support"],
    isMobile: true,
    isInMoreMenu: false,
  },
]

export const navigation = (user: any) => {
  const filteredItems = navigationItems.filter((item) => {
    return item.roles.includes(user?.role)
  })

  return filteredItems
}
