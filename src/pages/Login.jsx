import { useState } from "react"
import { Link } from "react-router-dom"
import useAuth from "../features/hooks/useAuth"
import { showError } from "../features/lib/utils"
import { Loader } from "lucide-react"

const Login = () => {
    const { login } = useAuth()
    const model = {
        email: '',
        password: ''
    }
    const [formData, setFormData] = useState(model)
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState('')

    const handelInput = (e) => {
        const input = e.target
        const name = input.name
        const value = input.value
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handelLogin = async (e) => {
        e.preventDefault()

        if (!formData.email?.trim() ||
            !formData.password?.trim()) {
            setError('All feilds are required')
            showError('All feilds are required')
            setTimeout(() => setError(false), 2000)
            return
        }
        const res = await login(formData, setLoader)
        
        if (!res) {
            setFormData(model)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="w-full max-w-md flex justify-center items-center  flex-col h-screen md:h-[350px] bg-gray-800 p-8 md:rounded-2xl shadow-lg">

                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    Login
                </h2>

                <form className="flex w-full flex-col gap-4 mb-3" onSubmit={handelLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handelInput}
                        value={formData.email}
                        className="px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-500"
                    />

                    <input
                        type="password"
                        value={formData.password}
                        name="password"
                        onChange={handelInput}
                        placeholder="Password"
                        className="px-4 py-3 rounded-lg bg-gray-700 text-white outline-none border border-gray-600 focus:border-blue-500"
                    />

                    <button
                        type="submit"
                        className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                        {loader ? <Loader className="animate-spin" /> : 'Login'}
                    </button>

                </form>

                {
                    error && (
                        <span className="text-red-500">{error}</span>
                    )
                }

                <p className="text-gray-400 text-center mt-4">
                    Don’t have an account?
                    <Link to={'/sign'} className="text-blue-500 cursor-pointer ml-1">
                        Sign Up
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default Login