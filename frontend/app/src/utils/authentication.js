import axios from 'axios'

async function authenticate(credentials){
    try{
        
        let response = await axios.post('http://127.0.0.1:8000/login/',credentials)
        return response
    }
    catch(error){
        return error
    }

}
export default authenticate