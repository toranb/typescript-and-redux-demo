import { connect } from 'ember-redux';
import { getSelectedRestaurant } from '../reducers/restaurants';

const stateToComputed = state => {
  return {
    restaurant: getSelectedRestaurant(state)
  };
};

export default connect(stateToComputed)();
