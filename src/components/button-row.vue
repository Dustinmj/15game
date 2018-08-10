<template src='../templates/button-row.html' />

<script>
export default {
  name: 'ButtonRow',
  methods: {
    shuffle () {
      this.$store.dispatch('shuffle')
    }
  }
}
</script>
