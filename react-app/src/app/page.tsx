'use client';
import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { RecommendationResponse } from './types/recommendations';
import { PlaceType } from './types/PlaceType';

export default function Home() {
  const [textQuery, setTextQuery] = useState<string>('');
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [location, setLocation] = useState<{
    longitude: number;
    latitude: number;
    address: string;
  } | null>(null);
  const [recommendation, setRecommendation] = useState<RecommendationResponse | null>(null);
  const setLocationFromPlace = (place: PlaceType) => {
    if (place.location) {
      setLocation({
        longitude: place.location.longitude,
        latitude: place.location.latitude,
        address: place.displayName.text,
      });
    }
  };

  const resetPage = () => {
    setPlaces([]);
    setError(null);
    setLocation(null);
    setRecommendation(null);
  };

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear the previous timeout
    }

    const timeout = setTimeout(() => {
      const fetchData = async () => {
        if (textQuery.trim() === '') return; // Skip if input is empty
        resetPage();

        try {
          const response = await fetch(
            `http://localhost:3005/location?textQuery=${encodeURIComponent(textQuery)}`,
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const data = await response.json();

          setPlaces(data || []);
        } catch (err: unknown) {
          resetPage();
          console.error('Error fetching data:', err);
          setError((err as Error)?.message ?? 'An error occurred while fetching data');
        }
      };

      fetchData();
      setDebounceTimeout(null);
    }, 500); // 500ms debounce timeout

    if (textQuery.trim() === '') {
      resetPage();
    } else {
      setDebounceTimeout(timeout);
    }
    return () => {
      if (timeout) clearTimeout(timeout); // Cleanup timeout on unmount or textQuery change
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textQuery, setLocation]); // search locations when `textQuery` changes, using debounce

  useEffect(() => {
    if (!places?.length) {
      setLocation(null); // Clear location if no places found
    } else if (places.length == 1) {
      setLocationFromPlace(places[0]); // Set location to the first result
    }
  }, [places]);

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (!location) {
        setRecommendation(null); // Clear recommendation if location is not available
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3005/recommendation?longitude=${location?.longitude}&latitude=${location?.latitude}`,
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setRecommendation(data);
      } catch (err: unknown) {
        setRecommendation(null);
        console.error('Error fetching recommendation:', err);
        setError((err as Error)?.message ?? 'An error occurred while fetching recommendation');
      }
    };

    fetchRecommendation();
  }, [location]); // Fetch recommendation when location changes

  return (
    <div className={styles.page}>
      <h1>Weather Recommendation</h1>
      <div className={styles.container}>
        <span>
          <label>
            Search{' '}
            <input
              type="text"
              name="placeSearch"
              onChange={(e) => setTextQuery(e.target.value)}
              value={textQuery}
            />
          </label>
        </span>

        <div className={styles.locationResults}>
          {debounceTimeout || !textQuery ? (
            <p>Type to search for places...</p>
          ) : error ? (
            <p className={styles.error}>Error: {error}</p>
          ) : places?.length > 1 ? (
            <div>
              <h3>Select a place</h3>
              {places.map((place, index) => (
                <div key={index}>
                  <a onClick={() => setLocationFromPlace(place)}>{place.formattedAddress}</a>
                </div>
              ))}
            </div>
          ) : (
            places?.length === 0 && <p>place not found</p>
          )}
        </div>
        {location && (
          <div className={styles.recommendation}>
            {recommendation ? (
              <>
                <br />
                <h2>Showing results for {location.address}</h2>
                <table className={styles.recommendation}>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Temperature</th>
                      <th>Wind Speed</th>
                      <th>Rain chance</th>
                      {Object.entries(recommendation.days[0].activities).map(
                        ([activityType], index) => (
                          <th key={index}>{activityType}</th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {recommendation.days.map((day, index) => (
                      <tr key={index}>
                        <td>{new Date(day.date).toDateString()} </td>
                        <td>{day.temperature}°C</td>
                        <td>{day.windSpeed} km/h</td>
                        <td> {day.precipitationProbability} %</td>
                        {Object.entries(day.activities).map(([, activity], index) => (
                          <td key={index}>
                            {activity.reasons.map((reason, index) => (
                              <span key={index}>
                                {reason}
                                <br />
                              </span>
                            ))}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <p>No recommendation available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
