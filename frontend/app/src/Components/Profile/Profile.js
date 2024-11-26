import InformationProfile from "./InformationProfile"
import AboutMe from "./AboutMeProfile"
import CardProfile from "./CardProfile"
import { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import axios from 'axios'
import {useParams } from 'react-router-dom';

function Profile() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState()
    const [userData, setUserData] = useState({})
    const { id } = useParams();
    
    async function getuser(id){
 
        try{
        let res = await axios.get(`http://127.0.0.1:8000/users/${id}/`)
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
           getuser(id)
           
        }

    }, [])


    return (
        loading == true ? <Loading /> :
        <div class="row">
            <div class="col-md-3">
                <InformationProfile userData={userData} />
                <AboutMe userData={userData} />
            </div>
            <div class="col-md-9">
                <CardProfile />
            </div>
        </div>

    )
}
export default Profile
