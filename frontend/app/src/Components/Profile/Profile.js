import InformationProfile from "./InformationProfile"
import AboutMe from "./AboutMeProfile"
import CardProfile from "./CardProfile"
import { useState } from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState()
    const [userData, setUserData] = useState({})

    useEffect(() => {
        if (!localStorage.getItem('username'))
            navigate("/login")
        else{
           
        }

    }, [])


    return (
        <div class="row">
            <div class="col-md-3">
                <InformationProfile />
                <AboutMe />
            </div>
            <div class="col-md-9">
                <CardProfile />
            </div>
        </div>

    )
}
export default Profile
