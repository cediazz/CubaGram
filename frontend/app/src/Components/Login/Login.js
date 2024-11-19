
function Login() {

    return (
        <div class=" login-page">
            <div class="login-box">
                <div class="login-logo">
                    <img src="{% static 'ETECSA_circularCOLOR.png' %}" width="102" height="102" />
                </div>

                <div class="card">
                    <div class="card-body login-card-body">
                        <p class="login-box-msg">Autenticación</p>
                        <form method="post">

                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="nombre de usuario" />
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
            </div>
        </div>
    )
}
export default Login