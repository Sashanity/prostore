//Material ui is pain in the ass to implement pagination, so this components is implemented usin bootstrap
// import { Pagination, PaginationItem } from '@material-ui/lab'
import { Pagination, PaginationItem } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CustomPagination = (props) => {
    const { keyword = '', page, pages, isAdmin = false, history } = props
    console.log('PAGE IS=', page)
    const [pagex, setPagex] = useState(page)
    console.log('PAGEX IS=', pagex)

    const handleChange = (e, val) => {
        // console.log('page pressed')
        setPagex(val)
        console.log('pagex is', pagex)
    }
    useEffect(() => {


    }, [pagex])
    return (
        pages > 1 && (
            <Pagination
                shape="rounded"
                count={pages}
                page={pagex}
                onChange={handleChange}

                // figure out oe to rerender here on change
                renderItem={(item) => (
                    <PaginationItem
                        component={Link}
                        to={
                            !isAdmin
                                ? keyword
                                    ? `/search/${keyword}/page/${pagex}`
                                    : `/page/${pagex}`
                                : `/admin/productlist/${pagex}`
                        }
                        {...item}
                    />
                )}
            >
            </Pagination >


        )






    )
}

export default CustomPagination
