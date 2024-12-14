import createLike from "../../utils/createLike";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function LikeButton(props) {

    const navigate = useNavigate()

    async function likeManagement() {

        try {
            let res = await createLike(props.publicationId)
            if (res == 401) {
                navigate('/login');
            }
            else if (res == "") {  //si el like fue eliminado
                props.setPublications(prev =>
                    prev.map(publication =>
                        publication.id === props.publicationId
                            ? { ...publication, numb_likes: publication.numb_likes - 1, user_liked: false }
                            : publication
                    )
                )
            }
            else { // si no fue eliminado, se inserto un like
                props.setPublications(prev =>
                    prev.map(publication =>
                        publication.id === props.publicationId
                            ? { ...publication, numb_likes: publication.numb_likes + 1, user_liked: true }
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
            <i className={props.userLiked ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'}></i> Me gusta
        </button>

    )
}
export default LikeButton