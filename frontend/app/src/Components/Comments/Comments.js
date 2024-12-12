import { Link } from "react-router-dom"

function Comments(props) {

    return (
        <div className="list-group">
            {props.comments.map(comment => (
                <div className="card-comment" key={comment.id}>
                    <img className="img-circle img-sm" src={comment.user.image} alt="" />
                    <div className="comment-text">
                        <span className="username">
                            <Link to={"/profile/" + comment.user.id}>{comment.user.first_name} {comment.user.last_name}</Link>
                            <span className="text-muted float-right">{comment.comment_date}</span>
                        </span>
                        {comment.content}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Comments