import ReactPaginate from 'react-paginate'
import getUsers from "../../utils/getUsers";


function MyPagination(props) {

    const handlePageChange = async (event) => {
        const page = event.selected + 1;
        let data = await getUsers(page)
        console.log(data)
        props.setUsers(data.results)

    };

    return (
        <>
            <ReactPaginate
                nextLabel={"siguiente"}
                previousLabel={"anterior"}
                pageCount={props.pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                pageClassName={'page-item'}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                activeClassName={"active"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
            />
        </>
    )

}
export default MyPagination