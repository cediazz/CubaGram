import UserPublication from "../UserPublication/UserPublication"

function PublicationsProfile(props){

    return (
        <UserPublication url={`${process.env.REACT_APP_BACKEND_HOST}/posts/get_posts_user/`} userId={props.userId} />
    )
}
export default PublicationsProfile