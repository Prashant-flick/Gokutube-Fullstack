import axios from "axios";

const FetchUserPlaylist = async(id) => {
    try {
        const playlist = await axios.get(`${String(import.meta.env.API_URL)}/api/v1/playlist/get-user-playlists/${id}`)
    
        return playlist.data.data
    } catch (error){
        console.log(error);
    }
}

export {
    FetchUserPlaylist,

}