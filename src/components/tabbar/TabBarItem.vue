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
    height: 3em;
    font-size: 1.15em;
    border-bottom:1px solid #cecece;
  }

</style>
