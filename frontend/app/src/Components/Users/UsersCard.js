import { Link } from "react-router-dom"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import createFollow from "../../utils/createFollow";

function UsersCard(props){

    const userProfile = "/profile/" + props.user.id
    const navigate = useNavigate();

    async function followManagement() {
        
      try{
          let res = await createFollow(props.user.id)
          console.log(res)
          if (res == 401){
              navigate('/login');
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
    
    return(
        <div class="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column mt-3">
              <div class="card bg-light d-flex flex-fill">
                <div class="card-body pt-0">
                  <div class="row">
                    <div class="col-7">
                      <h2 class="lead"><b>{props.user.first_name + props.user.last_name}</b></h2>
                      </div>
                    <div class="col-5 text-center">
                      <img src={props.user.image} alt="user-avatar" class="img-circle img-fluid" />
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <div class="text-right">
                    <button  class="btn btn-sm bg-teal mr-1" onClick={() => followManagement()}>
                      <i class="fas fa-user-plus"></i>
                      Seguir
                    </button>
                    <Link to={userProfile} class="btn btn-sm btn-primary">
                      <i class="fas fa-user"></i> Ver perfil
                    </Link>
                  </div>
                </div>
              </div>
            </div>
    )
}
export default UsersCard