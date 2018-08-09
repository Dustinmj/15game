<template src='../templates/button-row.html' />

<script>
  export default {
    name: 'ButtonRow',
    methods: {
      shuffle: () => {
        this.$store.commit('shuffle');
      }
    }
  }
</script>
