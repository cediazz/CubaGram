import createLike from "../../utils/createLike";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function LikeButton(props) {
    
    const navigate = useNavigate()

    async function likeManagement() {
        props.setLoading(true)
        try{
            let res = await createLike(props.publicationId)
            console.log(res)
            if (res == 401){
                props.setLoading(false)
                navigate('/login');
              }
              else if (res == 204){
                // quitarle el color al boton del dedito con un estado
                props.setLoading(false)
              }
              props.setLoading(false)
            }
            catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                    confirmButtonColor: '#F27474'
                });
                props.setLoading(false)
            }
        

    }

    return (

        <button
            type="button"
            class="btn btn-default btn-sm"
            onClick={() => likeManagement()}>
            <i class="far fa-thumbs-up"></i> Like
        </button>

    )
}
export default LikeButton