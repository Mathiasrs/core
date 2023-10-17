import { MainNavItem, SidebarNavItem } from "@/types/nav"

interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Knowledge Base",
      href: "/kbase",
    },
    {
      title: "Slack",
      href: "https://ordrestyringdk.slack.com/",
    },
  ],
  sidebarNav: [
    {
      title: "Settings",
      items: [
        {
          title: "Profile",
          href: "/profile",
          items: [],
        },
      ],
    },
    
    
  ],
}