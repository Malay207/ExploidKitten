import {React,useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import "../styles/login.css"
const Login = () => {
    const naviagte=useNavigate();
    const [email, setemail] = useState({email: "",password:""})
    const login=async ()=>{
        const response=await fetch("https://go-backend-api-7.onrender.com/login-user",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email.email,
            })
        })
        const data=await response.json()
        setemail({email:"",password:""})
        localStorage.setItem("exploit-kitten-userdata",JSON.stringify(data));
        naviagte("/");
        window.location.reload();
    }
    const onchange=(e)=>{
        setemail({...email,[e.target.name]:e.target.value})
    }
  return (
    <div className='login_container'>
    <h1>Login</h1>
   <form className='login'>
    <div className='login_userdata'>
        <label>Email</label>
        <input type='email' placeholder='Enter your email' name='email' id='email' onChange={onchange} value={email.email} required/>
    </div>
    <div className='login_userdata'>
        <label>Password</label>
        <input type='password' placeholder='Enter your password' name='password' id='password' onChange={onchange} value={email.password} required minLength={6}/>
    </div>
    <p>Don't have any Account? <Link to="/signup">SignUP Here</Link></p>
    <button className='btn' type='submit' onClick={(e)=>{
        e.preventDefault()
        login();
    }}>Login</button>

   </form>

</div>
  )
}

export default Login