<template src='../templates/game-board.html' />

<script>
import GamePiece from './game-piece'
import { getCoordinates } from '../helpers/calculate';

export default {
  name: 'GameBoard',
  props: {
    width: Number,
    height: Number,
    length: Number
  },
  data: function () {
    return {}
  },
  components: {
    GamePiece
  },
  computed: {
    coordinates() {
      return this.$store.state.coordinates;
    }
  },
  mounted () {
    this.$store.commit( 'setDimensions', {
      width:this.width,
      height:this.height,
      length:this.length
    });
    this.$store.dispatch( 'start' );
  }
}
</script>
