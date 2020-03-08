<template>
  <div>
    <Header></Header>
<!--    轮播-->
      <Roll></Roll>
  </div>
</template>

<script>
  import Header from '../../components/header/Header'
  import Roll from "../../components/roll/Roll";
    export default {
        name: "Home",
        components:{
          Roll,
          Header
        }
    }
</script>

<style scoped>

</style>
