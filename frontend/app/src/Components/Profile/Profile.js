import InformationProfile from "./InformationProfile"
import AboutMe from "./AboutMeProfile"
import CardProfile from "./CardProfile"
import { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import axios from 'axios'

function Profile() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState()
    const [userData, setUserData] = useState({})

    async function getuser(){
 
        try{
        let res = await axios.get(`http://127.0.0.1:8000/users/${localStorage.getItem('user_id')}/`)
        console.log(res)
        if (res.status == 200){
            setUserData(res.data)
            setLoading(false)
          }
        }
        catch(error){
            console.log(error)
        }
        
    
    }

    useEffect(() => {
        setLoading(true)
        if (!localStorage.getItem('username'))
            navigate("/login")
        else{
           getuser()
           
        }

    }, [])


    return (
        loading == true ? <Loading /> :
        <div class="row">
            <div class="col-md-3">
                <InformationProfile userData={userData} />
                <AboutMe />
            </div>
            <div class="col-md-9">
                <CardProfile />
            </div>
        </div>

    )
}
export default Profile
