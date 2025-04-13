export interface WeatherDataType {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface Daily {
  time: string[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  sunshine_duration: number[];
  precipitation_hours: number[];
  uv_index_max: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  cloud_cover_mean: number[];
}

export interface DailyUnits {
  time: string;
  precipitation_probability_max: string;
  wind_speed_10m_max: string;
  sunshine_duration: string;
  precipitation_hours: string;
  uv_index_max: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  cloud_cover_mean: string;
}
