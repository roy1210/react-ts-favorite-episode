import React from 'react';
import { IEpisode, IAction, IEpisodeProps } from './interfaces';
import { Store } from './Store';

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'));

export default function HomePage() {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  const fetchDataAction = async () => {
    const URL =
      'http://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
    const data = await fetch(URL);
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  };

  const toggleFavAction = (episode: IEpisode): IAction => {
    // Check if the chooses episode is already exist in state.favorites
    // Won't duplicate add to same episode in state.favorites
    // Will remove from existing state.favorites
    const episodeInFav = state.favorites.includes(episode);
    let dispatchObj = {
      type: 'ADD_FAV',
      payload: episode
    };
    if (episodeInFav) {
      const favWithoutEpisode = state.favorites.filter(
        (fav: IEpisode) => fav.id !== episode.id
      );
      dispatchObj = {
        type: 'REMOVE_FAV',
        payload: favWithoutEpisode
      };
    }
    return dispatch(dispatchObj);
  };

  const props: IEpisodeProps = {
    episodes: state.episodes,
    toggleFavAction,
    favorites: state.favorites
  };

  return (
    <React.Fragment>
      <React.Suspense fallback={<div>loading...</div>}>
        <section className='episode-layout'>
          <EpisodeList {...props} />
        </section>
      </React.Suspense>
    </React.Fragment>
  );
}
