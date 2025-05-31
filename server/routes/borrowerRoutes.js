import express from 'express';
import { 
  createBorrower, 
  getBorrowers, 
  getBorrowerById,
  updateBorrowerStatus
} from '../controllers/borrowerController.js';

const router = express.Router();

// POST /api/borrowers - Create a new borrower
router.post('/', createBorrower);

// GET /api/borrowers - Get all borrowers
router.get('/', getBorrowers);

// GET /api/borrowers/:id - Get a borrower by ID
router.get('/:id', getBorrowerById);

// PATCH /api/borrowers/:id/status - Update borrower application status
router.patch('/:id/status', updateBorrowerStatus);

export { router as borrowerRoutes };