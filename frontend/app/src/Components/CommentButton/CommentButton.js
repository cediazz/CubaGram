import getComments from "../../utils/getComments";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react"

function CommentButton(props) {

    const navigate = useNavigate()
    const [loading, setLoading] = useState()
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)

    async function commentManagement() {
        setLoading(true)
        try {
            let res = await getComments(props.publicationId, page)
            if (res == 401) {
                setLoading(false)
                navigate('/login');
            }
            else {
                setHasMore(res.next !== null)
                if (res.results != 0) {
                    if (props.publicationId in props.comments)
                        //si existen comentarios para la publicacion se agrega los comentarios existentes junto a los nuevos 
                        props.setComments(prev => ({ ...prev, [props.publicationId]: [...prev[props.publicationId], ...res.results] }))
                    else
                        // si no hay comentarios se crean los comentarios para cada publicacion y se mantienen los comentarios de otras publicaciones
                        props.setComments(prev => ({ ...prev, [props.publicationId]: res.results }))

                }
            setLoading(false)
            }
        }
        catch (error) {
            setLoading(false)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                confirmButtonColor: '#F27474'
            })

        }


    }

    useEffect(() => {

        if (!localStorage.getItem('username'))
          navigate("/login")
        else {
            commentManagement()
    
        }
    
      }, [page])

    return (

        hasMore &&
        <button
            type="button"
            class="btn btn-default btn-sm"
            onClick={() => setPage(prev => prev + 1)}
        >
            <i class="fas fa-comments"></i>
            Ver más comentarios
            {loading && <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>}

        </button>

    )
}
export default CommentButton