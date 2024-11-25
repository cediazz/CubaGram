

function AlertServer(props) {

    return (
        <div class="alert alert-danger">
            <h5><i class="icon fas fa-info"></i>El servidor detectó los siguientes errores:</h5>
            <ul>
            {props.errors.map(error => <li>{error}</li>)}
            </ul>
        </div>
    )
}
export default AlertServer