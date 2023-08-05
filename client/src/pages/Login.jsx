import { useState,useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa";
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner'


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const {email,password} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const {user , isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth)

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

    const userData = {
      email,
      password
    }

    dispatch(login(userData))

  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input type="email" className="form-control" id='email' value={email} name='email' onChange={onChange} placeholder="Please enter your email" required/>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id='password' value={password} name='password' onChange={onChange} placeholder="Enter a password" required/>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login