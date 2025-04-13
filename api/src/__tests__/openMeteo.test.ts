import { getWeather } from '../datasources/openMeteo';
describe('searchPlaces', () => {
  it('should return a weather object', async () => {
    const response = await getWeather({ latitude: 51.5072, longitude: -0.1275861 });
    expect(response).toBeDefined();
    expect(response.daily.time.length).toBeGreaterThan(0);
    expect(response.daily.temperature_2m_max.length).toBeGreaterThan(0);
  });
});
