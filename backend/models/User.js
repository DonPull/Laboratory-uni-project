const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'doctor', 'admin'], 
    default: 'user',
    required: true
  },
  // Fields exclusive to Doctors
  specialty: { 
    type: String,
    required: function() { return this.role === 'doctor'; } // Only required if role is doctor
  },
  experience: { 
    type: Number, // Years of experience
    required: function() { return this.role === 'doctor'; }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);