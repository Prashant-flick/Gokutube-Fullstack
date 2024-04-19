import axios from "axios"

const FetchComment = async ({videoId,limit=10}) => {
    try {
        const response = await axios.get(`https://gokutube-fullstack-backend-ezkg1tvwy.vercel.app/api/v1/comment/get-video-comments/${videoId}?limit=${limit}`)
        return response.data.data
    } catch (error) {
        console.error(error)
    }
}

export {
    FetchComment,

}