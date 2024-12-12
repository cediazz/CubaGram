import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comments from "../Comments/Comments";
import Loading from "../Loading/Loading";
import getPublications from "../../utils/getPublications";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom"
import LikeButton from "../LikeButton/LikeButton";
import CommentButton from "../CommentButton/CommentButton";
import PostComment from "../PostComments/PostComments";

function UserPublication(props) {

  const navigate = useNavigate()
  const [loading, setLoading] = useState()
  const [publications, setPublications] = useState([])
  const [comments, setComments] = useState({})
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const url = props.url ? `${props.url}?user=${props.userId}&page=${page}`:`http://127.0.0.1:8000/posts/?page=${page}`

  async function getpublications() {
    console.log(url)
    setLoading(true)
    try {
      let res = await getPublications(url)
      console.log(res)
      if (res == 401) {
        setLoading(false)
        navigate('/login');
      }
      else if (res.count != 0) {
        setPublications(prev => [...prev, ...res.results])
        setHasMore(res.next !== null); // Verifica si hay más publicaciones
        setLoading(false)
      }
      else {
        Swal.fire({
          icon: "info",
          title: "Información",
          text: "No se econtraron publicaciones",
          
      })
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

    if (!localStorage.getItem('username'))
      navigate("/login")
    else {
      getpublications()

    }

  }, [page])

  return (
    <div>
      {publications && publications.map(publication =>
        <div class="row d-flex justify-content-center">
          <div class="col-md-10">
            <div class="card card-widget">
              <div class="card-header">
                <div class="user-block">
                  <img class="img-circle" src={publication.user.image} alt="" />
                  <span class="username"><Link to={"profile/" + publication.user.id}>{publication.user.first_name} {publication.user.last_name}</Link></span>
                  <span class="description">Publicado el {publication.publication_date}</span>
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
                <CommentButton publicationId={publication.id} comments={comments} setComments={setComments} />
                <LikeButton
                  publicationId={publication.id}
                  userLiked={publication.user_liked}
                  setPublications={setPublications}
                />
                <span class="float-right text-muted">{publication.numb_likes} me gusta- {publication.numb_comm} comentarios</span>
              </div>
              <div class="card-footer card-comments">
                {comments[publication.id] && <Comments comments={comments[publication.id]} />}
              </div>
              <div class="card-footer">
                <PostComment publicationId={publication.id} setPublications={setPublications} comments={comments} setComments={setComments} />
              </div>

            </div>
          </div>
        </div>
      )}
      <row className="mt-3" >
        <div style={{ textAlign: "center" }}>
          {loading == true ? <Loading /> : hasMore &&
            <button type="button"
              className={'btn-info btn btn-sm'}
              onClick={() => setPage(prev => prev + 1)}>
              <i className={'fas fa-angle-down'}></i> Ver más publicaciones
            </button>}
        </div>
      </row>
    </div>
  )
}
export default UserPublication