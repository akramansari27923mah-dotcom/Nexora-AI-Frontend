import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Copy } from "lucide-react"
import { useState } from "react"

export default function ChatMarkdown({ content }) {

  const [copied, setCopied] = useState(false)

  return (
    <div className="prose prose-invert max-w-none break-words">

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{

          p({ children }) {
            return <p className="mb-2 leading-relaxed">{children}</p>
          },

          li({ children }) {
            return <li className="ml-4 list-disc">{children}</li>
          },

          code({ inline, className, children }) {

            const match = /language-(\w+)/.exec(className || "")

            if (!inline && match) {
              const code = String(children).replace(/\n$/, "")

              return (
                <div className="relative my-3">

                  {/* header */}
                  <div className="flex justify-between items-center bg-gray-800 px-3 py-1 text-xs text-gray-300 rounded-t-md">
                    <span>{match[1]}</span>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(code)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                    >
                      {copied ? "Copied" : <Copy size={14} />}
                    </button>

                  </div>

                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                  >
                    {code}
                  </SyntaxHighlighter>

                </div>
              )
            }

            return (
              <code className="bg-gray-700 px-1 py-[2px] rounded text-sm">
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>

    </div>
  )
}