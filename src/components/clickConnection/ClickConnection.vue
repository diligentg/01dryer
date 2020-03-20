<template>
  <div class="shell">
    <button class="clickCon">
      <!--    <span class="connection">-->
      点击使用
      <!--    </span>-->
    </button>
  </div>
</template>

<script>

    export default {
        name: "ClickConnection"
    }
</script>

<style scoped>
  .shell{
    text-align: center;
    position: relative;
  }
  .clickCon{
    position: relative;
    height: 11em;
    width: 11em;
    background-image: linear-gradient(to right, #CC5D33 0%, #CC3533 100%);
    font-size: 1.5em;
    border: 5px solid white;
    outline: none;
    top: 4em;
    font-family: inherit;
    color: white;
    border-radius: 50%;
  }
</style>
