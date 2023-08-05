import {useSelector, useDispatch} from 'react-redux'
import {getTicket,closeTicket} from '../features/tickets/ticketSlice'
import { useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
// import { getNotes, createNote } from '../features/notes/notesSlice'
// import NoteItem from '../components/NoteItem'

function Ticket() {
  const {ticket, isLoading, isError} = useSelector(state=> state.ticket)
  // const {notes, isLoading: notesIsLoading} = useSelector(state=> state.notes)

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

  useEffect(() => {
    dispatch(getTicket(ticketId)).unwrap().catch(toast.error)
    // dispatch(getNotes(ticketId)).unwrap().catch(toast.error)
  }, [ticketId, dispatch])

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
        {/* <h2>Notes</h2> */}
      </header>
{/* 
      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )} */}

      {ticket.status !=='closed' && (
        <button className="btn btn-block btn-danger" onClick={onTicketClose}>Close Ticket</button>
      )}
    </div>
  )
}

export default Ticket