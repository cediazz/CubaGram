import UsersCard from "./UsersCard"
import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import getUsers from "../../utils/getUsers";
import Swal from 'sweetalert2'

function Users() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState()
  const [users, setUsers] = useState([])

  async function getusers(){
 
    try{
    let res = await getUsers()
    console.log(res)
    if (res == 401){
        setLoading(false)
        navigate('/login');
      }
      else{
        setUsers(res)
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
    else {
      getusers()

    }

  }, [])


  return (
    loading == true ? <Loading /> :
      <div class="card card-solid">
        <div class="card-body pb-0">
          <div class="row">
            {users && users.map( user => <UsersCard user={user} /> )}
          </div>

          <div class="card-footer">
            <nav aria-label="Contacts Page Navigation">
              <ul class="pagination justify-content-center m-0">
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">4</a></li>
                <li class="page-item"><a class="page-link" href="#">5</a></li>
                <li class="page-item"><a class="page-link" href="#">6</a></li>
                <li class="page-item"><a class="page-link" href="#">7</a></li>
                <li class="page-item"><a class="page-link" href="#">8</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
  )
}
export default Users