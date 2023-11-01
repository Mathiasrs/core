import { createElement } from "react"

// Next
import Image from "next/image"

// Libraries
import { cn } from "@/lib/utils"
import {
  NodeHandler,
  NodeHandlers,
  TipTapRender,
} from "@troop.com/tiptap-react-render"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { useTheme } from "next-themes"

// Styles
import "@/app/styles/index.css"
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism"

export default function ContentRender({ data }: any) {
  const theme = useTheme().resolvedTheme

  const doc: NodeHandler = (props) => (
    <div className="grid gap-2">{props.children}</div>
  )

  const text: NodeHandler = (props) => {
    const bgColorMark = props.node.marks?.find(
      (mark) => mark.type === "highlight",
    )

    const textColorMark = props.node.marks?.find(
      (mark) => mark.type === "textStyle",
    )

    const bgColor = bgColorMark?.attrs?.color
    const textColor = textColorMark?.attrs?.color
    const strike = props.node.marks?.find((mark) => mark.type === "strike")
    const bold = props.node.marks?.find((mark) => mark.type === "bold")
    const italic = props.node.marks?.find((mark) => mark.type === "italic")

    return (
      <span
        style={{ backgroundColor: bgColor, color: textColor }}
        className={`${strike ? "line-through" : ""} ${
          bold ? "font-bold" : ""
        } ${italic ? "italic" : ""}`}
      >
        {props.node.text}
      </span>
    )
  }

  const paragraph: NodeHandler = (props) => {
    return <p>{props.children}</p>
  }

  const heading: NodeHandler = (props) => {
    const level = props?.node?.attrs?.level

    const headingClass = `text-${
      level === 1 ? "6xl" : level === 2 ? "4xl" : "3xl"
    } font-bold`

    return createElement(
      `h${level}`,
      { className: headingClass },
      props.children,
    )
  }

  const listItem: NodeHandler = (props) => {
    return <li className="py-2">{props.children}</li>
  }

  const bulletList: NodeHandler = (props) => {
    return <ul className="list-disc pl-4">{props.children}</ul>
  }

  const orderedList: NodeHandler = (props) => {
    return <ol className="list-decimal pl-4">{props.children}</ol>
  }

  const taskItem: NodeHandler = (props) => {
    const isChecked = props?.node?.attrs?.checked

    return (
      <div className="ml-2 flex items-center gap-2 py-2">
        <label className="md:mr-2">
          <input
            type="checkbox"
            checked={isChecked}
            readOnly
            className="checkbox-style relative grid h-5 w-5 cursor-not-allowed place-content-center border-2 border-black active:bg-gray-200"
          />
        </label>

        <span
          className={cn(
            isChecked ? "text-gray-400 line-through dark:text-gray-300" : "",
            "transition duration-500 ease-in-out",
          )}
        >
          {props.children}
        </span>
      </div>
    )
  }

  const taskList: NodeHandler = (props) => {
    return <div>{props.children}</div>
  }

  const blockQuote: NodeHandler = (props) => {
    return (
      <blockquote className="ml-4 border-l-4 border-gray-200 pl-4">
        {props.children}
      </blockquote>
    )
  }

  const codeBlock: NodeHandler = (props) => {
    const language = props?.node?.attrs?.language

    if (
      Array.isArray(props.node.content) &&
      props.node.content[0].type === "text"
    ) {
      const code = props.node.content[0].text

      const style = theme === "dark" ? oneDark : oneLight

      return (
        <SyntaxHighlighter
          style={style}
          language={language}
          PreTag="div"
          {...props}
        >
          {code}
        </SyntaxHighlighter>
      )
    } else {
      return <span {...props}> </span>
    }
  }
  const handlers: NodeHandlers = {
    doc,
    text,
    paragraph,
    heading,
    listItem,
    bulletList,
    orderedList,
    taskItem,
    taskList,
    blockQuote,
    codeBlock,
  }

  return <TipTapRender node={data} handlers={handlers} />
}
