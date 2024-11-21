import InformationProfile from "./InformationProfile"
import AboutMe from "./AboutMeProfile"
import CardProfile from "./CardProfile"

function Profile(){

    return(
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
