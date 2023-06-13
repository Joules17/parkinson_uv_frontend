// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import gamesListSlice from './gamesListSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, gamesList: gamesListSlice });

export default reducers;
