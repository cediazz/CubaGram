import { Link } from "react-router-dom"
import icons8 from '../../icons/icons8-wechat-color/icons8-wechat-480.png'
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import ErrorList from "../ErrorList/ErrorList";
import Loading from "../Loading/Loading";
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import AlertServer from "../AlertServer/AlertServer";

function Register() {

    const [loading, setLoading] = useState()
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('se requiere nombre de usuario'),
        password: Yup.string()
        .required('se requiere password')
        .notOneOf([/^d+$/, 'La contraseña no puede contener solo números'])
        .min(8,'La contraseña debe tener al menos 8 caracteres'),
        first_name: Yup.string().required('se requiere el nombre'),
        last_name: Yup.string().required('se requiere los apellidos'),

    })

    const handleSubmit = async (values) => {
        setLoading(true)
        try {
            let res = await axios.post('http://127.0.0.1:8000/users/',values)
            if (res.status == 201){
                Swal.fire({
                    title: "Buen trabajo!",
                    text: 'Registro exitoso, ahora puede auntenticarse',
                    icon: "success",
                    });
                navigate("/login")
                setLoading(false)
            }
            
        }
        catch (error) {
            let serverErrors = []
            for (const key in error.response.data) {
                error.response.data[key].forEach(error => {
                    serverErrors.push(error)
            })
           
            }
            setErrors(serverErrors)
            setLoading(false)
    }
}


    
return (
        loading == true ? <Loading /> :
        <div class=" login-page">
            <div class="login-box">
                <div class="login-logo">
                    <img src={icons8} width="102" height="102" alt="" />
                </div>
                {errors.length != 0 && <AlertServer errors={errors} />}
                <div class="card">
                    <div class="card-body login-card-body">
                        <p class="login-box-msg">Registro</p>
                        <Formik
                                initialValues={{ username: '', password: '', first_name:'', last_name:'' }}
                                validationSchema={validationSchema}
                                onSubmit={(values) => handleSubmit(values)}
                            >
                        <Form>
                            <div class="input-group mb-3">
                                <Field type="text" name="username" class="form-control" placeholder="Nombre de usuario" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <Field type="text" name="first_name" class="form-control" placeholder="Nombre" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <Field type="text" name="last_name" class="form-control" placeholder="Apellidos" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <Field type="password" name="password" class="form-control" placeholder="Password" />
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <button type="submit" class="btn btn-primary btn-block">Aceptar</button>
                            </div>
                            <div class="row">
                                        <ErrorList error_list={['username', 'password','first_name','last_name']} />
                            </div>
                        </Form>
                        </Formik>
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