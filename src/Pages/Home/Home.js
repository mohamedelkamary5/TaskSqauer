import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

export default function Home() {
    const [posts, setPosts] = useState([])
    const token = localStorage.getItem("token")
    async function getPosts() {
        await Axios.get("https://academy-training.appssquare.com/api/posts", {
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            console.log("res", res.data.data)
            setPosts(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }
    
    useEffect(() => {
        getPosts();
    }, [])

     async function deletePost(id){
        await Axios.delete(`https://academy-training.appssquare.com/api/posts/${id}`, {
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => {
            console.log("res", res.data.data)
            setPosts(res.data.data)
        }).catch(err => {
            console.log(err)
        })
    }

    if(token === null) {
        return <Redirect to='/logout'/>
     } 
    
    return (
        <div className='container'>
            <div className="row justify-content-between mb-3">
                <h2>Home Page</h2>
                <Link to='/logout'><img className='logout-img float-right' src="https://us.123rf.com/450wm/faysalfarhan/faysalfarhan1710/faysalfarhan171011434/88836773-stock-illustration-logout-isolated-on-elegant-red-round-button-abstract-illustration.jpg?ver=6" alt=""/></Link>               
            </div>
            <div className="row border nav py-2">
                <div className="col-md-4"><h5>Title</h5></div>
                <div className="col-md-6"><h5>Body</h5></div>
            </div>
            {
            posts.map(post => {
                return (
                    <div key={post.id} className="row py-2 border">
                        <div className="col-md-4"><h6>{post.title}</h6></div>
                        <div className="col-md-6"><h6>{post.body}</h6></div>
                        <div className="col-sm-1.1"> <Link className='btn btn-success' to={`/update/${post.id}`} > Update </Link></div>
                        <div className="col-sm-1.1"><button className='btn btn-danger' onClick={() => deletePost(post.id)} > delete </button></div>
                    </div>
                )
            })}
            <div className="row">
                <div className='col-md-12'><Link className='btn btn-primary mt-3 py-2 btn-block d-block' to='/add'>Add Post</Link></div>
            
            </div>
           
        </div>
    )
}
