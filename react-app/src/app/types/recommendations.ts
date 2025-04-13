export type activitiesTypes = 'Skiing' | 'Surfing' | 'Outdoor sightseeing' | 'Indoor sightseeing';
export interface Recommendation {
  date: string;
  temperature: number;
  windSpeed: number;
  precipitationProbability: number;
  activities: {
    [key in activitiesTypes]: {
      isRecommended: boolean;
      reasons: string[];
    };
  };
}

export interface RecommendationResponse {
  latitude: number;
  longitude: number;
  days: Recommendation[];
}
