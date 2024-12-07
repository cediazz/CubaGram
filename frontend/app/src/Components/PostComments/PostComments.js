import { Link } from "react-router-dom"

function PostComments(props) {

    return (
        props.comments.map(comment => 
            <div class="card-comment">
            <img class="img-circle img-sm" src={comment.user.image} alt="" />
            <div class="comment-text">
                <span class="username">
                <Link to={"profile/" + comment.user.id}>{comment.user.first_name} {comment.user.last_name}</Link>
                    <span class="text-muted float-right">{comment.comment_date}</span>
                </span>
                {comment.content}
            </div>
        </div>
    )
    )
}
export default PostComments