import { makeRecommendation } from '../util/makeRecommendations';
describe('makeRecommendation', () => {
  it('should return a recommendation object with the correct properties', () => {
    const result = makeRecommendation({
      temperature: -5,
      windSpeed: 20,
      precipitationProbability: 54,
      date: '2023-10-01',
    });

    expect(result).toEqual({
      activities: {
        'Indoor sightseeing': {
          isRecommended: true,
          reasons: ['Recommended in any weather'],
        },
        'Outdoor sightseeing': {
          isRecommended: false,
          reasons: ['Temperature is too low', 'Chance of rain is high'],
        },
        Skiing: {
          isRecommended: true,
          reasons: ['Weather is suitable'],
        },
        Surfing: {
          isRecommended: false,
          reasons: ['Wind speed is too hight', 'Temperature is too low'],
        },
      },
      date: '2023-10-01',
      precipitationProbability: 54,
      temperature: -5,
      windSpeed: 20,
    });
  });

  it('should recommend surfing when wind is low and temperature is high enough', () => {
    const result = makeRecommendation({
      temperature: 10,
      windSpeed: 5,
      precipitationProbability: 10,
      date: '2023-10-01',
    });

    expect(result.activities.Surfing).toEqual({
      isRecommended: true,
      reasons: ['Weather is suitable'],
    });
  });

  it('should not recommend skiing when temperature is not low enough', () => {
    const result = makeRecommendation({
      temperature: 10,
      windSpeed: 5,
      precipitationProbability: 10,
      date: '2023-10-01',
    });

    expect(result.activities.Skiing).toEqual({
      isRecommended: false,
      reasons: ['Temperature is too high'],
    });
  });
});
