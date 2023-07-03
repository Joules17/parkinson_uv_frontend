// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import gamesListSlice from './gamesListSlice';
import endGame from './endGameSlice'

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, gamesList: gamesListSlice, endGame});

export default reducers;
