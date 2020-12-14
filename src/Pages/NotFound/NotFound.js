import React from 'react'
import { Link  } from 'react-router-dom'

export default function Error() {
    return (
        <div>
            <h1>404</h1>
            <p>sorry, the page tou tride connot be found</p>
            <Link to='/' className='btn btn-default'>Back Home</Link>
        </div>
    )
}
