<template src='./templates/app.html' />

<script>
import Game from './components/game.vue'

export default {
  name: 'app',
  components: {
    Game
  }
}
</script>

<style lang='sass'>
  @import './assets/css/normalize.css';
  @import './assets/css/app.scss';
  @import './assets/css/fifteen-game.scss';
</style>
