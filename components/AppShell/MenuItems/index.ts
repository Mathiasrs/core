import { FaSlack, FaPen, FaBookOpen } from "react-icons/fa6"
import { MdSpaceDashboard } from "react-icons/md"

const navigationItems = [
  {
    index: 1,
    href: "/dashboard",
    name: "Dashboard",
    icon: MdSpaceDashboard,
    permissions: {
      userCanViewDashboard: true,
    },
    isMobile: true,
    isInMoreMenu: false,
    isNewTap: false,
  },
  {
    index: 2,
    href: "/kbase",
    name: "Knowledge Base",
    icon: FaBookOpen,
    permissions: {
      userCanViewContent: true,
    },
    isMobile: true,
    isInMoreMenu: false,
    isNewTap: false,
  },
  {
    index: 3,
    href: "/content",
    name: "Content",
    icon: FaPen,
    permissions: {
      userCanEditContent: true,
    },
    isMobile: true,
    isInMoreMenu: false,
    isNewTap: false,
  },
  {
    index: 4,
    href: "https://ordrestyring.slack.com",
    name: "Slack",
    icon: FaSlack,
    permissions: {
      userCanViewSlack: true,
    },
    isMobile: false,
    isInMoreMenu: true,
    isNewTap: true,
  },
]

function checkPermissions(userPermissions: any, itemPermissions: any) {
  if (!userPermissions) return false

  return Object.keys(itemPermissions).every(
    (permission) => itemPermissions[permission] === userPermissions[permission],
  )
}

export const navigation = (user: any) => {
  const userPermissions = user.permission ? user.permission[0] : null

  const filteredItems = navigationItems.filter((item) =>
    checkPermissions(userPermissions, item.permissions),
  )

  return filteredItems
}
