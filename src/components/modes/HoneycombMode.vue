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
  }
}
</script>

<style scoped>

</style>
