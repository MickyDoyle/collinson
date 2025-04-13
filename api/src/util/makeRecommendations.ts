import { Recommendation, RecommendationResponse } from '../types/recommendations';
import { WeatherDataType } from '../types/WeatherDataType';

interface RecommendationOptions {
  date: string;
  windSpeed: number;
  temperature: number;
  precipitationProbability: number;
}

const defaultConfig = {
  surfMaxWindspeed: 10,
  minOutdoorTemp: 10,
  maxSkiingTemp: 0,
  maxOutdoorPrecipitation: 50,
};

export const makeRecommendation = (
  options: RecommendationOptions,
  config = defaultConfig,
): Recommendation => {
  const recommendation = initialiseRecommendation(options);
  const { temperature, windSpeed, precipitationProbability } = options;
  const {
    Surfing: surfing,
    Skiing: ski,
    'Outdoor sightseeing': outdoor,
    'Indoor sightseeing': indoor,
  } = recommendation.activities;

  if (windSpeed > config.surfMaxWindspeed) {
    surfing.isRecommended = false;
    surfing.reasons.push('Wind speed is too hight');
  }
  if (temperature < config.minOutdoorTemp) {
    surfing.isRecommended = false;
    surfing.reasons.push('Temperature is too low');

    outdoor.isRecommended = false;
    outdoor.reasons.push('Temperature is too low');
  }
  if (temperature > config.maxSkiingTemp) {
    ski.isRecommended = false;
    ski.reasons.push('Temperature is too high');
  }
  if (precipitationProbability > config.maxOutdoorPrecipitation) {
    outdoor.isRecommended = false;
    outdoor.reasons.push('Chance of rain is high');
  }
  if (outdoor.isRecommended) {
    outdoor.reasons = ['Weather is suitable.'];
  }
  if (surfing.isRecommended) {
    surfing.reasons = ['Weather is suitable'];
  }
  if (ski.isRecommended) {
    ski.reasons = ['Weather is suitable'];
  }

  return recommendation;
};

export const makeRecommendations = (weather: WeatherDataType): RecommendationResponse => {
  const dailys = weather.daily;
  const recommendations: Recommendation[] = [];
  dailys.time.forEach((time, index) => {
    const temperature = dailys.temperature_2m_max[index];
    const windSpeed = dailys.wind_speed_10m_max[index];
    const precipitationProbability = dailys.precipitation_probability_max[index];

    recommendations.push(
      makeRecommendation({ temperature, windSpeed, precipitationProbability, date: time }),
    );
  });
  return {
    latitude: weather.latitude,
    longitude: weather.longitude,
    days: recommendations,
  };
};
function initialiseRecommendation(options: RecommendationOptions): Recommendation {
  return {
    ...options,
    activities: {
      Skiing: {
        isRecommended: true,
        reasons: [],
      },
      Surfing: {
        isRecommended: true,
        reasons: [],
      },
      'Outdoor sightseeing': {
        isRecommended: true,
        reasons: [],
      },
      'Indoor sightseeing': {
        isRecommended: true,
        reasons: ['Recommended in any weather'],
      },
    },
  };
}
