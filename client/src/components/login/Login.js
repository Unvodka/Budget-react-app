import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Login-register.css'

const Login = () => {

    const [user, setUser] = useState({
        email:'', password: ''
    })

    const onChangeInput = (e) => {
        const {name, email, password, value} = e.target;
        setUser({...user, [name]:value, [email]:value, [password]:value})
    }

    const loginSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3005/user/login', user)

            localStorage.setItem('firstLogin', true)
            localStorage.setItem('accessToken', res.data.accesstoken)
            localStorage.setItem('user-info', user.email)
            
            sessionStorage.setItem('activeSession', 'true')

            window.location.href = "/envelopes";
        } catch (err) {
            alert(err.response.data.msg)
            console.log(err)
        }
    }
  
  return (
    <form onSubmit={loginSubmit}>
      <fieldset className='login'>
        <legend>Login or Register</legend>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" name="email" value={user.email} onChange={onChangeInput} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" ></input>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" autoComplete='true' value={user.password} onChange={onChangeInput} className="form-control" id="exampleInputPassword1" placeholder="Password" ></input>
            </div>
            <button className="btn-login" type="submit">Login</button>
            <Link to="/register">REGISTER</Link>
      </fieldset>
    </form>
  )
}
export default Login