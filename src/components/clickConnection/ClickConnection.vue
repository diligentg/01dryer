<template>
    <div class="clickConnection">
      <button class="clickCon">
        点击使用
      </button>
    </div>
</template>

<script>

    export default {
        name: "ClickConnection"
    }
</script>

<style scoped>
  .clickConnection{
    position: absolute;
    text-align: center;
    width: 100%;
  }
  .clickCon{
    position: relative;
    height: 11em;
    width: 11em;
    background-image: linear-gradient(to right, #CC5D33 0%, #CC3533 100%);
    font-size: 1.5em;
    border: 4px solid white;
    outline: none;
    top: 4em;
    font-family: inherit;
    color: white;
    border-radius: 50%;
  }
</style>
