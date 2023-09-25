import { FaSlack } from "react-icons/fa6"
import { MdSpaceDashboard } from "react-icons/md"

const navigationItems = [
  {
    index: 1,
    href: "/dashboard",
    name: "Dashboard",
    icon: MdSpaceDashboard,
    roles: ["admin", "support"],
    isMobile: true,
    isInMoreMenu: false,
    isNewTap: false,
  },
  {
    index: 2,
    href: "https://ordrestyring.slack.com",
    name: "Slack",
    icon: FaSlack,
    roles: ["admin", "support"],
    isMobile: false,
    isInMoreMenu: true,
    isNewTap: true,
  },
]

export const navigation = (user: any) => {
  const filteredItems = navigationItems.filter((item) => {
    return item.roles.includes(user?.role)
  })

  return filteredItems
}
