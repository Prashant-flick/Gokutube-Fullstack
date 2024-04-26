import axios from "../api/axios.js"

const FetchUserPlaylist = async(id) => {
    try {
        const playlist = await axios.get(`/api/v1/playlist/get-user-playlists/${id}`)
    
        return playlist.data.data
    } catch (error){
        return error
    }
}

export {
    FetchUserPlaylist,

}