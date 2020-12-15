import React, {useState, useEffect} from 'react'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

export default function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
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
        setLoading(false)
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


    const postsRender = (
        posts.length === 0 ? <h5 className='text-danger mt-4'>There are no posts yet!</h5>:<>{
             posts.map(post => {
            return (
                <div key={post.id} className="row py-2 border">
                    <div className="col-md-4 col-xl-3 mb-2 d-flex align-items-center"><h6><span className='font-weight-bolder d-inline d-md-none'>Title: </span> <span className='text-primary'>{post.title}</span> </h6></div>
                    <div className="col-md-5 col-xl-7 mb-2"><h6><span className='font-weight-bolder d-inline d-md-none'>Body</span> {post.body}</h6></div>
                    <div className="col-md-3 col-xl-2">
                        <div className="row">
                            <div className="col-6 "> <Link className='btn btn-success' to={`/update/${post.id}`} > Update </Link></div>
                            <div className="col-4"><button className='btn btn-danger' onClick={() => deletePost(post.id)} > delete </button></div>
                        </div>
                    </div>
                </div>
            )
        })
        }</>
    )

    if(token === null) {
        return <Redirect to='/logout'/>
     } 
    
    return (
        <div className='container'>
            <div className="row mt-3 justify-content-between mb-4">
                <h1>Home Page</h1>
                <Link to='/logout'><img className='logout-img float-right' src="https://us.123rf.com/450wm/faysalfarhan/faysalfarhan1710/faysalfarhan171011434/88836773-stock-illustration-logout-isolated-on-elegant-red-round-button-abstract-illustration.jpg?ver=6" alt=""/></Link>               
            </div>
            <div className="row d-none d-md-flex border nav py-2 shadow-sm">
                <div className="col-4 col-xl-3"><h5 className='font-weight-bolder'>Title</h5></div>
                <div className="col-6"><h5 className='font-weight-bolder'>Body</h5></div>
            </div>
            {postsRender}
            <div className="row">
                <div className='col-md-12 h1'><Link className='btn btn-primary mt-3 py-2 btn-block d-block add-post' to='/add'>Add Post</Link></div>
            
            </div>
           
        </div>
    )
}
