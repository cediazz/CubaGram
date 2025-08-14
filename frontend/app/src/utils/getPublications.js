import axios from 'axios'


async function getPublications(url){

    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');
    
    console.log(url)
    try{
        let res = await axios.get(url,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return res.data;
        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                try {
                    const refreshResponse = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/refresh-token/`, {
                        'refresh':`${refreshToken}`
                    });
                    const newAccessToken = refreshResponse.data.access;
                    const newrefreshToken = refreshResponse.data.refresh;
                    localStorage.setItem('access', newAccessToken);
                    localStorage.setItem('refresh', newrefreshToken);
    
                    const retryResponse = await axios.get(url,{
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
export default getPublications