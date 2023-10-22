import { FaSlack, FaPen, FaBookOpen, FaUsers } from "react-icons/fa6"
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
    href: "/kbase",
    name: "Knowledge Base",
    icon: FaBookOpen,
    roles: ["admin", "manager"],
    isMobile: true,
    isInMoreMenu: false,
    isNewTap: false,
  },
  {
    index: 3,
    href: "/content",
    name: "Content",
    icon: FaPen,
    roles: ["admin", "manager"],
    isMobile: true,
    isInMoreMenu: false,
    isNewTap: false,
  },
  {
    index: 4,
    href: "https://ordrestyring.slack.com",
    name: "Slack",
    icon: FaSlack,
    roles: ["admin", "support"],
    isMobile: false,
    isInMoreMenu: true,
    isNewTap: true,
  },
  {
    index: 5,
    href: "/users",
    name: "Users",
    icon: FaUsers,
    roles: ["admin", "manager"],
    isMobile: false,
    isInMoreMenu: true,
    isNewTap: false,
  },
]

export const navigation = (user: any) => {
  const filteredItems = navigationItems.filter((item) => {
    return item.roles.includes(user?.role)
  })

  return filteredItems
}
