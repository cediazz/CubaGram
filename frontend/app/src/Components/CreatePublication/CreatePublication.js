import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import createPublication from '../../utils/createPublication';
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import AlertServer from "../AlertServer/AlertServer";
import Swal from 'sweetalert2'

function CreatePublication() {

    const [loading, setLoading] = useState()
    const [errorsServer, seterrorsServer] = useState()
    const navigate = useNavigate();


    const validationSchema = Yup.object().shape({
        content: Yup.string().required('se requiere contenido'),
        image: Yup.mixed()
            .test('fileType', 'Solo se permiten imágenes', (value) => {
                if (value === undefined) return true
                const fileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
                return fileTypes.includes(value.type)
            }),
    })

    const handleSubmit = async (values) => {
        setLoading(true)
        seterrorsServer()
        try {
            let res = await createPublication(values)
            if (res == 401) {
                setLoading(false)
                navigate('/login');
            }
            else {
                Swal.fire({
                    title: "Buen trabajo!",
                    text: 'Publicación creada',
                    icon: "success",
                })
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
            seterrorsServer(serverErrors)
            setLoading(false)
        }
    }



    return (
        loading == true ? <Loading /> :
            <div class="card card-default">
                <div class="card-header">
                    <h3 class="card-title"><i class="nav-icon fas fa-plus-square"></i> Crear publicación</h3>
                </div>
                <div class="card-body">
                    <Formik
                        initialValues={
                            {
                                content: "",

                            }
                        }
                        validationSchema={validationSchema}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ setFieldValue, errors }) => (
                            <Form>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="content">Contenido</label>
                                        <Field class="form-control select2" as="textarea" name="content" id="content" placeholder="Contenido" style={{ width: '100%' }} />
                                        <ErrorMessage name="content">{(msg) => <div className='error-message'>{msg}<i class="fas fa-exclamation-circle px-1"></i></div>}</ErrorMessage>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="image">Imagen(Opcional)</label>
                                        <input type="file" class="form-control select2" name="image" id="image" style={{ width: '100%' }} onChange={(event) => {
                                            setFieldValue("image", event.currentTarget.files[0])
                                        }} />
                                        {errors.image && <div className='error-message'>{errors.image}<i class="fas fa-exclamation-circle px-1"></i></div>}
                                    </div>
                                    <div class="col-md-6 mt-3">
                                        <button type="submit" class="btn btn-primary"><i class="nav-icon fas fa-plus-square"></i> Publicar</button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    {errorsServer && <AlertServer errors={errorsServer} />}
                </div>
            </div>



    )
}
export default CreatePublication