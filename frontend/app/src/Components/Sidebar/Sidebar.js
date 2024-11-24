import { Link } from "react-router-dom"
import icons8 from '../../icons/icons8-wechat-color/icons8-wechat-480.png'

function Sidebar() {

  return (
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <a href="../../index3.html" class="brand-link">
        <img src={icons8} alt="" class="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
        <span class="brand-text font-weight-light">CubaGram</span>
      </a>
      <div class="sidebar">

        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img src={localStorage.getItem('image')} class="img-circle elevation-2" alt="" />
          </div>
          <div class="info">
            <a href="#" class="d-block">{localStorage.getItem('username')}</a>
          </div>
        </div>
        <div class="form-inline">
          <div class="input-group" data-widget="sidebar-search">
            <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
            <div class="input-group-append">
              <button class="btn btn-sidebar">
                <i class="fas fa-search fa-fw"></i>
              </button>
            </div>
          </div>
        </div>
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
              <Link class="nav-link" to='users-publications'>
                <i class="nav-icon fas fa-home"></i>
                <p>
                  Principal
                </p>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to='users'>
                <i class="nav-icon fas fa-user"></i>
                <p>
                  Usuarios
                </p>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to='profile'>
                <img src="" alt="" class="img-circle nav-icon" />
                <p>Perfil</p>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to='login'>
                <i class="fas fa-sign-out-alt fa-3x nav-icon"></i>
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