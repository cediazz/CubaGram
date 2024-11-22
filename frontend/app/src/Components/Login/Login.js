import { Link } from "react-router-dom"
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
//import Loading from '../Loading/Loading';
import Swal from 'sweetalert2'
import icons8 from '../../icons/icons8-wechat-color/icons8-wechat-480.png'
import ErrorList from "../ErrorList/ErrorList";

function Login() {

    const [loading, setLoading] = useState()

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('se requiere nombre de usuario'),
        password: Yup.string().required('se requiere password'),
        
    })

    const handleSubmit = async (values) => {
        setLoading(true)
        const json = JSON.stringify(values);
        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            }).then((res) => res.json())
            console.log(res)
            if (res.success) {
                setLoading(false)
                Swal.fire({
                    title: "Good job!",
                    text: res.message,
                    icon: "success",
                    color: '#16A085',
                    iconColor: '#16A085',
                    confirmButtonColor: '#16A085'
                });

            }
            else {
                setLoading(false)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: res.message,
                    confirmButtonColor: '#F27474'
                });
            }
        }
        catch (error) {
            setLoading(false)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!. Check your connection",
                confirmButtonColor: '#F27474'
            });

        }
    }

    return (
        <div class=" login-page">
            <div class="login-box">
                <div class="login-logo">
                    <img src={icons8} width="202" height="202" alt="" />
                </div>
                <div class="card">
                    <div class="card-body login-card-body">
                        <p class="login-box-msg">Autenticación</p>
                        <Formik
                            initialValues={{ userName: '', password:''}}
                            validationSchema={validationSchema}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                        <Form>
                            <div class="input-group mb-3">
                                <Field type="text" name='userName' class="form-control" placeholder="nombre de usuario" />
                                
                            </div>
                            <div class="input-group mb-3">
                                <Field type="password" class="form-control" name='password' placeholder="Password" />
                            </div>
                            <div class="row">
                                <button type="submit" class="btn btn-primary btn-block">Aceptar</button>
                            </div>
                            <div class="row">
                        <ErrorList error_list={['userName','password']} />
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