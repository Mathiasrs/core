"use client"

// React
import React, { useState, useEffect } from "react"

// Next
import { useRouter } from "next/navigation"

// Queries
import useUser from "@/app/actions/queries/user/useUser"

// Mutations
import { useUpdateUser } from "@/actions/mutations/user/useUpdateUser"

// Auth
import { signOut } from "next-auth/react"

// Libraries
import { useForm, SubmitHandler } from "react-hook-form"
import { debounce } from "lodash"
import { FaSignOutAlt } from "react-icons/fa"
import clsx from "clsx"

// Components
import EditImage from "@/components/EditImage"
import EditUserSkeleton from "@/components/ui/skeletons/EditUserSkeleton"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "@/components/LoadingSpinner"
import { ThemeSelector } from "@/components/ThemeSelector"

interface IFormInput {
  name: string
  about: string
  url: string
}

export default function EditUser() {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const { data: user, isLoading, error } = useUser()

  const mutation = useUpdateUser()

  const defaultValues = {
    name: "",
    about: "",
    url: "",
  }

  const { register, handleSubmit, setValue } = useForm({ defaultValues })

  const debouncedChange = debounce((event: any) => {
    const { name, value } = event.target
    setValue(name, value)
    handleSubmit(onSubmit)()
  }, 1000)

  useEffect(() => {
    if (user) {
      setValue("name", user.name || "")
      setValue("about", user.about || "")
      setValue("url", user.url || "")
    }
  }, [user, setValue])

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const { name, about, url } = data

    mutation.mutate({
      id: user?.id,
      name,
      about,
      url,
    })
  }

  function signOutButton() {
    function handleSignOut() {
      setIsSigningOut(true)
      signOut()
      router.push("/")
    }

    const button = (
      <Button onClick={() => handleSignOut()}>
        <FaSignOutAlt className="h-4 w-4" />{" "}
        <span className="flex pl-2">Sign out</span>
      </Button>
    )

    if (isSigningOut === true)
      return (
        <Button disabled>
          <LoadingSpinner
            fillColor={"fill-white"}
            textColor={"text-zinc-200 dark:text-zinc-600"}
            className="h-5 w-4"
          />
          <span className="flex pl-2">Signing out</span>
        </Button>
      )

    if (isSigningOut === false) return button
  }

  if (isLoading) return <EditUserSkeleton />
  if (error) return <div>Failed to load</div>

  return (
    <div className="md:col-span-2">
      <div className="rounded-3xl px-4 py-6 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 sm:p-8">
        <div>
          <label
            htmlFor="photo"
            className="mb-2 block text-sm font-medium leading-6 text-zinc-900 dark:text-white"
          >
            Photo
          </label>
          <EditImage isUser user={user} isLoading={isLoading} />
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="pt-8">
          <div className="grid w-full gap-x-6 gap-y-8 ">
            <div className="col-span-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-zinc-900 dark:text-white"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  {...register("name", { maxLength: 40 })}
                  defaultValue={user?.name || ""}
                  disabled={isLoading ? true : false}
                  className={clsx({
                    "block w-full rounded-md border-0 bg-white p-2 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-zinc-700 dark:text-white dark:ring-zinc-600 sm:text-sm sm:leading-6":
                      true,
                    "animate-pulse cursor-not-allowed": isLoading,
                  })}
                  onChange={debouncedChange}
                />
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                The name will show on comments and activities.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-zinc-900 dark:text-white"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  rows={3}
                  {...register("about", { maxLength: 200 })}
                  disabled={isLoading ? true : false}
                  className={clsx({
                    "block w-full rounded-md border-0 bg-white p-2 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-zinc-700 dark:text-white dark:ring-zinc-600 sm:text-sm sm:leading-6":
                      true,
                    "animate-pulse cursor-not-allowed": isLoading,
                  })}
                  onChange={debouncedChange}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600  dark:text-zinc-400">
                Write a few sentences about yourself. Optional.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="url"
                className="block text-sm font-medium leading-6 text-zinc-900 dark:text-white"
              >
                Website
              </label>
              <div className="mt-2">
                <div className="flex rounded-md bg-white shadow-sm ring-1 ring-inset ring-zinc-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 dark:bg-zinc-700 dark:ring-zinc-700">
                  <span className="flex select-none items-center pl-3 text-zinc-500 dark:text-zinc-400 sm:text-sm">
                    https://
                  </span>
                  <input
                    type="text"
                    id="url"
                    {...register("url", { maxLength: 100 })}
                    disabled={isLoading ? true : false}
                    className={clsx({
                      "block flex-1 border-0 bg-transparent py-1.5 pl-1 text-zinc-900 placeholder:text-zinc-400 focus:ring-0 dark:text-white sm:text-sm sm:leading-6":
                        true,
                      "animate-pulse cursor-not-allowed": isLoading,
                    })}
                    placeholder="www.example.com"
                    onChange={debouncedChange}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="url"
                className="block text-sm font-medium leading-6 text-zinc-900 dark:text-white"
              >
                Theme
              </label>

              <div className="my-2">
                <ThemeSelector />
              </div>

              <p className="text-sm leading-6 text-zinc-600  dark:text-zinc-400">
                Choose your prefered theme. As standard it is using your device
                preferred theme setting.
              </p>
            </div>

            <div className="col-span-full">{signOutButton()}</div>
          </div>
        </form>
      </div>
    </div>
  )
}
