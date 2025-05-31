import mongoose from 'mongoose';

const borrowerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  residenceType: {
    type: String,
    required: [true, 'Residence type is required'],
    enum: ['owned', 'rented', 'mortgaged', 'living_with_parents', 'company_provided', 'other']
  },
  monthlyIncome: {
    type: Number,
    required: [true, 'Monthly income is required']
  },
  previousLoan: {
    type: String,
    required: [true, 'Previous loan information is required'],
    enum: ['yes', 'no']
  },
  maritalStatus: {
    type: String,
    required: [true, 'Marital status is required'],
    enum: ['single', 'married', 'divorced', 'widowed']
  },
  dependents: {
    type: Number,
    required: [true, 'Number of dependents is required'],
    min: 0,
    max: 10
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  applicationStatus: {
    type: String,
    default: 'pending',
    enum: ['pending', 'under_review', 'approved', 'rejected']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model for our schema
const BorrowerModel = mongoose.models.Borrower || mongoose.model('Borrower', borrowerSchema);

export default BorrowerModel;