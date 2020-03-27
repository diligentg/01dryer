<template>
    <div>
      <span class="backHome-icon" @click="backHomeIcon">&lt;</span>
    </div>
</template>

<script>
    export default {
        name: "BackHomeIcon",
      methods:{
        backHomeIcon(){
          this.$router.replace('/home')
        }
      }
    }
</script>

<style scoped>
  .backHome-icon{
    position: absolute;
    font-weight: bold;
    color: white;
    left: 95%;
    top: 70%;
    transform: translate(-50%, -50%);
  }
</style>
