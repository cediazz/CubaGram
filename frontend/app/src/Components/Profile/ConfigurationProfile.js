import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import updateUser from '../../utils/updateUser';
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import AlertServer from "../AlertServer/AlertServer";


function ConfigurationProfile(props) {

  const [loading, setLoading] = useState()
  const [errorsServer, seterrorsServer] = useState()
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('se requiere nombre de usuario'),
    first_name: Yup.string().required('se requiere el nombre'),
    last_name: Yup.string().required('se requiere los apellidos'),
    image: Yup.mixed()
    .test('fileType', 'Solo se permiten imágenes', (value) => {
      if (value === undefined) return true
      const fileTypes = ['image/jpeg', 'image/png', 'image/gif','image/jpg']
      return fileTypes.includes(value.type)
     }),
    })

  const handleSubmit = async (values) => {
    setLoading(true)
    seterrorsServer()
    console.log(values)
    try {
      let res = await updateUser(props.userData.id,values)
      console.log(res)
      if (res == 401){
          setLoading(false)
          navigate('/login');
        }
        else{
          localStorage.setItem('username', res.username)
          localStorage.setItem('image', res.image)
          props.setUserData(res)
          setLoading(false)
          
        }
        
    }
    catch (error) {
      console.log(error)  
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
      <>
      <Formik
            initialValues={
              { username: props.userData.username,
                first_name: props.userData.first_name, 
                last_name: props.userData.last_name,
                biography: props.userData.biography,
                location: props.userData.location,
                education: props.userData.education,
              }
              }
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
          {({ setFieldValue,errors }) => (
        <Form className="form-horizontal">
                      <div class="form-group row">
                        <label for="username" class="col-sm-3 col-form-label">Nombre de usuario</label>
                        <div class="col-sm-9">
                          <Field type="text" class="form-control"  id="username" name="username" />
                          <ErrorMessage name="username" >{(msg) => <div className='error-message'>{msg}<i class="fas fa-exclamation-circle px-1"></i></div>}</ErrorMessage>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="firstname" class="col-sm-3 col-form-label">Nombre</label>
                        <div class="col-sm-9">
                          <Field type="text" class="form-control" id="firstname" name="first_name" placeholder="Nombre" />
                          <ErrorMessage name="first_name">{(msg) => <div className='error-message'>{msg}<i class="fas fa-exclamation-circle px-1"></i></div>}</ErrorMessage>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="lastname" class="col-sm-3 col-form-label">Apellidos</label>
                        <div class="col-sm-9">
                          <Field type="text" class="form-control" id="lastname" name="last_name" placeholder="Apellidos" />
                          <ErrorMessage name="last_name">{(msg) => <div className='error-message'>{msg}<i class="fas fa-exclamation-circle px-1"></i></div>}</ErrorMessage>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="biography" class="col-sm-3 col-form-label">Biografía</label>
                        <div class="col-sm-9">
                          <Field class="form-control" as="textarea" name="biography" id="biography" placeholder="Biografía" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="education" class="col-sm-3 col-form-label">Educación</label>
                        <div class="col-sm-9">
                          <Field type="text" class="form-control" as="textarea" name="education" id="education" placeholder="Educación" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="location" class="col-sm-3 col-form-label">Localización</label>
                        <div class="col-sm-9">
                          <Field type="text" class="form-control" as="textarea" name="location" id="location" placeholder="Localización" />
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="image" class="col-sm-3 col-form-label">Imagen de perfil</label>
                        <div class="col-sm-9">
                          <input type="file"   class="form-control" name="image" id="image" onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0])
                }} />
                          {errors.image && <div className='error-message'>{errors.image}<i class="fas fa-exclamation-circle px-1"></i></div>}
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="offset-sm-3 col-sm-9">
                          <button type="submit" class="btn btn-primary">Guardar</button>
                        </div>
                      </div>
                    </Form>
                    )}
                </Formik>
               {errorsServer && <AlertServer errors={errorsServer} />}
               </>
             
  )
}
export default ConfigurationProfile