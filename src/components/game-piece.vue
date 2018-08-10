<template src='../templates/game-piece.html' />

<script>
  export default {
    name: 'GamePiece',
    props: {
      identifier: Number,
      left: Number,
      top: Number
    },
    data: function () {
      return {}
    },
    methods: {
      move() {
        this.$store.dispatch( 'move', this.identifier );
      }
    },
    computed: {
      style() {
        return {
          top: this.top + 'px',
          left: this.left + 'px'
        }
      },
      classname() {
        if( this.identifier === -1 ) return 'blank';
        return this.identifier % 2 === 0 ? 'even' : 'odd';
      }
    }
  }
</script>
