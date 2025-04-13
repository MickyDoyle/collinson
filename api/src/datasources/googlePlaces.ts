import { googleSecret } from '../util/secrets';

const placesApiUrl = 'https://places.googleapis.com/v1/places:searchText';

interface PlaceType {
  displayName: { text: string };
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  types: string[];
}

export const searchPlaces = async (textQuery: string): Promise<PlaceType[]> => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('X-Goog-Api-Key', googleSecret.apiKey);
  headers.append(
    'X-Goog-FieldMask',
    'places.displayName,places.formattedAddress,places.priceLevel,places.location,places.types',
  );

  const body = JSON.stringify({
    textQuery,
  });

  const response = await fetch(placesApiUrl, {
    method: 'POST',
    headers,
    body,
  });
  if (!response.ok) {
    throw new Error(`HTTP error getting google places data! status: ${response.status}`);
  }
  const data = await response.json();
  return data.places as PlaceType[];
};
