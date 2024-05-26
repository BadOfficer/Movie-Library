import { toast } from 'react-toastify';

const useHandleResponse = () => {

    const handleResponse = (data: any, error: any, successMessage: string) => {
        if (data) {
            toast.success(successMessage);
        }
        if (error && 'data' in error) {
            const errorData = error.data as { message: string[] | string };

            if (Array.isArray(errorData.message)) {
                errorData.message.forEach(msg => toast.error(msg));
            } else {
                toast.error(errorData.message);
            }
        }
    }

    return { handleResponse };
}

export default useHandleResponse;