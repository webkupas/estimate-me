<template>
  <div>
      Hey there!
  </div>
</template>


<script>
  export default {
    created () {
      if (!this.$store.getters.user.id) this.$router.push('signin')
    }
  }
</script>