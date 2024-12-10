import { Link } from "react-router-dom"

function InformationProfile(props) {

  const user_id = localStorage.getItem('user_id')

  return (
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
            <b>Seguidores</b> <a className="float-right">{props.userData.numb_followed}</a>
          </li>
          <li class="list-group-item">
            <b>Siguiendo</b> <a className="float-right">{props.userData.numb_followers}</a>
          </li>
        </ul>

        {props.userData.id != user_id &&
          <button className="btn btn-primary btn-block">
            {props.userData.followed_user ? (
              <>
                <i className="fas fa-user-minus"></i> Dejar de seguir
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i> Seguir
              </>
            )
            }</button>
        }
      </div>

    </div>
  )
}
export default InformationProfile