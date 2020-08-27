import {distance}  from '../util/distance'
import allCities from './city'

export const userWithinMilesOfCity = function ( users, city,  miles )  {
  const result = [];
  const cities = allCities();

  if ( cities[ city ] != null ) {
    var latitude = cities[ city ].latitude;
    var longitude = cities[ city ].longitude;

    users.map( ( user) => {
      if ( distance( latitude, longitude, user.latitude, user.longitude, miles ) <= miles ) {
        result.push( user );
      }
    } );
  }

  return result;
}

export default userWithinMilesOfCity;