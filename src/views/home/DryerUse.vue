<template>
    <div id="dryerUse">
      <Header></Header>
    </div>
</template>

<script>
  import Header from '../../components/header/Header'
    export default {
        name: "DryerUse",
      components:{
          Header
      }
    }
</script>

<style scoped>
  #dryerUse{
    position: absolute;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to right, #E1491E 0%, #CC3433 100%);
  }
</style>
