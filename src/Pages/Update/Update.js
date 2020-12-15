import React, {useState, useEffect} from 'react'
import { Redirect, Link } from 'react-router-dom'
import './../Add/add.css'
import Axios from 'axios'
export default function UpdatePost(props) {
    const [post, setPost] = useState({title: '', body: '', id: props.match.params.postId})
    const token = localStorage.getItem("token")
    


     const formSubmit = (e) => {
        e.preventDefault()        
        Axios.put(`https://academy-training.appssquare.com/api/posts/${props.match.params.postId}`, post, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                console.log("res", res.data);
                props.history.push("/home")
            })
            .catch(err => {
                console.log('err', err);
            })
            return <Redirect to='/home'/>
    }
    
    // useEffect(() => {
    //    console.log(props.match.params.postId)
    // },[])
  
    if(token === null) {
        return <Redirect to='/logout'/>
     }

    return (
        <div className="add">
            <div className='container'> 
                <div className="row mt-3 justify-content-between mb-3">
                    <h1>Update Page</h1>
                    <Link to='/logout'><img className='logout-img float-right' src="https://us.123rf.com/450wm/faysalfarhan/faysalfarhan1710/faysalfarhan171011434/88836773-stock-illustration-logout-isolated-on-elegant-red-round-button-abstract-illustration.jpg?ver=6" alt=""/></Link>               
                </div>           
                <div className="row">
                <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-col-sm-12 add-form">
                    <form onSubmit={formSubmit} >
                        <h2 className='text-center'>Update Post</h2>
                        <div className="form-group">
                            <label>title </label>
                            <input type="text" required name="title" className="form-control" placeholder="title"                        
                                onChange={e => setPost({...post, title: e.target.value})}

                            />
                        </div>
                        <div className="form-group">
                            <label>body </label>
                            <input type="text" name="body" required className="form-control" placeholder="body"                        
                                onChange={e => setPost({...post, body: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <button className='btn btn-success'>Update Post</button>
                            <Link className='btn btn-danger float-right' to='/home' >Cancal Update</Link>
                        </div>
                        </form>
                </div>
                    
                </div>
            </div>
        </div>
    )
}
