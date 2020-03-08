<template>
    <div>
      <button class="saveBtn">保存</button>
    </div>
</template>

<script>
    export default {
        name: "SaveBtn"
    }
</script>

<style scoped>
.saveBtn{
  border-radius: 28px;
  color: #ffffff;
  font-size: 18px;
  background: #FF5722;
  padding: 12px 30px 12px 30px;
  border: none
}
.saveBtn:active{
  border-radius: 28px;
  color: #ffffff;
  font-size: 18px;
  background: #ffa076;
  padding: 12px 30px 12px 30px;
  border: none;
}
.saveBtn:disabled{
  border-radius: 28px;
  color: #ffffff;
  font-size: 18px;
  background: #ffa076;
  padding: 12px 30px 12px 30px;
  border: none;
}
</style>
