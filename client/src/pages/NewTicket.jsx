import { useState, useEffect } from "react"
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from "react-redux"
import { createTicket, reset } from "../features/tickets/ticketSlice"
import { useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket() {
  const user = useSelector((state) => state.auth.user)
  const [product,setProduct] = useState('Laptop')
  const [description,setDescription] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {isLoading, isError, isSuccess, message} = useSelector((state)=> state.ticket)



  useEffect(()=>{
    if(isError){
      toast.error(message)
      console.log(message)
    }

    // redirect when logged in
    if(isSuccess){
      console.log('Success')
      dispatch(reset())
      navigate('/tickets')
   }

   dispatch(reset())


 },[isSuccess, isError, message, dispatch, navigate])

  const onSubmit = (e)=>{
    e.preventDefault()
    dispatch(createTicket({product, description}))
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className="section heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out te form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className='form-control' name="name" id="name" value={user.name} disabled/>
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <input type="text" className='form-control' name="email" id="name" value={user.email} disabled/>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select name="product" id="product" value={product} onChange={(e)=> setProduct(e.target.value)}>
              <option value='Laptop'>Laptop</option>
              <option value='Mobile'>Mobile</option>
              <option value='PC'>PC</option>
              <option value='Tablet'>Tablet</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Desciption of the issue</label>
            <textarea name="description" id="description" className="form-control" placeholder="Description" value={description} onChange={(e)=> setDescription(e.target.value)}></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket