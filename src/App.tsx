import React from 'react';
import { Store } from './Store';
import { Link } from '@reach/router';

export default function App(props: any): JSX.Element {
  const { state } = React.useContext(Store);

  const zeroOrOneFavorite = (
    <Link to='/faves'>Favorite: {state.favorites.length}</Link>
  );

  const moreThanOneFavorites = (
    <Link to='/faves'>Favorites: {state.favorites.length}</Link>
  );

  // console.log(state);
  return (
    <React.Fragment>
      <header className='header'>
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick your favorite episode!</p>
        </div>
        <div>
          <Link to='/'>Home</Link>
          {state.favorites.length < 2
            ? zeroOrOneFavorite
            : moreThanOneFavorites}
        </div>
      </header>
      {props.children}
    </React.Fragment>
  );
}
