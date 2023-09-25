import React from "react"
import { FaSignOutAlt } from "react-icons/fa"
import { FaRegTrashCan } from "react-icons/fa6"

export default function ProfileFormSkeleton() {
  return (
    <div className=" md:col-span-2">
      <div className="rounded-3xl bg-white px-4 py-6 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800 sm:p-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="photo"
              className="mb-2 block text-sm font-medium leading-6 text-zinc-900 dark:text-white"
            >
              Photo
            </label>
            <div className="h-56 w-56 animate-pulse rounded-full bg-zinc-300 dark:bg-zinc-700 xl:h-32 xl:w-32" />
          </div>

          <div className="col-span-full">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-zinc-900 dark:text-white"
            >
              Name
            </label>
            <div className="mt-2">
              <div className="block h-10 animate-pulse rounded-md bg-zinc-300 dark:bg-zinc-700 " />
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
              <div className="block h-20 animate-pulse rounded-md bg-zinc-300 dark:bg-zinc-700 " />
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
              <div className="block h-10 animate-pulse rounded-md bg-zinc-300 dark:bg-zinc-700 " />
            </div>
          </div>
        </div>

        <div className="mt-10 flex w-full animate-pulse items-center justify-center rounded-md p-3 text-base font-medium text-zinc-500 ring-2 ring-zinc-200 hover:opacity-80 dark:text-white dark:ring-zinc-700">
          <FaSignOutAlt className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <div className="pl-3">
            <p className="text-base font-medium">Sign out</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl bg-white shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-800 md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="col-span-full grid gap-x-6 gap-y-8">
            <div className="col-span-full">
              <h3 className="text-md block font-medium leading-6 text-zinc-900 dark:text-white">
                Delete profile
              </h3>

              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                If you decide to delete your profile, your activities will be deleted and you cannot
                get them back.
              </p>
            </div>

            <div className="flex w-full animate-pulse items-center justify-center rounded-md p-3 text-base font-medium text-zinc-500 ring-2 ring-zinc-200 hover:opacity-80 dark:text-white dark:ring-zinc-700">
              <FaRegTrashCan className="h-5 w-5" aria-hidden="true" />
              <div className="pl-3">
                <p className="text-base font-medium">Delete</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
