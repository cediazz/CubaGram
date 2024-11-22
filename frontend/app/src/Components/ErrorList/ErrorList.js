import { ErrorMessage } from 'formik';

function ErrorList(props){

    return(
        
        
        
        <ul>
            {props.error_list.map(error_name => <li><ErrorMessage name={error_name} >{(msg) => <div className='error-message'>{msg}<i class="fas fa-exclamation-circle px-1"></i></div>}</ErrorMessage></li>)}
        </ul>
        
      
        
        
           
    )
}
export default ErrorList