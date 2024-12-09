import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import AlertServer from "../AlertServer/AlertServer";
import postComment from '../../utils/postComment';
import getComments from "../../utils/getComments";

function PostComment(props) {

    const [loading, setLoading] = useState()
    const [errorsServer, seterrorsServer] = useState()
    const navigate = useNavigate();
    const userImage = localStorage.getItem('image')

    const validationSchema = Yup.object().shape({
        content: Yup.string().required('se requiere contenido'),
    })

    const handleSubmit = async (values) => {
        setLoading(true)
        seterrorsServer()
        console.log(values)
        try {
            let res = await postComment(props.publicationId, values)
            console.log(res)
            if (res == 401) {
                setLoading(false)
                navigate('/login');
            }
            else { //se inserto un comentario
                let comments = await getComments(props.publicationId)
                props.setComments({...props.comments,[props.publicationId]:comments}) //update comments
                //actualizar cantidad de comentarios a la publicacion
                props.setPublications(prev =>
                    prev.map(publication =>
                      publication.id === props.publicationId
                        ? { ...publication, numb_comm: publication.numb_comm + 1,} 
                        : publication
                    )
                  )
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
                        {
                            content: ""
                        }
                    }
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    <Form className="form-horizontal">
                        <img class="img-fluid img-circle img-sm" src={userImage} alt="" />
                        <div class="img-push">
                            <Field type="text" class="form-control form-control-sm" name="content" placeholder="Pulsa enter para insertar un comentario" />
                            <ErrorMessage name="content">{(msg) => <div className='error-message'>{msg}<i class="fas fa-exclamation-circle px-1"></i></div>}</ErrorMessage>
                        </div>
                    </Form>

                </Formik>
                {errorsServer && <AlertServer errors={errorsServer} />}
            </>

    )
}
export default PostComment