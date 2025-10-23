import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import AlertServer from "../AlertServer/AlertServer";
import postComment from '../../utils/postComment';


function PostComment(props) {

    const [loading, setLoading] = useState()
    const [errorsServer, seterrorsServer] = useState()
    const navigate = useNavigate();
    const userImage = localStorage.getItem('image')

    props.sockets[props.publicationId].onmessage = (event) => {
        const data = JSON.parse(event.data)
        
        if (data.type === "comment_message") { //si es un mensaje entrante
            if (data.post in props.comments)
                //si existen comentarios para la publicacion se agrega los comentarios existentes junto al comentario nuevo
                props.setComments(prev => ({ ...prev, [data.post]: [...prev[data.post], data] }))
            else
                // si no hay comentarios se crea el comentario para cada publicacion y se mantienen los comentarios de otras publicaciones
                props.setComments(prev => ({ ...prev, [data.post]: [data] }))

            props.setPublications(prev =>
                prev.map(publication =>
                    publication.id === props.publicationId
                        ? { ...publication, numb_comm: publication.numb_comm + 1, }
                        : publication
                )
            )
        }
        if (data.type === "like_message") { // si es un like entrante
            if (data.like_operation === "delete")
                //eliminar like de la publicacion
                props.setPublications(prev =>
                    prev.map(publication =>
                        publication.id === props.publicationId
                            ? { ...publication, numb_likes: publication.numb_likes - 1}
                            : publication
                    )
                )
            else // si no fue eliminado, se inserto un like
            props.setPublications(prev =>
                    prev.map(publication =>
                        publication.id === props.publicationId
                            ? { ...publication, numb_likes: publication.numb_likes + 1}
                            : publication
                    )
                )
        }
    }

    const validationSchema = Yup.object().shape({
        content: Yup.string().required('se requiere contenido'),
    })

    const handleSubmit = async (values) => {
        setLoading(true)
        seterrorsServer()
        try {
            let res = await postComment(props.publicationId, values)
            if (res == 401) {
                setLoading(false)
                navigate('/login');
            }
            else { //se inserto un comentario
                props.sockets[props.publicationId].send(JSON.stringify({ type: 'comment_message', ...res }))
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