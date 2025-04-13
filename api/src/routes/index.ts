import { Router } from 'express';
import { LocationController } from '../controllers/location';
import { RecommendationController } from '../controllers/recommendation';

const router = Router();
const locationController = new LocationController();
const recommendationController = new RecommendationController();

export function setRoutes(app: Router) {
  app.get('/location', locationController.getIndex.bind(locationController));
  app.get('/recommendation', recommendationController.getIndex.bind(recommendationController));
}

export default router;
