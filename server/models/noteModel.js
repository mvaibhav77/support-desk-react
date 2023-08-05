const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Ticket',
  },
  text: {
    type: String,
    required: [true, 'Please add some text']
  },
  isStaff: {
    type: Boolean,
    default: false
  },  
  staffId: {
    type: String,
    required: [true, 'Please enter staff ID']
  },
}, {
  timestamps : true
})

module.exports = mongoose.model('Notes', noteSchema)