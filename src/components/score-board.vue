<template src='../templates/score-board.html' />

<script>
  export default {
    name: 'ScoreBoard',
    data: () => {
      return {
        moves: store.moves
      }
    }
  }
</script>
