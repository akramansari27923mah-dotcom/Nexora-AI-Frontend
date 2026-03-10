import { api } from "../api/axios.js"

export const signInUser = async (data, setLoader) => {
    setLoader(true)
    try {
        return await api.post('/auth/register', data)
    }
    catch (err) {
        console.log(err);
    }
    finally {
        setLoader(false)
    }
}

export const loginInUser = async (data, setLoader) => {
    setLoader(true)
    try {
        return await api.post('/auth/login', data)
    }
    catch (err) {
        console.log('Login error', err);
    }
    finally {
        setLoader(false)
    }
}

