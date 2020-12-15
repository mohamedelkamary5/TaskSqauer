import React from 'react'
import { Link  } from 'react-router-dom'

export default function Error() {
    return (
        <div className='container'>
            <h1>404</h1>
            <h5 className='mb-2'>sorry, the page tou tride connot be found</h5>
            <Link to='/' className='btn btn-primary'><h5>Back Home</h5></Link>
        </div>
    )
}
