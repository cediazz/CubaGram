import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import createFollow from "../../utils/createFollow"
import { useNavigate } from "react-router-dom"

function InformationProfile(props) {

  const user_id = localStorage.getItem('user_id')
  const navigate = useNavigate();

  async function followManagement() {

    try {
      let res = await createFollow(props.userData.id)
      console.log(res)
      if (res == 401) {
        navigate('/login');
      }
      else if (res == ""){  //si el seguimiento fue eliminado
        props.setUserData(
          {...props.userData,
            followed_user: false,
            numb_followed: props.userData.numb_followed - 1
          })
    }
    else{ // si no fue eliminado, se inserto un seguimiento
      props.setUserData(
        {...props.userData,
          followed_user: true,
          numb_followed: props.userData.numb_followed + 1
        })
    }


    }
    catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        confirmButtonColor: '#F27474'
      });

    }


  }

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
          <button className="btn btn-primary btn-block" onClick={() => followManagement()}>
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