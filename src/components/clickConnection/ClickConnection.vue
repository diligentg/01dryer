<template>
  <div id="clickCon">
    <div class="connection">
      点击使用
    </div>
  </div>
</template>

<script>

    export default {
        name: "ClickConnection"
    }
</script>

<style scoped>
  #clickCon{
    position: absolute;
    height: 16em;
    width: 16em;
    background-image: linear-gradient(to right, #CC5D33 0%, #CC3533 100%);
    top: 31em;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
  #clickCon:active{
    position: absolute;
    height: 14em;
    width: 14em;
    background-image: linear-gradient(to right, #CC5D33 0%, #CC3533 100%);
    top: 31em;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    transition:all .2s ease;
  }
.connection{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: white;
}
</style>
