

function PublicationsProfile(){

    return (
        <div class="post">
        <div class="user-block">
          <img class="img-circle img-bordered-sm" src="../../dist/img/user6-128x128.jpg" alt="User Image" />
          <span class="username">
            <a href="#">Adam Jones</a>
            <a href="#" class="float-right btn-tool"><i class="fas fa-times"></i></a>
          </span>
          <span class="description">Posted 5 photos - 5 days ago</span>
        </div>
        <div class="row mb-3">
          <div class="col-sm-6">
            <img class="img-fluid" src="../../dist/img/photo1.png" alt="Photo" />
          </div>
        </div>
        <p>
          <a href="#" class="link-black text-sm mr-2"><i class="fas fa-share mr-1"></i> Share</a>
          <a href="#" class="link-black text-sm"><i class="far fa-thumbs-up mr-1"></i> Like</a>
          <span class="float-right">
            <a href="#" class="link-black text-sm">
              <i class="far fa-comments mr-1"></i> Comments (5)
            </a>
          </span>
        </p>

        <input class="form-control form-control-sm" type="text" placeholder="Type a comment" />
      </div>
    )
}
export default PublicationsProfile