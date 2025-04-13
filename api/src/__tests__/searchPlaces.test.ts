import { searchPlaces } from '../datasources/googlePlaces';
describe('searchPlaces', () => {
  it('should return a location', () => {
    searchPlaces('New York').then((response) => {
      expect(response).toBeDefined();
      expect(response.length).toBeGreaterThan(0);
      expect(response[0].displayName.text).toContain('New York');
    });
  });
});
