<template>
  <div class="about">
    <div class="content-wrapper" flex="main:center cross:stretch">
      <div class="content" style="width: 100px;">1</div>
      <div class="content" flex-box="1">2</div>
      <div class="content" flex-box="1">3</div>
      <div class="content" flex-box="1">4</div>
      <div class="content" flex-box="2">5</div>
    </div>
  </div>
</template>
<script>
import 'flex.css';
export default {
  
}
</script>
<style lang="css">
  .content-wrapper {
    width: 500px;
    height: 500px;
    border: 1px solid #ccc;
    margin: 0 auto;
  }
  .content {
    width: 50px;
    height: 50px;
    background: #99f;
  }
</style>
