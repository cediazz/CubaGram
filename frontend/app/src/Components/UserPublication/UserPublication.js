import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserPublication(){

  const navigate = useNavigate();
 
  useEffect(() => {
    if (!localStorage.getItem('username'))
     navigate("/login")
    
  }, [])

    return(
        
        <div class="row d-flex justify-content-center">
          <div class="col-md-12">
            
            <div class="card card-widget">
              <div class="card-header">
                <div class="user-block">
                  <img class="img-circle" src="../dist/img/user1-128x128.jpg" alt="User Image" />
                  <span class="username"><a href="#">Jonathan Burke Jr.</a></span>
                  <span class="description">Shared publicly - 7:30 PM Today</span>
                </div>
               
                <div class="card-tools">
                  <button type="button" class="btn btn-tool" title="Mark as read">
                    <i class="far fa-circle"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="remove">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
               
              </div>
              
              <div class="card-body">
                <img class="img-fluid pad" src="../dist/img/photo2.png" alt="Photo" />

                <p>I took this photo this morning. What do you guys think?</p>
                <button type="button" class="btn btn-default btn-sm"><i class="fas fa-share"></i> Share</button>
                <button type="button" class="btn btn-default btn-sm"><i class="far fa-thumbs-up"></i> Like</button>
                <span class="float-right text-muted">127 likes - 3 comments</span>
              </div>
             
              <div class="card-footer card-comments">
                <div class="card-comment">
                 
                  <img class="img-circle img-sm" src="../dist/img/user3-128x128.jpg" alt="User Image" />

                  <div class="comment-text">
                    <span class="username">
                      Maria Gonzales
                      <span class="text-muted float-right">8:03 PM Today</span>
                    </span>
                    It is a long established fact that a reader will be distracted
                    by the readable content of a page when looking at its layout.
                  </div>
                  
                </div>
               
                <div class="card-comment">
                  
                  <img class="img-circle img-sm" src="../dist/img/user4-128x128.jpg" alt="User Image" />

                  <div class="comment-text">
                    <span class="username">
                      Luna Stark
                      <span class="text-muted float-right">8:03 PM Today</span>
                    </span>
                    
                  </div>
                  
                </div>
                
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
}
export default UserPublication