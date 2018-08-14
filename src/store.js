import Vue from 'vue'
import Vuex from 'vuex'
import {
  adjustCoordinates,
  getCoordinates,
  calculateMove,
  checkPuzzleSolvable,
  moveByDirection } from './helpers/calculate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    moves: 0,
    coordinates: [],
    dimensions: { width:0, height:0, length:0 },
    won: false,
    searching: false
  },
  mutations: {
    setDimensions ( state, dims ) {
      state.dimensions = dims;
    },
    setCoordinates ( state, coordinates ) {
      state.coordinates = coordinates;
    },
    searching ( state, bool ) {
      state.searching = bool;
    },
    addMove ( state ) {
      ++state.moves;
    },
    clearMoves ( state ) {
      state.moves = 0;
    },
    setWon ( state, bool ) {
      state.won = bool;
    }
  },
  actions: {
    shuffle ( { state, commit, dispatch } ) {
      commit( 'searching', true );
      let coords = JSON.parse( JSON.stringify( state.coordinates ) );
      coords.sort(() => {
        return Math.round( Math.random() );
      });
      coords = adjustCoordinates( coords, state.dimensions );
      commit( 'setCoordinates', coords );
      commit( 'clearMoves' );
      commit( 'setWon', false );
      const solvable = checkPuzzleSolvable( coords, state.dimensions );
      if( !solvable ) {
        setTimeout( () => dispatch( 'shuffle' ), 650 );
      } else {
        commit( 'searching', false );
      }
    },
    checkWin( { state, commit } ) {
      const coords = state.coordinates;
      for( let i = 0, z = 1; i < coords.length; i++, z++ ) {
        const label = parseInt( parseInt( coords[ i ].label ) );
        if( label > 0 && label !== z ) {
          return;
        }
      }
      commit( 'setWon', true );
    },
    moveByDirection( { state, commit, dispatch }, direction ) {
      if( state.won ) return;
      const coords = moveByDirection( Vue, state.coordinates.slice(0), direction, state.dimensions );
      dispatch( 'commitMove', coords );
    },
    move ( { state, commit, dispatch }, label ) {
      if( state.won ) return;
      const coords = calculateMove( Vue, state.coordinates.slice(0), label, state.dimensions );
      dispatch( 'commitMove', coords );
    },
    commitMove ( { state, commit, dispatch }, coords ) {
      const delta = JSON.stringify( coords ) !== JSON.stringify( state.coordinates );
      if( delta ) {
        commit( 'setCoordinates', coords );
        commit( 'addMove' );
        dispatch( 'checkWin' );
      }
    },
    start ({ state, commit, dispatch }) {
      commit( 'setCoordinates', getCoordinates( state.dimensions ) );
      commit( 'clearMoves' );
      dispatch( 'shuffle' );
    }
  }
})
