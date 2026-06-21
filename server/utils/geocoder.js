// Native fetch is used for geocoding

// Approximate coordinates for Nigerian State Capitals / major states
const STATE_COORDINATES = {
  "abia": { lat: 5.5267, lng: 7.4898 },
  "adamawa": { lat: 9.2035, lng: 12.4954 },
  "akwa ibom": { lat: 5.0389, lng: 7.9092 },
  "anambra": { lat: 6.2105, lng: 7.0736 },
  "bauchi": { lat: 10.3103, lng: 9.8439 },
  "bayelsa": { lat: 4.9272, lng: 6.2649 },
  "benue": { lat: 7.7337, lng: 8.5214 },
  "borno": { lat: 11.8311, lng: 13.1510 },
  "cross river": { lat: 4.9757, lng: 8.3417 },
  "delta": { lat: 6.1972, lng: 6.7327 },
  "ebonyi": { lat: 6.3249, lng: 8.1137 },
  "edo": { lat: 6.3350, lng: 5.6037 },
  "ekiti": { lat: 7.6233, lng: 5.2201 },
  "enugu": { lat: 6.4584, lng: 7.5464 },
  "fct": { lat: 9.0765, lng: 7.3986 },
  "gombe": { lat: 10.2897, lng: 11.1673 },
  "imo": { lat: 5.4854, lng: 7.0357 },
  "jigawa": { lat: 11.7589, lng: 9.3381 },
  "kaduna": { lat: 10.5105, lng: 7.4165 },
  "kano": { lat: 12.0022, lng: 8.5920 },
  "katsina": { lat: 12.9856, lng: 7.6171 },
  "kebbi": { lat: 12.4504, lng: 4.1975 },
  "kogi": { lat: 7.7981, lng: 6.7317 },
  "kwara": { lat: 8.4799, lng: 4.5418 },
  "lagos": { lat: 6.6018, lng: 3.3515 },
  "nasarawa": { lat: 8.4904, lng: 8.5147 },
  "niger": { lat: 9.5836, lng: 6.5463 },
  "ogun": { lat: 7.1475, lng: 3.3619 },
  "ondo": { lat: 7.2571, lng: 5.2058 },
  "osun": { lat: 7.7713, lng: 4.5624 },
  "oyo": { lat: 7.3775, lng: 3.9470 },
  "plateau": { lat: 9.8965, lng: 8.8583 },
  "rivers": { lat: 4.8156, lng: 7.0498 },
  "sokoto": { lat: 13.0627, lng: 5.2314 },
  "taraba": { lat: 8.8929, lng: 11.3789 },
  "yobe": { lat: 11.7489, lng: 11.9608 },
  "zamfara": { lat: 12.1629, lng: 6.6745 },
  "abuja": { lat: 9.0765, lng: 7.3986 },
  "ibadan": { lat: 7.3775, lng: 3.9470 }
};

// Common city overrides
const CITY_COORDINATES = {
  "ikeja": { lat: 6.6018, lng: 3.3515 },
  "bodija": { lat: 7.3775, lng: 3.9470 },
  "garki": { lat: 9.0765, lng: 7.3986 },
  "lekki": { lat: 6.4281, lng: 3.4219 },
  "vi": { lat: 6.4281, lng: 3.4219 },
  "victoria island": { lat: 6.4281, lng: 3.4219 },
  "yaba": { lat: 6.5095, lng: 3.3711 },
  "surulere": { lat: 6.5000, lng: 3.3500 },
  "uyo": { lat: 5.0389, lng: 7.9092 },
  "enugu": { lat: 6.4584, lng: 7.5464 },
  "port harcourt": { lat: 4.8156, lng: 7.0498 },
  "kano": { lat: 12.0022, lng: 8.5920 },
  "kaduna": { lat: 10.5105, lng: 7.4165 },
  "jos": { lat: 9.8965, lng: 8.8583 },
  "benin": { lat: 6.3350, lng: 5.6037 },
  "benin city": { lat: 6.3350, lng: 5.6037 },
  "abeokuta": { lat: 7.1475, lng: 3.3619 },
  "akure": { lat: 7.2571, lng: 5.2058 },
  "ilorin": { lat: 8.4799, lng: 4.5418 },
  "calabar": { lat: 4.9757, lng: 8.3417 },
  "minna": { lat: 9.5836, lng: 6.5463 },
  "asaba": { lat: 6.1972, lng: 6.7327 },
  "warri": { lat: 5.5167, lng: 5.7500 },
  "onitsha": { lat: 6.1500, lng: 6.7833 }
};

const getCoordinates = async (city, state) => {
  const normCity = (city || '').trim().toLowerCase();
  const normState = (state || '').trim().toLowerCase();

  // 1. Try Nominatim Geocoding first (needs User-Agent and timeout safety)
  if (normCity || normState) {
    try {
      const query = encodeURIComponent([city, state, 'Nigeria'].filter(Boolean).join(', '));
      const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'CraftConnect/1.0 (antigravity@gemini.ai)'
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          return {
            lat: parseFloat(lat),
            lng: parseFloat(lon)
          };
        }
      }
    } catch (err) {
      console.warn('Nominatim geocoding failed or timed out, using fallback.', err.message);
    }
  }

  // 2. Fallback to static city dictionary
  if (normCity && CITY_COORDINATES[normCity]) {
    return CITY_COORDINATES[normCity];
  }

  // 3. Fallback to static state dictionary
  if (normState && STATE_COORDINATES[normState]) {
    return STATE_COORDINATES[normState];
  }

  // 4. Ultimate fallback (Lagos Center)
  return { lat: 6.5244, lng: 3.3792 };
};

module.exports = { getCoordinates };
