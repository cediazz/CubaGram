import { Link } from "react-router-dom"
import icons8 from '../../icons/icons8-wechat-color/icons8-wechat-480.png'
import { useContext } from 'react';
import { UserContext } from '../../utils/userContext';
import { useEffect } from "react";
import { FaUsers } from "react-icons/fa"
import { FaSquarePlus } from "react-icons/fa6"
import { FaImages } from "react-icons/fa"
import { FaArrowRightToBracket } from "react-icons/fa6"
import { FaUser } from "react-icons/fa6"

function Sidebar() {

  const user_id = localStorage.getItem('user_id')
  const { user,setUser } = useContext(UserContext)

  useEffect(() => {
    setUser({'username':localStorage.getItem('username'),'image':localStorage.getItem('image')})

}, [])
  
  function LogOut(){
    localStorage.clear()
  }

  return (
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <div class="brand-link">
        <img src={icons8} alt="" class="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
        <span class="brand-text font-weight-light">CubaGram</span>
      </div>
      <div class="sidebar">

        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img src={user.image} class="img-circle elevation-2" alt="" />
          </div>
          <div class="info">
            <a class="d-block">{user.username}</a>
          </div>
        </div>
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
              <Link class="nav-link" to='/'>
                <FaImages class="img-circle nav-icon"/>
                <p>
                  Publicaciones
                </p>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to='users'>
                <FaUsers class="img-circle nav-icon"/>
                <p>
                  Usuarios
                </p>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to={"profile/" + user_id} >
                <FaUser class="img-circle nav-icon"/>
                <p>Perfil</p>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="create-publication" >
                <FaSquarePlus class="img-circle nav-icon"/>
                <p>Crear publicación</p>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to='login' onClick={LogOut}>
                <FaArrowRightToBracket class="img-circle nav-icon"/>
                <p>Salir</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
export default Sidebar