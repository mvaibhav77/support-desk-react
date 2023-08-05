const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  product: {
    type: String,
    required: [true, 'Please select a product'],
    enum: ['Mobile', 'Laptop', 'Tablet', 'PC']
  },
  description: {
    type: String,
    required: [true, 'Please enter a description of the issue']
  },
  status: {
    type: String,
    required:true,
    enume:['new', 'open', 'closed'],
    default: 'new'
  }
}, {
  timestamps : true
})

module.exports = mongoose.model('Tickets', ticketSchema)