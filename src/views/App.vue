<template>
  <div id="app">
    Hello, {{ nickName }}!
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      nickName: 'richard'
    }
  }
}
</script>
