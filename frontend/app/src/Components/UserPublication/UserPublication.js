import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import PostComments from "../PostComments/PostComments";
import Loading from "../Loading/Loading";
import getPublications from "../../utils/getPublications";
import Swal from 'sweetalert2'

function UserPublication(){

  const navigate = useNavigate()
  const [loading, setLoading] = useState()
  const [publications, setPublications] = useState()
  const [comments, setComments] = useState()
  
  async function getpublications(){
 
    try{
    let res = await getPublications()
    console.log(res)
    if (res == 401){
        setLoading(false)
        navigate('/login');
      }
      else{
        setPublications(res)
        setLoading(false)
      }
    }
    catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            confirmButtonColor: '#F27474'
        });
        setLoading(false)
    }
    

}
 
  useEffect(() => {
    setLoading(true)
    if (!localStorage.getItem('username'))
        navigate("/login")
    else{
      getpublications()
       
    }

}, [])

    return(
      loading == true ? <Loading /> :
        publications && publications.map(publication => 
          <div class="row d-flex justify-content-center">
          <div class="col-md-12">
            <div class="card card-widget">
              <div class="card-header">
                <div class="user-block">
                  <img class="img-circle" src={publication.user.image} alt="" />
                  <span class="username"><a href="#">{publication.user.first_name} {publication.user.last_name}</a></span>
                  <span class="description">{publication.user.publication_date}</span>
                </div>
               <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="remove">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
               </div>
              <div class="card-body">
                {publication.image && <img class="img-fluid pad" src={publication.image} alt="" />}
                <p>{publication.content}</p>
                <button type="button" class="btn btn-default btn-sm"><i class="fas fa-share"></i> Share</button>
                <button type="button" class="btn btn-default btn-sm"><i class="far fa-thumbs-up"></i> Like</button>
                <span class="float-right text-muted">{publication.numb_likes} likes- {publication.numb_comm} comentarios</span>
              </div>
             <div class="card-footer card-comments">
                {comments && <PostComments />}
              </div>
              
              <div class="card-footer">
                <form action="#" method="post">
                  <img class="img-fluid img-circle img-sm" src="../dist/img/user4-128x128.jpg" alt="Alt Text" />
                  <div class="img-push">
                    <input type="text" class="form-control form-control-sm" placeholder="Press enter to post comment" />
                  </div>
                </form>
              </div>
              
            </div>
            </div>
          </div>
        )
          
    )
}
export default UserPublication