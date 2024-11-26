

function AboutMe(props) {

    return (
        <div class="card card-primary">
            <div class="card-header">
                <h3 class="card-title">Acerca de mi</h3>
            </div>
            <div class="card-body">
                <strong><i class="fas fa-book mr-1"></i>Educación</strong>
                <p class="text-muted">
                    {props.userData.education}
                </p>
                <hr />
                <strong><i class="fas fa-map-marker-alt mr-1"></i>Localización</strong>
                <p class="text-muted">{props.userData.location}</p>
                <hr />
                <strong><i class="far fa-file-alt mr-1"></i>Biografía</strong>
                <p class="text-muted">{props.userData.biography}</p>
            </div>
        </div>
    )
}
export default AboutMe