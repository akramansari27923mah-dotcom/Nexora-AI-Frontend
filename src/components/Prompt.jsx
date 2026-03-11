/* eslint-disable react-hooks/exhaustive-deps */
import { Loader, MenuIcon, Send, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import convercationWithAi from "../features/api/aiApi";
import { AuthCon } from "../features/AuthContext";
import ChatMarkdown from "./Markdown";
import { showError } from "../features/lib/utils";

const Prompt = ({ setMenuClose, setLargeMenu, largeMenu, message, setMessage }) => {

  const { user } = AuthCon()
  const [inputValue, setInputValue] = useState('')
  const [loader, setLoader] = useState(false)
  const messageEndRef = useRef(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      const msg = localStorage.getItem(`message_${user.id}`)
      if (msg) {
        setMessage(JSON.parse(msg))
      }
    }
  }, [])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      localStorage.setItem(`message_${user.id}`, JSON.stringify(message))
    }
  }, [message])

  const sendMessage = async () => {
    const userMessage = inputValue.trim()
    if (!userMessage) return

    setMessage((prev) => [
      ...prev,
      { role: 'user', content: userMessage },
    ])

    setInputValue('')
    setLoader(true)

    try {
      const user = JSON.parse(localStorage.getItem('user'))
      const history = JSON.parse(localStorage.getItem(`message_${user?.id}`))

      const data = await convercationWithAi(userMessage, history)

      setMessage((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply.content }
      ])
    }
    catch (err) {
      console.log(err)

      setMessage((prev) => [
        ...prev,
        { role: 'assistant', content: 'AI service failed' }
      ])
    }
    finally {
      setLoader(false)
    }
  }

  const handelEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }, [message])

  const deleteChat = () => {
    if (message?.length !== 0) {
      setMessage([])
      return
    }
    else {
      showError('No chats yet')
    }
  }

  return (
    <div className={`${largeMenu ? "md:min-w-[1136px]" : "md:min-w-[1366px]"} w-[390px] flex-1 min-h-screen bg-gray-900 flex flex-col`}>

      {/* Top bar mobile */}
      <div className="md:hidden p-4 flex bg-transparent w-full  static  right-0 top-0 justify-between items-center border-b border-gray-700">
        <MenuIcon className="cursor-pointer" onClick={() => setMenuClose(true)} />
        <h1 className="text-lg font-semibold text-white">Nexora AI</h1>
      </div>

      {/* Desktop menu button */}
      <div className="hidden md:block p-4 absolute top-0 left-0">
        <MenuIcon
          className="cursor-pointer text-white"
          onClick={() => setLargeMenu(!largeMenu)}
        />
      </div>

      {/* Delete Chat */}
      <button
        onClick={deleteChat}
        className="fixed top-2 right-[150px] md:right-10 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition flex items-center gap-2 shadow-md"
      >
        <Trash size={18} />
        Clear Chat
      </button>

      {/* Chat area */}
      <div className="flex-1 w-full max-w-4xl mx-auto hide-scroll mb-12 md:mb-20  overflow-y-scroll overflow-x-hidden px-4 py-4">

        {message?.length === 0 && (
          <div className="flex flex-col justify-center items-center h-[70vh] text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">
              Hey, {user.username} 👋
            </h1>
            <p className="text-gray-400 text-lg">
              How can I assist you today?
            </p>
          </div>
        )}

        {message?.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 my-4 ${msg.role === "user" ? "justify-end" : "justify-start"
              }`}
          >

            {msg?.role !== "user" && (
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-sm font-bold">
                AI
              </div>
            )}

            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${msg?.role === "user"
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-gray-800 text-gray-100 rounded-bl-none"
                }`}
            >
              <ChatMarkdown content={msg?.content} />
            </div>

            {msg?.role === "user" && (
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-sm font-bold">
                U
              </div>
            )}

          </div>
        ))}

        {loader && (
          <div className="flex items-center gap-2 text-gray-300 animate-pulse">
            <Loader size={18} className="animate-spin" />
            AI is thinking...
          </div>
        )}

        <div ref={messageEndRef}></div>

      </div>

      {/* Input */}
      <div className="w-full fixed bottom-0 left-0  md:left-[230px] max-w-4xl mx-auto p-2 md:p-4">

        <div className="flex items-center  backdrop-blur-md bg-white/5 rounded-2xl px-4 py-3 border border-gray-700 shadow-lg">

          <input
            type="text"
            value={inputValue}
            disabled={loader}
            autoFocus
            onKeyDown={handelEnter}
            onChange={(e) => setInputValue(e?.target?.value)}
            placeholder="Message DeepSeek..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-2"
          />

          <button
            disabled={!inputValue.trim() || loader}
            className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={sendMessage}
          >
            <Send size={18} />
          </button>

        </div>

      </div>

    </div>
  )
}

export default Prompt