import createLike from "../../utils/createLike";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { FaHeart } from "react-icons/fa"
import { FaRegHeart } from "react-icons/fa"

function LikeButton(props) {

    const navigate = useNavigate()

    async function likeManagement() {

        try {
            let res = await createLike(props.publicationId)
            if (res == 401) {
                navigate('/login');
            }
            else if (res == "") {  //si el like fue eliminado
                props.sockets[props.publicationId].send(JSON.stringify({ type: 'like', operation:'delete' }))
                props.setPublications(prev =>
                    prev.map(publication =>
                        publication.id === props.publicationId
                            ? { ...publication, user_liked: false }
                            : publication
                    )
                )
            }
            else { // si no fue eliminado, se inserto un like
                props.sockets[props.publicationId].send(JSON.stringify({ type: 'like', operation:'add' }))
                props.setPublications(prev =>
                    prev.map(publication =>
                        publication.id === props.publicationId
                            ? { ...publication, user_liked: true }
                            : publication
                    )
                )
            }

        }
        catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                confirmButtonColor: '#F27474'
            });

        }


    }

    return (

        <button
            type="button"
            className={props.userLiked ? 'btn-success btn  btn-sm' : 'btn btn-default btn-sm'}
            onClick={() => likeManagement()}>
            {props.userLiked ? <FaHeart /> : <FaRegHeart />} Me gusta
        </button>

    )
}
export default LikeButton