import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create new Ticket
export const createTicket = createAsyncThunk('tickets/create', 
  async (ticketData, thunkAPI)=>{
    console.log(ticketData)
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.createTicket(ticketData,token)
    } catch (error) {
      console.log(error)
      const message = (error.response && error.response.data && error.response.data.message) || error.messsage || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get Tickets
export const getTickets = createAsyncThunk('tickets/getAll', 
  async (_, thunkAPI)=>{
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTickets(token)
    } catch (error) {
      console.log(error)
      const message = (error.response && error.response.data && error.response.data.message) || error.messsage || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get Tickets
export const getTicket = createAsyncThunk('tickets/getOne', 
  async (ticketId, thunkAPI)=>{
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.getTicket(ticketId,token)
    } catch (error) {
      console.log(error)
      const message = (error.response && error.response.data && error.response.data.message) || error.messsage || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Clode Tickets
export const closeTicket = createAsyncThunk('tickets/close', 
  async (ticketId, thunkAPI)=>{
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ticketService.closeTicket(ticketId,token)
    } catch (error) {
      console.log(error)
      const message = (error.response && error.response.data && error.response.data.message) || error.messsage || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers:{
    reset: (state) => {
      state.isError = false
      state.isSuccess= false
      state.message = ''
      state.isLoading=false
    }    
  },
  extraReducers:(builder)=>{
    builder
      .addCase(createTicket.pending, (state)=> {
        state.isLoading = true
      })
      .addCase(createTicket.rejected, (state,action)=> {
        state.isLoading = false
        state.isError = true
        state.message = action.payload

      })
      .addCase(createTicket.fulfilled, (state)=> {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getTickets.pending, (state)=> {
        state.isLoading = true
      })
      .addCase(getTickets.rejected, (state,action)=> {
        state.isLoading = false
        state.isError = true
        state.message = action.payload

      })
      .addCase(getTickets.fulfilled, (state,action)=> {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getTicket.pending, (state)=> {
        state.isLoading = true
      })
      .addCase(getTicket.rejected, (state,action)=> {
        state.isLoading = false
        state.isError = true
        state.message = action.payload

      })
      .addCase(getTicket.fulfilled, (state,action)=> {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = action.payload
      })
      .addCase(closeTicket.fulfilled, (state,action)=> {
        state.isLoading = false
        state.tickets.map((ticket) => ticket._id === action.payload._id ? ticket.status ='closed' : ticket)
      })
      
  }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer