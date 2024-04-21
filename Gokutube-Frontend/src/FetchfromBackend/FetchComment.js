import axios from "../api/axios.js"

const FetchComment = async ({videoId,limit=10}) => {
    try {
        const response = await axios.get(`/api/v1/comment/get-video-comments/${videoId}?limit=${limit}`)
        return response.data.data
    } catch (error) {
        console.error(error)
    }
}

export {
    FetchComment,

}