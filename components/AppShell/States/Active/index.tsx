"use client"

import { useEffect, useState } from "react"

// Next
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

//Libraries
import clsx from "clsx"
import { FaBars, FaArrowRight } from "react-icons/fa6"
import { motion } from "framer-motion"

// Components
import { navigation } from "@/components/AppShell/MenuItems"
import { Logo } from "@/components/Logo"
import CustomLink from "@/components/AppShell/CustomLink"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Active({ user, session, children }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const pathname = usePathname()

  function resetStates() {
    setIsMenuOpen(false)
  }

  const variants = {
    open: {
      y: 0,
      zIndex: 10,
      transition: { ease: "easeOut", duration: 0.2 },
    },
    closed: {
      y: "200%",
      transition: { ease: "easeIn", duration: 0.6 },
    },
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", resetStates)
    }

    return () => {
      document.removeEventListener("click", resetStates)
    }
  }, [isMenuOpen])

  return (
    <div className="h-screen w-full overflow-hidden md:flex">
      {/* Large screens */}
      <aside className="hidden w-fit overflow-hidden pr-14 md:grid">
        <div className="mt-10 flex flex-col justify-between">
          <div className="flex flex-col gap-8">
            <div className="mb-4 flex pl-6 text-left">
              <Logo />
            </div>
            {navigation(user).map((item: any) => (
              <div key={`desktop-${item.index}`}>
                <CustomLink
                  href={item.href}
                  isNewTap={item.isNewTap}
                  className={clsx(
                    "min-w-40 text-md flex items-center justify-items-center gap-2 pl-6 text-zinc-900  dark:text-zinc-400",
                    {
                      "border-l-2 border-green-500":
                        pathname &&
                        (item.href === "/"
                          ? pathname === item.href
                          : pathname.startsWith(item.href)),
                    },
                    item.approvalStatus && !user.isApproved
                      ? "cursor-not-allowed opacity-50"
                      : " hover:font-semibold",
                  )}
                >
                  <item.icon
                    className={clsx({
                      "text-zinc-950 dark:text-white":
                        pathname &&
                        (item.href === "/"
                          ? pathname === item.href
                          : pathname.startsWith(item.href)),
                    })}
                  />
                  <span
                    className={clsx({
                      "font-semibold text-zinc-950 dark:text-white":
                        pathname &&
                        (item.href === "/"
                          ? pathname === item.href
                          : pathname.startsWith(item.href)),
                    })}
                  >
                    {item.name}
                  </span>
                </CustomLink>
              </div>
            ))}
          </div>
          <div>
            {session ? (
              <Link
                href="/profile"
                className="flex items-center justify-between p-4 hover:opacity-80"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={
                      session?.user?.image
                        ? session?.user?.image || user.image
                        : "https://res.cloudinary.com/dwh5z8lp5/image/upload/v1687339586/za4mqfois45pscl4xfk5.png"
                    }
                    alt={user?.name}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-3xl object-cover ring-2 ring-white ring-opacity-40 focus:outline-none focus:ring-opacity-100 xl:h-10 xl:w-10"
                  />

                  <div className="flex items-center gap-4 pl-2 text-left text-xs xl:text-sm">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-semibold text-zinc-900 dark:text-white">
                        {user?.name.split(" ")[0]}
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-300">
                        {session?.user?.email}
                      </p>
                    </div>
                    <FaArrowRight className="text-xs text-zinc-950 dark:text-white" />
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                href="/settings"
                className="flex items-center justify-between p-4 hover:opacity-80"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src="https://res.cloudinary.com/dwh5z8lp5/image/upload/v1687339586/za4mqfois45pscl4xfk5.png"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-3xl object-cover ring-2 ring-white ring-opacity-40 focus:outline-none focus:ring-opacity-100 xl:h-10 xl:w-10"
                  />

                  <div className="flex items-center gap-4 text-left text-xs xl:text-sm">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-white">
                        {user?.name.split(" ")[0]}
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-300">
                        {session?.user?.email}
                      </p>
                    </div>
                    <FaArrowRight className="text-xs text-zinc-950 dark:text-white" />
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </aside>

   

<ScrollArea className="h-full w-full bg-white shadow-lg ring-1 ring-zinc-100 dark:bg-zinc-950 dark:ring-zinc-900 md:mt-4 md:rounded-tl-xl">
  <div className="mb-20 md:mb-0 py-8 px-8">
  {children}</div>
  </ScrollArea>

      {/* Small screens*/}
      <aside className="absolute inset-x-0 bottom-0 z-40 m-4 rounded-md bg-white shadow-lg ring-1 ring-zinc-100 dark:bg-zinc-950 dark:ring-zinc-900 md:hidden">
        <div className="flex justify-between gap-4 px-8">
          {navigation(user)
            .filter((item: any) => item.isMobile)
            .map((item: any) => (
              <div key={`mobile-${item.index}`}>
                <CustomLink
                  href={item.href}
                  isNewTap={item.isNewTap}
                  className={clsx(
                    "mt-1 flex flex-col items-center justify-items-center gap-1 py-2 text-xs text-zinc-900 dark:text-zinc-300",
                    {
                      "border-b-2 border-green-500":
                        pathname &&
                        (item.href === "/"
                          ? pathname === item.href
                          : pathname.startsWith(item.href)),
                    },
                  )}
                >
                  <item.icon
                    className={clsx("h-5 w-5", {
                      "text-zinc-950 dark:text-white":
                        pathname &&
                        (item.href === "/"
                          ? pathname === item.href
                          : pathname.startsWith(item.href)),
                    })}
                  />
                  <span
                    className={clsx({
                      "font-semibold text-zinc-950 dark:text-white":
                        pathname &&
                        (item.href === "/"
                          ? pathname === item.href
                          : pathname.startsWith(item.href)),
                    })}
                  >
                    {item.name}
                  </span>
                </CustomLink>
              </div>
            ))}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mt-1 flex flex-col items-center justify-items-center gap-1 py-2 text-xs text-zinc-900 dark:text-zinc-300"
          >
            <FaBars className="h-5 w-5 text-zinc-950 dark:text-white" />
            <span className="text-zinc-950 dark:text-white">More</span>
          </button>
        </div>
      </aside>

      {isMenuOpen ? (
        <motion.div
          initial={{ y: "100%", zIndex: 0 }}
          animate={isMenuOpen ? "open" : "closed"}
          variants={variants}
          className="absolute inset-x-0 bottom-0 z-30 m-4 mb-16 rounded-md bg-white ring-1 ring-zinc-100 dark:bg-zinc-950 dark:ring-zinc-900"
        >
          <nav className="h-full w-full p-2 text-zinc-900 dark:text-white">
            <div className="b flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900">
              <h3 className="pb-2 pl-5 text-xl font-bold">More</h3>
            </div>

            <div className="flex flex-col gap-y-2">
              {session ? (
                <Link
                  href="/profile"
                  className="flex items-center justify-between border-b border-zinc-100 p-4 hover:opacity-80 dark:border-zinc-900"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        session?.user?.image
                          ? session?.user?.image || user.image
                          : "https://res.cloudinary.com/dwh5z8lp5/image/upload/v1687339586/za4mqfois45pscl4xfk5.png"
                      }
                      alt={session?.user?.name}
                      width={32}
                      height={32}
                      className="h-10 w-10 rounded-3xl object-cover ring-2 ring-white ring-opacity-40 focus:outline-none focus:ring-opacity-100"
                    />

                    <div className="text-left">
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {user?.name.split(" ")[0]}
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-300">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <FaArrowRight className="text-zinc-950 dark:text-white" />
                  </div>
                </Link>
              ) : (
                <Link
                  href="/settings"
                  className="flex items-center justify-between border-b border-zinc-300 p-4 hover:opacity-80 dark:border-zinc-700"
                >
                  <div className="flex items-center gap-x-4">
                    <Image
                      src="https://res.cloudinary.com/dwh5z8lp5/image/upload/v1687339586/za4mqfois45pscl4xfk5.png"
                      alt="Profile"
                      width={32}
                      height={32}
                      className="h-10 w-10 rounded-3xl object-cover ring-2 ring-white ring-opacity-40 focus:outline-none focus:ring-opacity-100"
                    />

                    <div className="text-left">
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Sign in
                      </h3>
                      <p className="text-zinc-500 dark:text-zinc-300">User</p>
                    </div>
                  </div>
                  <div>
                    <FaArrowRight className="text-zinc-950 dark:text-white" />
                  </div>
                </Link>
              )}

              <div>
                {navigation(user)
                  .filter((item: any) => item.isInMoreMenu)
                  .map((item: any, index: any) => (
                    <motion.div
                      key={`motion-${item.index}`}
                      initial={{ y: 200, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: (index + 2) * 0.2,
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <CustomLink
                        href={item.href}
                        isNewTap={item.isNewTap}
                        className={clsx("text-md flex items-center gap-2 p-4", {
                          "border-l-2 border-green-500 dark:border-secondary":
                            pathname &&
                            (item.href === "/"
                              ? pathname === item.href
                              : pathname.startsWith(item.href)),
                        })}
                      >
                        <item.icon
                          className={clsx({
                            "text-zinc-950 dark:text-white":
                              pathname &&
                              (item.href === "/"
                                ? pathname === item.href
                                : pathname.startsWith(item.href)),
                          })}
                        />
                        <span
                          className={clsx({
                            "font-semibold text-zinc-950 dark:text-white":
                              pathname &&
                              (item.href === "/"
                                ? pathname === item.href
                                : pathname.startsWith(item.href)),
                          })}
                        >
                          {item.name}
                        </span>
                      </CustomLink>
                    </motion.div>
                  ))}
              </div>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </div>
  )
}
