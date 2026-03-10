import { useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../features/hooks/useAuth"
import { showError } from "../features/lib/utils"
import { LoaderCircle } from "lucide-react"

const Sign = () => {

    const { sign } = useAuth()
    const model = {
        username: '',
        email: '',
        password: ''
    }
    const [error, setError] = useState(false)
    const [formData, setFormData] = useState(model)
    const [loader, setLoader] = useState(false)

    const handelChange = (e) => {
        const input = e.target
        const name = input.name
        const value = input.value

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const sendData = async (e) => {
        e.preventDefault()

        if (!formData.email.trim() ||
            !formData.username.trim() ||
            !formData.password.trim()) {
            setError(true)
            showError('All feilds are required')
            setTimeout(() => setError(false), 2000)
            return
        }

        await sign(formData, setLoader);


        if (!error) {
            setFormData(model)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="w-full max-w-md flex justify-center items-center  flex-col h-screen md:h-[400px] bg-gray-800 p-8 md:rounded-2xl shadow-lg">

                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Create Account
                </h2>

                <form className="flex w-full flex-col gap-4 mb-3" onSubmit={sendData}>

                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handelChange}
                        placeholder="Full Name"
                        className="px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-500"
                    />

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handelChange}
                        placeholder="Email"
                        className="px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handelChange}
                        placeholder="Password"
                        className="px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-500"
                    />

                    <button
                        className="bg-blue-600 hover:bg-blue-700 flex justify-center items-center text-white py-3 rounded-lg font-semibold transition"
                    >
                        {loader ? <LoaderCircle className="animate-spin" /> : 'Sign Up'}
                    </button>

                </form>

                {
                    error && (
                        <span className="text-red-500">All feilds are reqruired</span>
                    )
                }

                <p className="text-gray-400 text-center mt-4">
                    Already have an account?
                    <Link to={'/login'} className="text-blue-500 cursor-pointer ml-1">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Sign