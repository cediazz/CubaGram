import axios from 'axios'

async function updateUser(id,data){

    const accessToken = localStorage.getItem('access')
    const refreshToken = localStorage.getItem('refresh')
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('biography', data.biography);
    formData.append('location', data.location);
    formData.append('education', data.education);
    if (data.image) {
      formData.append('image', data.image);
    }
 
    try{
        let res = await axios.put(`http://127.0.0.1:8000/users/${id}/`,formData,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            })
        return res.data;
        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                try {
                    const refreshResponse = await axios.post("http://127.0.0.1:8000/refresh-token/", {
                        'refresh':`${refreshToken}`
                    });
                    const newAccessToken = refreshResponse.data.access;
                    const newrefreshToken = refreshResponse.data.refresh;
                    localStorage.setItem('access', newAccessToken);
                    localStorage.setItem('refresh', newrefreshToken);
    
                    const retryResponse = await axios.put(`http://127.0.0.1:8000/users/${id}/`,formData,{
                        headers: {
                            Authorization: `Bearer ${newAccessToken}`,
                        },
                        })
                    return retryResponse.data; 
                } catch (refreshError) {
                    if (refreshError.response && refreshError.response.status === 401) {
                        return refreshError.response.status
                    } else {
                        throw refreshError; 
                    }
                }
            } else {
                throw error; 
            }
        }
    

}
export default updateUser