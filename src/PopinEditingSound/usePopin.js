import { useReducer, useEffect } from 'react'

const useForceUpdate = () => useReducer(state => !state, false)[1];

const createSharedState = (reducer, initialState) => {
  const subscribers = [];
  let state = initialState;
  const dispatch = (action) => {
    state = reducer(state, action);
    subscribers.forEach(callback => callback());
  };
  const useSharedState = () => {
    const forceUpdate = useForceUpdate();
    useEffect(() => {
      const callback = () => forceUpdate();
      subscribers.push(callback);
      callback(); // in case it's already updated
      const cleanup = () => {
        const index = subscribers.indexOf(callback);
        subscribers.splice(index, 1);
      };
      return cleanup;
    }, []);
    return [state, dispatch];
  };
  return useSharedState;
};

const initialState = { isShowing: false };
const reducer = (state, action) => {
  switch (action.type) {
    case 'toggle': return { ...state, ...{ isShowing: !state.isShowing } };
    default: return state;
  }
};

const usePopin = createSharedState(reducer, initialState);

export default usePopin;