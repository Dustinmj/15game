<template src='./templates/app.html' />

<script>
import Game from './components/game.vue'
import config from './config';

export default {
  name: 'app',
  components: {
    Game
  },

  data: () => {
    return {
      borderClass: 'play'
    }
  },

  watch: {
    won: function( val ) {
      if( val ) {
        let color = 0;
        const interval = setInterval( () => {
          this.borderClass = config.WIN_COLORS[ color++ % config.WIN_COLORS.length ];
        }, 45 );
        setTimeout( () => {
          clearInterval( interval );
          this.borderClass = 'won';
        }, 2500 );
      } else {
        this.borderClass = 'play';
      }
    },
    shuffle: function( val ) {
      if( val ) this.borderClass = 'shuffle';
      else this.borderClass = 'play';
    }
  },

  computed: {
    won: function() {
      return this.$store.state.won;
    },
    shuffle: function() {
      return this.$store.state.searching;
    }
  }
}
</script>

<style lang='sass'>
  @import './assets/css/normalize.css';
  @import './assets/css/app.scss';
  @import './assets/css/fifteen-game.scss';
</style>
