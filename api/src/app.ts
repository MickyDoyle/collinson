import express from 'express';
import cors from 'cors';
import { LocationController } from './controllers/location';
import { RecommendationController } from './controllers/recommendation';

const app = express();
const locationController = new LocationController();
const recommendationController = new RecommendationController();

// Enable CORS
app.use(cors());

// Define routes
app.get('/', (req, res) => locationController.getIndex(req, res));
app.get('/location', (req, res) => locationController.getIndex(req, res));
app.get('/recommendation', (req, res) => recommendationController.getIndex(req, res));

// Start the server
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
