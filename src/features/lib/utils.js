import { toast } from 'react-hot-toast'

export const showError = (msg) => {
    toast.error(msg)
}

export const showSuccess = (msg) => {
    toast.success(msg)
}