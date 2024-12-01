import { Link } from "react-router-dom"
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
//import Loading from '../Loading/Loading';
import Swal from 'sweetalert2'
import icons8 from '../../icons/icons8-wechat-color/icons8-wechat-480.png'
import ErrorList from "../ErrorList/ErrorList";
import authenticate from "../../utils/authentication";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../../utils/userContext';

function Login() {

    const [loading, setLoading] = useState()
    const { setUser } = useContext(UserContext)  //authenticated user
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('se requiere nombre de usuario'),
        password: Yup.string().required('se requiere password'),

    })

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            let res = await authenticate(values)
            console.log(res)
            if (res.status == 200) {
                localStorage.setItem('refresh', res.data.refresh)
                localStorage.setItem('access', res.data.access)
                localStorage.setItem('username', res.data.username)
                localStorage.setItem('image', res.data.image)
                localStorage.setItem('user_id', res.data.id)
                setUser({'username':res.data.username,'image':res.data.image}) //update authenticated user
                setLoading(false)
                navigate("/");
            } else if (res.status == 401) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: res.response.data.detail,
                    confirmButtonColor: '#F27474'
                });
                setLoading(false)
            }
        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error,
                confirmButtonColor: '#F27474'
            });
            setLoading(false)

        }
    }

    return (

        loading == true ? <Loading /> :
            <div class=" login-page">
                <div class="login-box">
                    <div class="login-logo">
                        <img src={icons8} width="202" height="202" alt="" />
                    </div>
                    <div class="card">
                        <div class="card-body login-card-body">
                            <p class="login-box-msg">Autenticación</p>
                            <Formik
                                initialValues={{ username: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => handleSubmit(values)}
                            >
                                <Form>
                                    <div class="input-group mb-3">
                                        <Field type="text" name='username' class="form-control" placeholder="nombre de usuario" />

                                    </div>
                                    <div class="input-group mb-3">
                                        <Field type="password" class="form-control" name='password' placeholder="Password" />
                                    </div>
                                    <div class="row">
                                        <button type="submit" class="btn btn-primary btn-block">Aceptar</button>
                                    </div>
                                    <div class="row">
                                        <ErrorList error_list={['username', 'password']} />
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    <div class="card mt-3">
                        <div class="card-body login-card-body">
                            <Link class="login-box-msg" to='/Register'>
                                No tiene una cuenta?. Registrese aqui
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

    )
}
export default Login