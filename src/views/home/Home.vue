<template>
  <div>
    <Header></Header>
<!--    轮播-->
      <Roll></Roll>
<!--    烘干机连接-->
    <Connection @click.native="clickConnection"></Connection>
  </div>
</template>

<script>
  import Header from '../../components/header/Header'
  import Roll from "../../components/roll/Roll";
  import Connection from '../../components/clickConnection/ClickConnection'
    export default {
        name: "Home",
        components:{
          Roll,
          Header,
          Connection
        },
      methods:{
        clickConnection(){
          this.$router.replace('/dryerUse');
          console.log('123');
        }
      }
    }
</script>

<style scoped>

</style>
