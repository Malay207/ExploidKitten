import {React,useState} from 'react'
import "../styles/signup.css"
import { Link ,useNavigate} from 'react-router-dom'

const Signup = () => {
  const naviagte=useNavigate();
  const [sign, setsign] = useState({name:"",email: "",password:""});

  const signin=async ()=>{
    const res=await fetch("https://go-backend-api-7.onrender.com/create-user",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username:sign.name,
        email:sign.email,
        password:sign.password
    }),
  });
  const data=await res.json()
        setsign({name:"",email: "",password:""})
        localStorage.setItem("exploit-kitten-userdata",JSON.stringify(data));
        naviagte("/");
        window.location.reload();
}
const onchange=(e)=>{
  setsign({...sign,[e.target.name]:e.target.value})
}
  return (
    <div className='signup_container'>
        <h1>Sign Up</h1>
       <form className='signup_form'>
       <div className='userdata'>
        <label>Name</label>
        <input type='text' placeholder='Enter your name' name='name' id='name' required minLength={3} onChange={onchange} value={sign.name} maxLength={8}/>
    </div>
        <div className='userdata'>
            <label>Email</label>
            <input type='email' placeholder='Enter your email' name='email' id='email' onChange={onchange} value={sign.email} required/>
        </div>
        <div className='userdata'>
            <label>Password</label>
            <input type='password' placeholder='Enter your password' name='password' id='password' onChange={onchange} value={sign.password} required minLength={6}/>
        </div>
        <p>Are You Have any Account? <Link to="/login">Login Here</Link></p>
        <button className='btn' type='submit' onClick={(e)=>{
          e.preventDefault()
          signin();
        }}>Sign Up</button>

       </form>

    </div>
  )
}

export default Signup