import { loginInUser, signInUser } from "../api/authApi.js"
import { api } from "../api/axios.js"
import { AuthCon } from "../AuthContext.jsx"
import { showSuccess, showError } from "../lib/utils.js"
import { useNavigate } from "react-router-dom"
const useAuth = () => {
    const navigate = useNavigate()
    const { setUser } = AuthCon()
    const sign = async ({ username, email, password, }, setLoader) => {

        if (!username || !email || !password) {
            return showError('All feilds are required')
        }

        const paylode = {
            username,
            email,
            password
        }

        try {
            const res = await signInUser(paylode, setLoader)
            showSuccess('Registerd successfully')
            navigate('/')
            localStorage.setItem('user', JSON.stringify(res.data.user))
        }
        catch (err) {
            if (err.response && err.response.status === 400) {
                showError("User already exists")
            }
            else {
                showError("Something went wrong")
            }
        }


    }

    const login = async ({ email, password }, setLoader) => {
        if (!email || !password) {
            return showError('All feilds are required')
        }

        const payload = {
            email,
            password
        }

        try {
            const res = await loginInUser(payload, setLoader)
            if (res.data) {
                showSuccess('User login successfully')
                setTimeout(() => {
                    window.location.href = '/'
                }, 1000)
            }
            localStorage.setItem('user', JSON.stringify(res.data.user))
        }
        catch (err) {
            if (err.response && err.response.status === 401) {
                showError("Invalid credentials")
            }
            else {
                showError("Invalid credentials")
            }
        }
    }

    const logout = async () => {
        await api.get('/auth/logout')
        const user = localStorage.getItem('user')
        localStorage.removeItem('user')
        localStorage.removeItem(`message_${user.id}`)
        setUser(null)
    }

    return {
        sign,
        login,
        logout,
    }
}

export default useAuth