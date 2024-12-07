import createLike from "../../utils/createLike";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function LikeButton(props) {
    
    const navigate = useNavigate()

    async function likeManagement() {
        
        try{
            let res = await createLike(props.publicationId)
            console.log(res)
            if (res == 401){
                navigate('/login');
              }
              props.getpublications() //update publications
              
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