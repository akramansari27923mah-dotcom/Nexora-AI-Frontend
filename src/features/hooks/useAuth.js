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
            if (err?.response && err?.response?.status === 400) {
                showError("User already exists")
            }
            else {
                showError("Something went wrong")
            }
        }


    }
    const login = async ({ email, password }, setLoader) => {
        if (!email || !password) {
            return showError('All fields are required')
        }

        try {
            const res = await loginInUser({ email, password }, setLoader)

            if (res?.data?.user) {
                showSuccess('User login successfully')

                localStorage.setItem('user', JSON.stringify(res?.data?.user))

                setUser(res?.data?.user)

                navigate('/')
            }
        }
        catch (err) {
            console.log('error');
            
            showError("Invalid credentials")
        }
    }

    const logout = async () => {
        await api.get('/auth/logout')
        localStorage.removeItem('user')
        setUser(null)
    }

    return {
        sign,
        login,
        logout,
    }
}

export default useAuth