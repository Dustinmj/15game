<template src='../templates/game-board.html' />

<script>
  import GamePiece from './game-piece';

  export default {
    name: 'GameBoard',
    data: () => {
      return {
        positions:this.$store.positions
      }
    },
    components:{
      GamePiece
    }
  }
</script>
