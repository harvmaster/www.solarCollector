<template>
  <div class="battery"></div>
</template>

<style scoped lang="scss">
.battery {
  position: relative;
  margin: 0 auto;
  margin-top: 20%;
  width: 200px;
  border: 10px solid $green-5;
  height: 100px;
  border-radius: 15px;
}

.battery:before {
  content: "";
  position: absolute;
  top: 6px;
  left: 6px;
  height: 88px;
  background-color: $green-5;
  border-radius: 5px;
  animation: full 5s linear infinite;
}

.battery:after {
  content: "";
  position: absolute;
  right: -30px;
  top: 28px;
  width: 15px;
  height: 50px;
  background-color: $green-5;
  border-bottom-right-radius: 90px;
  border-top-right-radius: 90px;
}

@keyframes full {
  0% {
    width: 0%;
  }
  25% {
    width: 24%;
  }
  50% {
    width: 48%;
  }
  75% {
    width: 72%;
  }
  100% {
    width: 96%;
  }
}

</style>

<script setup lang="ts">

</script>