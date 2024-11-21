import InformationProfile from "./InformationProfile"
import AboutMe from "./AboutMeProfile"

function Profile(){

    return(
       <div class="row">
          <div class="col-md-3">
           <InformationProfile />
           <AboutMe />
        </div>
    </div>

    )
}
export default Profile
