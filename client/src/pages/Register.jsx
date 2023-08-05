import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa";
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {register, reset} from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner'

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const navigate = useNavigate()

  const {name,email,password,password2} = formData

  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth)


  useEffect(()=>{
     // redirect when logged in
     if(isSuccess || user){
      navigate('/')
    }

    if(isError){
      toast.error(message)
      console.log(message)
    }

    dispatch(reset)

  },[user, isLoading, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e)=>{
    setFormData((prev)=>(
      {
        ...prev,
        [e.target.name]: e.target.value
      }
    ))
  }

  const onSubmit = (e)=>{
    e.preventDefault();

    if(password !== password2){
      toast.error('Passwords do not Match')
    }else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }

  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register 
        </h1>
        <p>Please create an Account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" id='name' value={name} name='name' onChange={onChange} placeholder="Please enter your name" required/>
          </div>
          <div className="form-group">
            <input type="email" className="form-control" id='email' value={email} name='email' onChange={onChange} placeholder="Please enter your email" required/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id='password' value={password} name='password' onChange={onChange} placeholder="Enter a password" required/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id='password2' value={password2} name='password2' onChange={onChange} placeholder="Confirm password" required/>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register