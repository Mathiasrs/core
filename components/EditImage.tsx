"use client"

import { useState } from "react"

// Next
import { usePathname } from "next/navigation"
import Image from "next/image"

// Libraries
import clsx from "clsx"
import { FaCamera, FaCloudArrowUp } from "react-icons/fa6"

// Mutations
import { useUpdateImage } from "@/actions/mutations/user/useUpdateImage"

// Components
import { FaCheckCircle } from "react-icons/fa"
import { Button } from "./ui/button"
import LoadingSpinner from "./LoadingSpinner"

export default function EditImage({ user, isUser, isLoading }: any) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [showCheckmark, setShowCheckmark] = useState(false)

  const pathname = usePathname()

  const mutation = useUpdateImage()

  const cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_IMAGES

  const handleOnChange = (event: any) => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)

    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as any)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("file", file as any)
    formData.append("upload_preset", upload_preset as string)

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Image upload failed")
    }

    const data = await response.json()

    mutation.mutate({
      id: user?.id,
      image: data?.secure_url,
    })

    setShowCheckmark(true)

    setTimeout(() => {
      setShowCheckmark(false)
    }, 3000)

    setPreview(data.secure_url)

    setFile(null)
    setIsSubmitting(false)
  }

  return (
    <div className="mt-6 grid gap-8 lg:flex">
      <Image
        className={clsx(
          "mx-auto rounded-full object-cover ring-4 ring-white dark:ring-zinc-950 lg:mx-0",
          isUser ? "h-56 w-56 xl:h-32 xl:w-32" : "h-56 w-56",
          isLoading ? "animate-pulse" : ""
        )}
        src={
          preview ||
          user?.image ||
          "https://res.cloudinary.com/dwh5z8lp5/image/upload/v1687339586/za4mqfois45pscl4xfk5.png"
        }
        alt="User Image"
        width={isUser ? 128 : 224}
        height={isUser ? 128 : 224}
      />

      {pathname === "/profile" || pathname === "/home" ? (
        <form
          method="post"
          onChange={handleOnChange}
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          {showCheckmark ? (
            <Button disabled={!file}>
              <FaCheckCircle className="h-5 w-5 lg:h-4 lg:w-4 text-green-500" />
              <span className="pl-2">Upload complete</span>
            </Button>
          ) : file ? (
            <Button disabled={!file || isSubmitting}>
              {isSubmitting ? (
                <LoadingSpinner
                  fillColor={"fill-white"}
                  textColor={"text-zinc-200 dark:text-zinc-600"}
                  className="w-4 h-5"
                />
              ) : (
                <FaCloudArrowUp className="h-5 w-5 lg:h-4 lg:w-4" />
              )}
              <span className="pl-2">{isSubmitting ? "Uploading" : "Upload now"}</span>
            </Button>
          ) : (
            <Button type="button" fileSelector>
              <label className="flex gap-2">
                <FaCamera className="h-5 w-5 lg:h-4 lg:w-4" /> Change avatar
                <input
                  type="file"
                  name="file"
                  accept=".jpg, .jpeg, .png, .webp, .heic"
                  className="hidden"
                />
              </label>
            </Button>
          )}

          <p className="mt-2 text-center text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            JPG, PNG or HEIC.
          </p>
        </form>
      ) : null}
    </div>
  )
}
