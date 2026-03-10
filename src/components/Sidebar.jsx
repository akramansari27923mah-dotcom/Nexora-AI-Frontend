import { LogOut, Plus, X } from "lucide-react"
import useAuth from "../features/hooks/useAuth"
import { AuthCon } from "../features/AuthContext"
import { useEffect, useState } from "react"
import { showSuccess } from "../features/lib/utils"
import History from "./History"

const Sidebar = ({ menuClose, setMenuClose, setLargeMenu, largeMenu, message, setMessage }) => {

    const { logout } = useAuth()
    const { user } = AuthCon()
    const [show, setShow] = useState(false)



    const handelLogout = () => {
        setTimeout(() => {
            logout()
            showSuccess('User logout successfully')
        }, 1000)
    }

    return (
        <>
            <div
                className={`hidden md:flex z-10 flex-col  fixed top-0 left-0 overflow-hidden bg-gray-800 h-screen transition-all duration-300 ${largeMenu ? "w-[250px] p-3" : "w-0 p-0"
                    }`}
            >
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="font-bold text-xl">Nexora AI</h1>
                        <X className="cursor-pointer" onClick={() => setLargeMenu(false)} />
                    </div>

                    <button className="px-4 py-2 rounded-lg bg-blue-600 flex items-center gap-2 w-full my-5 justify-center">
                        <Plus />
                        New Chat
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto text-center text-gray-500 border-b mb-2 border-gray-600 hide-scroll">
                    <History message={message} setMessages={setMessage} />
                </div>

                <div className="flex flex-col items-center gap-3">

                    <div
                        onClick={() => setShow(!show)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-800/60 backdrop-blur-md border border-gray-700 hover:border-blue-500 hover:bg-gray-800 transition-all duration-300 cursor-pointer group"
                    >

                        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-600">
                            <img src="/avtar.png" alt="profile" className="w-full h-full object-cover" />
                        </div>

                        <p className="text-gray-300 group-hover:text-white font-mono text-sm font-medium">
                            {user.username}
                            <p className="text-gray-400 text-[10px]">{user.email}</p>
                        </p>

                    </div>

                    <div
                        onClick={handelLogout}
                        className="flex items-center gap-3 px-5 py-2 bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl cursor-pointer hover:border-red-500 hover:bg-gray-800 transition-all duration-300 group"
                    >
                        <LogOut size={18} className="text-gray-400 group-hover:text-red-400" />

                        <span className="text-gray-300 text-sm font-medium group-hover:text-red-400">
                            Logout
                        </span>
                    </div>
                </div>

                {
                    show && (

                        <div className="absolute bottom-[110px] left-[10px] bg-gray-800/70 backdrop-blur-md text-white px-4 py-3 border border-gray-700 rounded-xl shadow-xl flex flex-col gap-1">

                            <span className="font-semibold text-sm tracking-wide">
                                {user.username}
                            </span>

                            <span className="text-gray-400 text-xs">
                                {user.email}
                            </span>

                        </div>
                    )
                }
            </div>



            {
                menuClose && (
                    <div className="flex flex-col z-20 animate__animated animate__slideInLeft justify-center w-7/12 min-h-screen p-3 md:hidden top-0 left-0 absolute bg-gray-800 ">
                        <div className="flex justify-between items-center">
                            <h1 className="font-bold text-xl">Nexora AI</h1>
                            <X className="cursor-pointer" onClick={() => setMenuClose(false)} />
                        </div>

                        <div className=" overflow-y-auto ">
                            <button className="px-4 py-2 rounded-lg bg-blue-600 flex justify-center items-center gap-2 w-full my-5">
                                <Plus />
                                New Chat
                            </button>

                            <div className="flex-1 overflow-y-auto text-center text-gray-500 border-b mb-2 border-gray-600 hide-scroll h-[65vh]">
                                <History message={message} setMessages={setMessage} />
                            </div>
                        </div>

                        <div className=" flex gap-3 flex-col justify-center items-center ">

                            <div
                                onClick={() => setShow(!show)}
                                className="flex items-center gap-3 px-5 py-2 rounded-xl bg-gray-800/60 backdrop-blur-md border border-gray-700 hover:border-blue-500 hover:bg-gray-800 transition-all duration-300 cursor-pointer group"
                            >

                                <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-600">
                                    <img src="/avtar.png" alt="profile" className="w-full h-full object-cover" />
                                </div>

                                <p className="text-gray-300 group-hover:text-white font-mono text-sm font-medium">
                                    <h1 className="text-[10px]">
                                        {user.username}
                                    </h1>
                                    <p className="text-gray-400 text-[8px]">{user.email}</p>
                                </p>

                            </div>

                            {
                                show && (

                                    <div className="absolute bottom-[110px] left-[10px] bg-gray-800/70 backdrop-blur-md text-white px-4 py-3 border border-gray-700 rounded-xl shadow-xl flex flex-col gap-1">

                                        <span className="font-semibold text-sm tracking-wide">
                                            {user.username}
                                        </span>

                                        <span className="text-gray-400 text-xs">
                                            {user.email}
                                        </span>

                                    </div>
                                )
                            }

                            <div
                                onClick={handelLogout}
                                className="flex items-center gap-3 px-5 py-2 bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl cursor-pointer hover:border-red-500 hover:bg-gray-800 transition-all duration-300 group"
                            >
                                <LogOut size={18} className="text-gray-400 group-hover:text-red-400" />

                                <span className="text-gray-300 text-sm font-medium group-hover:text-red-400">
                                    Logout
                                </span>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Sidebar