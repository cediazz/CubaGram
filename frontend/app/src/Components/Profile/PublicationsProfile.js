import UserPublication from "../UserPublication/UserPublication"

function PublicationsProfile(props){

    return (
        <UserPublication url={`http://127.0.0.1:8000/posts/get_posts_user/`} userId={props.userId} />
    )
}
export default PublicationsProfile