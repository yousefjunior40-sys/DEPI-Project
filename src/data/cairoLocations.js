// ─────────────────────────────────────────────────────────────────────────────
// TruckSpot — Cairo Location Data & Distance Utilities
// ─────────────────────────────────────────────────────────────────────────────

export const CAIRO_AREAS = [{
  id: 'nasr-city',
  name: 'Nasr City',
  governorate: 'Cairo',
  coordinates: {
    lat: 30.0669,
    lng: 31.3429
  }
}, {
  id: 'heliopolis',
  name: 'Heliopolis',
  governorate: 'Cairo',
  coordinates: {
    lat: 30.0906,
    lng: 31.3190
  }
}, {
  id: 'maadi',
  name: 'Maadi',
  governorate: 'Cairo',
  coordinates: {
    lat: 29.9602,
    lng: 31.2569
  }
}, {
  id: 'new-cairo',
  name: 'New Cairo',
  governorate: 'Cairo',
  coordinates: {
    lat: 30.0131,
    lng: 31.4744
  }
}, {
  id: 'zamalek',
  name: 'Zamalek',
  governorate: 'Cairo',
  coordinates: {
    lat: 30.0578,
    lng: 31.2230
  }
}, {
  id: 'dokki',
  name: 'Dokki',
  governorate: 'Cairo',
  coordinates: {
    lat: 30.0411,
    lng: 31.2108
  }
}, {
  id: 'mohandessin',
  name: 'Mohandessin',
  governorate: 'Cairo',
  coordinates: {
    lat: 30.0548,
    lng: 31.2027
  }
}, {
  id: 'shubra',
  name: 'Shubra',
  governorate: 'Cairo',
  coordinates: {
    lat: 30.1020,
    lng: 31.2420
  }
}, {
  id: 'el-rehab',
  name: 'El Rehab',
  governorate: 'Cairo',
  coordinates: {
    lat: 30.0568,
    lng: 31.4985
  }
}, {
  id: 'sheikh-zayed',
  name: 'Sheikh Zayed',
  governorate: 'Giza',
  coordinates: {
    lat: 30.0736,
    lng: 30.9619
  }
}, {
  id: '6th-october',
  name: '6th of October',
  governorate: 'Giza',
  coordinates: {
    lat: 29.9607,
    lng: 30.9295
  }
}];

/**
 * Haversine formula — returns distance in kilometers.
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
function toRad(deg) {
  return deg * Math.PI / 180;
}

/**
 * Returns a display string like "1.2 km" or "800 m".
 */
export function formatDistance(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

/**
 * Get area by id.
 */
export function getArea(id) {
  return CAIRO_AREAS.find(a => a.id === id);
}