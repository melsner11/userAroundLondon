import * as express from 'express';
import * as _ from 'lodash';
import * as fetchImport from 'isomorphic-unfetch'
import {json} from 'body-parser';
import { userWithinMilesOfCity } from './service/user';

const fetch = (fetchImport.default || fetchImport) as typeof fetchImport.default

const app = express();
const port = 3000

app.use(json());


app.get( '/', ( req, res ) => {
  res.send( '<a href="/api/city/London">Users in or 50 miles around London<a/>' )
} )


app.get( '/api/city/:city/', async ( req, res, next ) => {
  try {
    const resUsers = await fetch( 'https://dwp-techtest.herokuapp.com/users' )
    const resUsersCity = await fetch( "https://dwp-techtest.herokuapp.com/city/" + req.params.city + "/users" );

    const jsonUsers = await resUsers.json()
    const jsonUsersCity = await resUsersCity.json()

    const userWithin50MilesOfCity = userWithinMilesOfCity( jsonUsers, req.params.city, 50 );

    const usersMerged = userWithin50MilesOfCity.concat( jsonUsersCity );
    const usersMergedUniq = _.uniqBy( usersMerged, getUserId );
    res.json( usersMergedUniq );
  } catch ( e ) {
    next( e )
  }
} )

app.listen( port, () => {
   console.log( `Example app listening at http://localhost:${port}` )
} )

function getUserId( user) {
  return user.id;
}

export default app;