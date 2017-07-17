import _ from 'lodash';
import reselect from 'reselect';
import Immutable from 'seamless-immutable';
import { ImmutableObject } from 'seamless-immutable';

const { createSelector } = reselect;

const initialState = Immutable({
  all: undefined,
  selectedId: undefined
});

interface Restaurant {
  id: number;
  name: string;
}

interface Dictionary<T> {
  [index: string]: T;
}

interface RestaurantState {
  all: Dictionary<Restaurant>;
  selectedId: number;
}

interface RootState {
  restaurants: RestaurantState;
}

interface ListAction {
  type: 'RESTAURANTS:TRANSFORM_LIST';
  response: Restaurant[];
}

interface DetailAction {
  type: 'RESTAURANTS:TRANSFORM_DETAIL';
  number: number;
}

type Action = ListAction | DetailAction;
type ImmutableState<T> = ImmutableObject<T> & T;

export default ((state: ImmutableState<RestaurantState>, action: Action): ImmutableState<RestaurantState> => {
  switch(action.type) {
    case 'RESTAURANTS:TRANSFORM_DETAIL': {
      const number = action.number;
      return state.merge({selectedId: number + 1});
      // return Object.assign({}, state, {selectedId: number + 1});
    }
    case 'RESTAURANTS:TRANSFORM_LIST': {
      const restaurants = _.keyBy(action.response, (restaurant: Restaurant) => restaurant.id);
      const merged = _.extend({}, state.all, restaurants);
      return state.merge({all: merged});
      // return Object.assign({}, state, {all: merged});
    }
    default: {
      return state || initialState;
    }
  }
});

const all = (state: RootState) => state.restaurants.all;
const selectedId = (state: RootState) => state.restaurants.selectedId;

export const getRestaurants = createSelector(
  all,
  (all: Dictionary<Restaurant>) => all
);

export const getSelectedRestaurant = createSelector(
  all,
  selectedId,
  (all: Dictionary<Restaurant>, selectedId: number) => _.get(all, selectedId)
);
