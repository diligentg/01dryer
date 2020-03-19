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
    top: 25em;
    left: 4.25em;
    /*top: 60%;*/
    /*left: 15.7%;*/
    /*transform: translate(-50%, -50%);*/
    border-radius: 50%;
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
