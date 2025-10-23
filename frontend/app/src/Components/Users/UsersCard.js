import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import createFollow from "../../utils/createFollow";
import { FaUserMinus } from "react-icons/fa"
import { FaUserPlus } from "react-icons/fa"
import { FaUser } from "react-icons/fa6"

function UsersCard(props) {

  const userProfile = "/profile/" + props.user.id
  const navigate = useNavigate();

  async function followManagement() {

    try {
      let res = await createFollow(props.user.id)
      if (res == 401) {
        navigate('/login');
      }
      else if (res == "") {  //si el seguimiento fue eliminado
        props.setUsers(prev =>
          prev.map(user =>
            user.id === props.user.id
              ? { ...user, followed_user: false }
              : user
          )
        )
      }
      else { // si no fue eliminado, se inserto un seguimiento
        props.setUsers(prev =>
          prev.map(user =>
            user.id === props.user.id
              ? { ...user, followed_user: true }
              : user
          )
        )
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
    <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column mt-3">
      <div class="card bg-light d-flex flex-fill">
        <div class="card-body pt-0">
          <div class="row mt-3">
            <div class="col-7">
              <h2 class="lead"><b>{props.user.first_name + " " + props.user.last_name}</b></h2>
            </div>
            <div class="col-5 text-center">
              <img src={props.user.image} alt="user-avatar" class="img-circle img-fluid" />
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="text-right">
            <button class="btn btn-sm bg-teal mr-1" onClick={() => followManagement()}>
              {props.user.followed_user ? (
                <>
                  <FaUserMinus /> Dejar de seguir
                </>
              ) : (
                <>
                  <FaUserPlus /> Seguir
                </>
              )}
            </button>
            <Link to={userProfile} class="btn btn-sm btn-primary">
              <FaUser /> Ver perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UsersCard