import BorrowerModel from '../models/borrowerModel.js';

// For the demo, we'll simulate database operations
const borrowers = [];
let idCounter = 1;

export const createBorrower = async (req, res) => {
  try {
    const borrowerData = req.body;
    
    // In a real implementation, we would save to MongoDB:
    // const newBorrower = await BorrowerModel.create(borrowerData);
    
    // For demo purposes, we'll simulate a database save
    const newBorrower = {
      id: idCounter++,
      ...borrowerData,
      applicationStatus: 'pending',
      createdAt: new Date()
    };
    
    borrowers.push(newBorrower);
    
    // Simulate network latency
    setTimeout(() => {
      res.status(201).json({ 
        success: true, 
        data: newBorrower 
      });
    }, 1000);
    
  } catch (error) {
    console.error('Error creating borrower:', error);
    
    // Return appropriate error responses
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

export const getBorrowers = async (req, res) => {
  try {
    // In a real implementation, we would query MongoDB:
    // const allBorrowers = await BorrowerModel.find();
    
    // For demo purposes, we'll return our in-memory array
    res.status(200).json({
      success: true,
      count: borrowers.length,
      data: borrowers
    });
    
  } catch (error) {
    console.error('Error fetching borrowers:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

export const getBorrowerById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // In a real implementation, we would query MongoDB:
    // const borrower = await BorrowerModel.findById(id);
    
    // For demo purposes, we'll search our in-memory array
    const borrower = borrowers.find(b => b.id === parseInt(id));
    
    if (!borrower) {
      return res.status(404).json({
        success: false,
        error: 'Borrower not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: borrower
    });
    
  } catch (error) {
    console.error('Error fetching borrower:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

export const updateBorrowerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicationStatus } = req.body;
    
    // In a real implementation, we would update in MongoDB:
    // const updatedBorrower = await BorrowerModel.findByIdAndUpdate(
    //   id,
    //   { applicationStatus },
    //   { new: true, runValidators: true }
    // );
    
    // For demo purposes, we'll update our in-memory array
    const borrowerIndex = borrowers.findIndex(b => b.id === parseInt(id));
    
    if (borrowerIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Borrower not found'
      });
    }
    
    borrowers[borrowerIndex] = {
      ...borrowers[borrowerIndex],
      applicationStatus
    };
    
    res.status(200).json({
      success: true,
      data: borrowers[borrowerIndex]
    });
    
  } catch (error) {
    console.error('Error updating borrower status:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};