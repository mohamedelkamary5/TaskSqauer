import React from 'react'
import { ClipLoader } from 'react-spinners'
import './loading.css'

export default function Loading() {
    
    return (
        <div className='loading'>
            <ClipLoader size={114} loading color='#2980C2' />
        </div>
    )
}

