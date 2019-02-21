<template>
  <div>
    <input
      v-model.number="message"
    />
    <label>复选框</label>
    <p>{{ typeof message}}</p>
  </div>
</template>

<script>
export default {
  name: 'HoneycombMode',
  data () {
    return {
      message: 123
    }
  },
  created () {
    this.$store.commit('updateMode', {
      mode: 4
    })
  }
}
</script>

<style scoped>

</style>
