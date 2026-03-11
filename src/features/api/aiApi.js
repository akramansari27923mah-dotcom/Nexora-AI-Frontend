import { api } from "./axios"
const convercationWithAi = async (content, history) => {
    const res = await api.post('/prompt', { content, history },)
    return res?.data
}

export default convercationWithAi