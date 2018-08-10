<template src='../templates/game.html' />

<script>
import ButtonRow from './button-row'
import ScoreBoard from './score-board'
import GameBoard from './game-board'

export default {
  name: 'Game',
  data: () => {
    return {}
  },
  components: {
    ButtonRow,
    ScoreBoard,
    GameBoard
  },
  created () {}
}
</script>
