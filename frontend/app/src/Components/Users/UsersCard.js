import { Link } from "react-router-dom"

function UsersCard(props){

    const userPerfil = "/profile/" + props.user.id
    
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
                    <button  class="btn btn-sm bg-teal mr-1">
                      <i class="fas fa-user-plus"></i>
                      Seguir
                    </button>
                    <Link to={userPerfil} class="btn btn-sm btn-primary">
                      <i class="fas fa-user"></i> Ver perfil
                    </Link>
                  </div>
                </div>
              </div>
            </div>
    )
}
export default UsersCard