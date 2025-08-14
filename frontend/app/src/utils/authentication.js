import axios from 'axios'

async function authenticate(credentials){
    try{
        let response = await axios.post(`${process.env.REACT_APP_BACKEND_HOST}/login/`,credentials)
        return response
    }
    catch(error){
        return error
    }

}
export default authenticate