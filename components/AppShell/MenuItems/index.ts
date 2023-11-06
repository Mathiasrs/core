import usePermissions from "@/app/actions/queries/user/usePermissions"
import { FaSlack, FaPen, FaBookOpen, FaUsers } from "react-icons/fa6"
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
    href: "https://ordrestyringdk.slack.com",
    name: "Slack",
    icon: FaSlack,
    permissions: {
      userCanViewSlack: true,
    },
    isMobile: false,
    isInMoreMenu: true,
    isNewTap: true,
  },
  {
    index: 5,
    href: "/users",
    name: "Users",
    icon: FaUsers,
    permissions: {
      userCanViewUsers: true,
    },
    isMobile: false,
    isInMoreMenu: true,
    isNewTap: false,
  },
]

function checkPermissions(permissions: any, itemPermissions: any) {
  if (!permissions) return false

  return Object.keys(itemPermissions).every(
    (permission) => itemPermissions[permission] === permissions[permission],
  )
}

export default function navigation(permissions: any) {
  const filteredItems = navigationItems.filter((item) =>
    checkPermissions(permissions, item.permissions),
  )

  return filteredItems
}
