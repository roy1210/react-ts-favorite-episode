import {IAction, IEpisode, IState} from './interfaces';

export const fetchDataAction = async (dispatch: any) => {
  const URL =
      'http://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dispatch({type: 'FETCH_DATA', payload: dataJSON._embedded.episodes});
};

export const toggleFavAction =
    (state: IState, dispatch: any, episode: IEpisode|any): IAction => {
      // Check if the chooses episode is already exist in state.favorites
      // Won't duplicate add to same episode in state.favorites
      // Will remove from existing state.favorites
      const episodeInFav = state.favorites.includes(episode);
      let dispatchObj = {type: 'ADD_FAV', payload: episode};
      if (episodeInFav) {
        const favWithoutEpisode =
            state.favorites.filter((fav: IEpisode) => fav.id !== episode.id);
        dispatchObj = {type: 'REMOVE_FAV', payload: favWithoutEpisode};
      }
      return dispatch(dispatchObj);
    }