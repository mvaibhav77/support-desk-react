const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Notes = require('../models/noteModel')
const Tickets = require('../models/ticketModel')

// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req,res)=>{
  // get user using id and token
  const user = await User.findById(req.user.id)

  if(!user){
    res.status(400)
    throw new Error('User not found')
  }

  const ticket = await Tickets.findById(req.params.ticketId)

  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not autorized')
  }

  const notes = await Notes.find({ticket: req.params.ticketId})

  res.status(200).json(notes)
})

// @desc Create ticket note
// @route GET /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req,res)=>{
  const ticket = await Tickets.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const note = await Notes.create({
    ticket: req.params.ticketId,
    text: req.body.text,
    isStaff: false,
    user: req.user.id,
  })

  res.status(200).json(note)

})

module.exports = {
  getNotes,
  addNote
}