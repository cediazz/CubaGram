import createLike from "../../utils/createLike";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useState } from "react";

function CommentButton(props) {

    const navigate = useNavigate()
    const [loading, setLoading] = useState()

    async function commentManagement() {
        setLoading(true)
        try {
            /*let res = await createLike(props.publicationId)
            console.log(res)
            if (res == 401) {
                setLoading(false)
                navigate('/login');
            }*/
        setLoading(false)
        }
        catch (error) {
            setLoading(false)
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
            class="btn btn-default btn-sm"
            onClick={() => commentManagement()}
        >
            <i class="fas fa-comments"></i>
            Ver comentarios
            {loading && <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>}
            
        </button>

    )
}
export default CommentButton