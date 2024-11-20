import { Link } from "react-router-dom"

function Register() {

    return (
        <div class=" login-page">
            <div class="login-box">
                <div class="login-logo">
                    <img src="{% static 'ETECSA_circularCOLOR.png' %}" width="102" height="102" />
                </div>

                <div class="card">
                    <div class="card-body login-card-body">
                        <p class="login-box-msg">Registro</p>
                        <form method="post">

                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Nombre de usuario" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Nombre" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Apellidos" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <input type="password" class="form-control" placeholder="Password" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <button type="submit" class="btn btn-primary btn-block">Aceptar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card mt-3">
                <div class="card-body login-card-body">
                <Link class="login-box-msg" to='/login'>
                     Tiene una cuenta?. Iniciar sesión aqui
                </Link>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Register