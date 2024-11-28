import { Formik, Form, Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Loading from "../Loading/Loading"
import { useState } from 'react';
import axios from 'axios'
import getExtension from '../../utils/getExtensionFile';

function ConfigurationProfile(props) {

  const [errors, setErrors] = useState([])
  

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('se requiere nombre de usuario'),
    first_name: Yup.string().required('se requiere el nombre'),
    last_name: Yup.string().required('se requiere los apellidos'),
    image: Yup.mixed()
    .test('fileType', 'Solo se permiten imágenes', (value) => {
      if (value === undefined) return true
      let extensionValue = getExtension(value)
      if (extensionValue === false) return false
      const fileTypes = ['jpeg', 'png', 'gif','jpg']
      return fileTypes.includes(extensionValue)
      
    }),
    })

  const handleSubmit = async (values) => {
    props.setLoading(true)
    try {
        let res = await axios.post('http://127.0.0.1:8000/users/',values)
        if (res.status == 201){
            
            props.setLoading(false)
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
        props.setLoading(false)
}
}



  return (
    
      <Formik
            initialValues={
              { username: props.userData.username, 
                first_name: props.userData.first_name, 
                last_name: props.userData.last_name,
                biography: props.userData.biography,
                location: props.userData.location,
                education: props.userData.education,
                //image: null
               }
              }
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
        >
         
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
                          <Field type="file"   class="form-control" name="image" id="image"  />
                          <ErrorMessage name="image">{(msg) => <div className='error-message'>{msg}<i class="fas fa-exclamation-circle px-1"></i></div>}</ErrorMessage>
                        </div>
                      </div>
                      <div class="form-group row">
                        <div class="offset-sm-3 col-sm-9">
                          <button type="submit" class="btn btn-primary">Guardar</button>
                        </div>
                      </div>
                    </Form>
                 
                    </Formik>
  )
}
export default ConfigurationProfile