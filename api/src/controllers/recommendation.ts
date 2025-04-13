import { Request, Response } from 'express';
import { getWeather } from '../datasources/openMeteo';
import { makeRecommendations } from '../util/makeRecommendations';

export class RecommendationController {
  public async getIndex(req: Request, res: Response): Promise<void> {
    const longitude = Number(req.query.longitude);
    const latitude = Number(req.query.latitude);

    if (
      isNaN(longitude) ||
      isNaN(latitude) ||
      longitude < -180 ||
      longitude > 180 ||
      latitude < -90 ||
      latitude > 90
    ) {
      res.status(400).json({ error: 'Invalid or missing latitude/longitude parameters' });
      return;
    }

    const weather = await getWeather({ latitude, longitude });
    const recommendations = makeRecommendations(weather);
    res.json(recommendations);
  }
}
