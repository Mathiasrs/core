import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  EyeOpenIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "documentation",
    label: "Documentation",
    classNames: "bg-gray-300 text-gray-900 dark:text-white dark:bg-gray-500",
  },
  {
    value: "emerging",
    label: "Emerging",
    classNames: "bg-red-300 text-red-900 dark:text-white dark:bg-red-500",
  },
  {
    value: "how-to",
    label: "How-to",
    classNames: "bg-green-300 text-gray-900 dark:text-white dark:bg-green-500",
  },
  {
    value: "new",
    label: "New",
    classNames: "bg-gray-300 text-gray-900 dark:text-white dark:bg-gray-500",
  },
  {
    value: "sop",
    label: "SOP",
    classNames: "bg-sky-300 text-gray-900 dark:text-white dark:bg-sky-500",
  },
]

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "in review",
    label: "In Review",
    icon: EyeOpenIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]
