<template>
    <div id="dryerUse">
      <Header></Header>
      <div class="inUse">
        <div class="inUseMsg">正在使用中</div>
      </div>
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
  .inUse{
    background-color: white;
    position: relative;
    left: 50%;
    top: 35%;
    transform: translate(-50%, -50%);
    height: 20em;
    width: 20em;
    border-radius: 50%;
    text-align: center;
    vertical-align: center;
  }
  .inUseMsg{
    top: 20%;
    position: relative;
    font-size: 2em;
    font-family: YouYuan;
  }
</style>
