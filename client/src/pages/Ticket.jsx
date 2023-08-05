import {useSelector, useDispatch} from 'react-redux'
import {getTicket,closeTicket, reset} from '../features/tickets/ticketSlice'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

function Ticket() {
  const {ticket, isLoading, isSuccess, isError, message} = useSelector(state=> state.ticket)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const ticketId = params.ticketId

  // Close Ticket
  const onTicketClose = (e)=>{
    e.preventDefault()
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed Successfully')
    navigate('/tickets')
  }

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    // eslint-disable-next-line
  },[isError,message,ticketId])

  if(isLoading){
    return <Spinner />
  }
  if(isError){
    return <h3>Something Went Worng</h3>
  }

  return (
    <div className='ticket-page'>
      <header className="ticket-header">
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-IN')}</h3>
        <h3>Product : {ticket.product}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !=='closed' && (
        <button className="btn btn-block btn-danger" on onClick={onTicketClose}>Close Ticket</button>
      )}
    </div>
  )
}

export default Ticket