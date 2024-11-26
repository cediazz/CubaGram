

function InformationProfile(props){

  

    return(
        <div class="card card-primary card-outline">
              <div class="card-body box-profile">
                <div class="text-center">
                  <img class="profile-user-img img-fluid img-circle"
                       src={props.userData.image}
                       alt="" />
                </div>

                <h3 class="profile-username text-center">{props.userData.first_name + props.userData.last_name}</h3>

                <ul class="list-group list-group-unbordered mb-3">
                  <li class="list-group-item">
                    <b>Seguidores</b> <a className="float-right">1,322</a>
                  </li>
                  <li class="list-group-item">
                    <b>Siguiendo</b> <a className="float-right">543</a>
                  </li>
                  <li class="list-group-item">
                    <b>Amigos</b> <a className="float-right">13,287</a>
                  </li>
                </ul>

                <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a>
              </div>
             
            </div>
    )
}
export default InformationProfile