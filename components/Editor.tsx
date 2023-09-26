"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// Next
import { usePathname, useRouter } from "next/navigation"

// Libraries
import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import { z } from "zod"
import { uploadFiles } from "@/lib/uploadthing"
import { ContentCreationRequest, ContentValidator } from "@/lib/validators/content"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

// Components
import { toast } from "@/components/ui/use-toast"

import "@/styles/editor.css"

type FormData = z.infer<typeof ContentValidator>

interface EditorProps {
  contentId: string
}

export const Editor: React.FC<EditorProps> = ({ contentId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ContentValidator),
    defaultValues: {
      contentId,
      title: "",
      content: null,
    },
  })
  const ref = useRef<EditorJS>()
  const _titleRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const pathname = usePathname()

  const { mutate: createArticle } = useMutation({
    mutationFn: async ({
      contentId,
      type,
      title,
      content,
      status,
      label,
      priority,
    }: ContentCreationRequest) => {
      const payload: ContentCreationRequest = {
        contentId,
        type,
        title,
        content,
        status,
        label,
        priority,
      }
      const { data } = await axios.post("/api/create/content/createArticle", payload)
      return data
    },
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your article was not published. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      // turn pathname /r/mycommunity/submit into /r/mycommunity
      const newPathname = pathname.split("/").slice(0, -1).join("/")
      router.push(newPathname)

      router.refresh()

      return toast({
        description: "Your article has been published.",
      })
    },
  })

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default
    const ImageTool = (await import("@editorjs/image")).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Type here to write your article...",
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  //@ts-ignore
                  const [res] = await uploadFiles([file], "imageUploader")

                  return {
                    success: 1,
                    file: {
                      url: res.url,
                    },
                  }
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [])

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value
        toast({
          title: "Something went wrong.",
          description: (value as { message: string }).message,
          variant: "destructive",
        })
      }
    }
  }, [errors])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()

      setTimeout(() => {
        _titleRef?.current?.focus()
      }, 0)
    }

    if (isMounted) {
      init()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save()

    const payload: ContentCreationRequest = {
      title: data.title,
      content: blocks,
      contentId,
      type: "",
    }

    createArticle(payload)
  }

  if (!isMounted) {
    return null
  }

  const { ref: titleRef, ...rest } = register("title")

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
      <form id="article-form" className="w-fit" onSubmit={handleSubmit(onSubmit)}>
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e)
              // @ts-ignore
              _titleRef.current = e
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[500px]" />
          <p className="text-sm text-zinc-500">
            Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open
            the command menu.
          </p>
        </div>
      </form>
    </div>
  )
}
