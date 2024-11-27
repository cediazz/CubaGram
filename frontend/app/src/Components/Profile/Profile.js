import InformationProfile from "./InformationProfile"
import AboutMe from "./AboutMeProfile"
import CardProfile from "./CardProfile"
import { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import {useParams } from 'react-router-dom';
import getUser from "../../utils/getUser";
import Swal from 'sweetalert2'

function Profile() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState()
    const [userData, setUserData] = useState({})
    const { id } = useParams();
    
    
    async function getuser(id){
 
        try{
        let res = await getUser(id)
        console.log(res)
        if (res == 401){
            setLoading(false)
            navigate('/login');
          }
          else{
            setUserData(res)
            setLoading(false)
          }
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                confirmButtonColor: '#F27474'
            });
            setLoading(false)
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
                {userData && <InformationProfile userData={userData} />}
                {userData && <AboutMe userData={userData} />}
            </div>
            <div class="col-md-9">
                <CardProfile />
            </div>
        </div>

    )
}
export default Profile
