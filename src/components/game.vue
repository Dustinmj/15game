<template src='../templates/game.html' />

<script>
import ButtonRow from './button-row'
import ScoreBoard from './score-board'
import GameBoard from './game-board'
import config from '../config'

export default {
  name: 'Game',
  components: {
    ButtonRow,
    ScoreBoard,
    GameBoard
  },
  methods: {
    keyPressed( evt ) {
      const keys = {
        37: config.DIRECTION_LEFT,
        38: config.DIRECTION_UP,
        39: config.DIRECTION_RIGHT,
        40: config.DIRECTION_DOWN
      };
      const pressed = keys[ evt.keyCode || evt.which ];
      if( pressed ) {
        this.$store.dispatch( 'moveByDirection', pressed );
      }
    }
  },
  mounted: function() {
    document.addEventListener( 'keydown', this.keyPressed );
  }
}
</script>
