import { WeatherDataType } from '../types/WeatherDataType';
const url = 'https://api.open-meteo.com/v1/forecast';
const additionalParams: string =
  '&daily=precipitation_probability_max,wind_speed_10m_max,sunshine_duration,precipitation_hours,uv_index_max,temperature_2m_max,temperature_2m_min,cloud_cover_mean&temporal_resolution=hourly_6&format=json&timeformat=iso8601';

export const getWeather = async (location: {
  latitude: number;
  longitude: number;
}): Promise<WeatherDataType> => {
  try {
    const response = await fetch(
      `${url}?latitude=${location.latitude}&longitude=${location.longitude}${additionalParams}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error getting weather  data! status: ${response.status}`);
    }
    const weatherData: WeatherDataType = await response.json();
    return weatherData;
  } catch (error: any) {
    throw new Error(error.message || 'An error occurred while fetching weather data');
  }
};
