import { Request, Response } from 'express';
import { searchPlaces } from '../datasources/googlePlaces';

export class LocationController {
  public async getIndex(req: Request, res: Response): Promise<void> {
    const textQuery = req.query.textQuery as string;
    // Validate query parameters
    if (!textQuery || typeof textQuery !== 'string') {
      res.status(400).json({ error: 'Invalid or missing "textQuery" parameter' });
      return;
    }
    const places = await searchPlaces(textQuery);
    res.json(places);
  }
}
