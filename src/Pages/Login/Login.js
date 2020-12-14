import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import Loading from '../Loading/Loading'
import './Login.css'
import Axios from 'axios'
export default class Login extends Component {
    constructor(props) {
        super(props)
        let loggedin = false
        const token = localStorage.getItem("token")
        if(token) loggedin = true
        this.state= {
            email: '',
            password: '',
            loggedin,
            error: '',
            isloading: false
        }
       
        this.formSubmit = this.formSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

        setTimeout(() => {
            this.setState({isloading: true})
        }, 5000);
        

    }
    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


     formSubmit(e) {
        e.preventDefault()
        const {email, password} = this.state
        console.log(email, password);
        Axios.post("https://academy-training.appssquare.com/api/login" , {email, password}).then(res => {
                console.log(res);
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.user))


                this.setState({
                    loggedin: true
                })
            }).catch( error => {
               console.log('catch error', JSON.parse(JSON.stringify(error)))
               console.log('eeee', error)

            })
      
    }
    
    render() {
        
        

        if(this.state.loggedin) {
            return <Redirect to='/home' />
        }
        else if(this.state.isloading === false) {
            return <Loading />
        }
        return (
           
             <div className='login'>
                <div className="containser-fluid">
                <div className="row">
                    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
                    <div className="card form-holder">
                    <div className="card-body">
                    <h1 className='text-center'>Login</h1>
                    <form onSubmit={this.formSubmit} method="post">
                        <div className="form-group">
                        <label>Email</label>
                            <input type="email" className="form-control" placeholder='email' name='email' onChange={this.onChange} value={this.state.email} /> 
                        </div>
                        <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder='password' name='password' onChange={this.onChange} value={this.state.password} /> 
                        </div>
                        <div className="row">
                        <div className="col-12 text-center">
                            <button className="btn btn-primary px-4">Login</button>
                        </div>
                        </div>
                    </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}



 
            // Axios.delete('posts'+ id, {headers:{})
            // react route guard 
            
        //    Axios.get('url', {email:'mail@mail.com'}, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })

                // JSON.parse(var)



        //    Axios.get('url', {email:'mail@mail.com'}, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }).then(res => {
        //        console.log(res.data);
        //    })

