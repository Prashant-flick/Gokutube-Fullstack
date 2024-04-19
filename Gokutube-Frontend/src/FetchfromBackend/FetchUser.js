import axios from "axios";

const FetchCurrentUser = async() => {
    try {
        const user = await axios.get('/api/v1/users/get-current-user')
    
        return user.data.data
    } catch (error){
        console.log(error);
    }
}

const fetchUserById = async(id) => {
    try {
        const user = await axios.get(`/api/v1/users/get-user-by-id/${id}`)
    
        return user.data.data
    } catch (error) {
        console.log(error);
    }
}

const getUserChannelProfile = async({username,id}) => {
    try {
        const user = await axios.get(`/api/v1/users/c/${username}?id=${id}`)
        return user.data.data
    } catch (error) {
        console.error(error);
    }
}

export {
    FetchCurrentUser,
    fetchUserById,
    getUserChannelProfile,
}