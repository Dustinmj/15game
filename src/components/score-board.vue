<template src='../templates/score-board.html' />

<script>
export default {
  name: 'ScoreBoard',
  computed: {
    won() {
      return this.$store.state.won;
    },
    searching() {
      return this.$store.state.searching;
    },
    moves() {
      return this.$store.state.moves;
    }
  }
}
</script>
