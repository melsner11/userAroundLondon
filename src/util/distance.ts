export const distance = function ( from_latitude, from_longitude, to_latitude, to_longitude, miles ) {

  const R = 6371e3; // metres
  const MILESTOMETERS = 1609.34
  const φ1 = from_latitude * Math.PI / 180; // φ, λ in radians
  const φ2 = to_latitude * Math.PI / 180;
  const Δφ = ( to_latitude - from_latitude ) * Math.PI / 180;
  const Δλ = ( to_longitude - from_longitude ) * Math.PI / 180;

  const a = Math.sin( Δφ / 2 ) * Math.sin( Δφ / 2 ) +
    Math.cos( φ1 ) * Math.cos( φ2 ) *
    Math.sin( Δλ / 2 ) * Math.sin( Δλ / 2 );
  const c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) );

  const d = R * c; // in metres

  return d / MILESTOMETERS;
}

export default distance