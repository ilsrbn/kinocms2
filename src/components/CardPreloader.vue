<template>
  <div class="box">
    <div class="cntainer">
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardPreloader',
}
</script>

<style lang="css" scoped>
.box{
  /*background: #1a237e;*/
  background-color: opacity;
  /*background: linear-gradient(165deg, rgb(250, 250, 250) 0%, rgb(220, 220, 220) 40%, rgb(222, 222, 222) 50%, rgb(220, 220, 220) 60%, rgb(250, 250, 250) 100%);*/
  height: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /*box-shadow: 4px 4px 20px rgba(0,0,0,0.3);*/
}

.cntainer{
  height: 15px;
  width: 105px;
  display: flex;
  position: relative;
}

.circle{
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: rgba(170, 20, 22, 0.8) !important;
  animation: move 500ms linear 0ms infinite;
  margin-right: 30px;
}

.circle:first-child {
  position: absolute;
  top:0;
  left:0;
  animation: grow 500ms linear 0ms infinite;
}

.circle:last-child {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 0;
  animation: grow 500ms linear 0s infinite reverse;
}

@keyframes grow {
  from {transform: scale(0,0); opacity: 0;}
  to {transform: scale(1,1); opacity: 1;}
}

@keyframes move {
  from {transform: translateX(0px)}
  to {transform: translateX(45px)}
}
</style>