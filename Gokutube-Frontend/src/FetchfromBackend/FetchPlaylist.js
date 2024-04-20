import axios from "axios";

const FetchUserPlaylist = async(id) => {
    try {
        const playlist = await axios.get(`/api/v1/playlist/get-user-playlists/${id}`)
    
        return playlist.data.data
    } catch (error){
        console.log(error);
    }
}

export {
    FetchUserPlaylist,

}