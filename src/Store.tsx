import React from 'react';

interface IState {
  episode: [];
  favorite: [];
}
const initialState: IState = {
  episode: [],
  favorite: []
};

export const Store = React.createContext<IState>(initialState);

function reducer() {
  // todo
}

export function StoreProvider(props: any): JSX.Element {
  return <Store.Provider value={initialState}>{props.children}</Store.Provider>;
}
