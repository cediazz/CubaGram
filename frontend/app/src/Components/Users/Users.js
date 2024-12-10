import UsersCard from "./UsersCard"
import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import getUsers from "../../utils/getUsers";
import Swal from 'sweetalert2'
import MyPagination from "../Pagination/Pagination";

function Users() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState()
  const [users, setUsers] = useState([])
  const [cantUsers, setCantUsers] = useState()
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 2;
  
  async function getusers(){
 
    try{
    let res = await getUsers()
    console.log(res)
    if (res == 401){
        setLoading(false)
        navigate('/login');
      }
      else{
        setCantUsers(res.count)
        setPageCount(Math.ceil(res.count / itemsPerPage))
        setUsers(res.results)
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
    <>
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Usuarios</h1>
          </div>
        </div>
      </div>
    <div class="card card-solid">
        <div class="card-body pb-0">
          <div class="row">
            {users && users.map( user => <UsersCard user={user} /> )}
          </div>

          <div class="card-footer d-flex justify-content-center">
          <MyPagination
              setUsers={setUsers}
              pageCount={pageCount}
          />
          </div>
        </div>
      </div>
      </>
  )
}
export default Users