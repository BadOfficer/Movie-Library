import { instance } from "./axios.api"

export const getUserLiked = async() => {
    try {
        const data = await instance.get('liked');
        
        return data.data;
    } catch(e) {
        console.log(e);
    }
}