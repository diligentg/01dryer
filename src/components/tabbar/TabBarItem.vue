<template>
  <div id="bar-item" @click="itemClick">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "TabBarItem",
      props:{
        path:String
      },
      methods:{
        itemClick(){
            this.$router.replace(this.path)
        }
      }
    }
</script>

<style scoped>
  #bar-item{
    position: relative;
    height: 49px;
    font-size: 18px;
    border-bottom:1px solid #cecece;
  }

</style>
