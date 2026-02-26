<template>
  <div className="box">
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<style scoped>
.box ul li {
  position: fixed;
  width: 35px;
  height: 35px;
  list-style: none;
  opacity: 0;
  background: radial-gradient(#4fcafb, transparent, transparent);
  top: 0;
  left: 10vw;
  animation: animate 15s linear infinite;
  z-index: 1;
}
.box ul li:nth-child(2) {
  left: 37vw;
  animation-delay: 2s;
}
.box ul li:nth-child(3) {
  left: 25vw;
  animation-delay: 4s;
}
.box ul li:nth-child(4) {
  left: 60vw;
  animation-delay: 6s;
}
.box ul li:nth-child(5) {
  left: 75vw;
  animation-delay: 4s;
}
.box ul li:nth-child(6) {
  left: 86vw;
  animation-delay: 7s;
}
.box ul li:nth-child(7) {
  left: 95vw;
  animation-delay: 1s;
}
.box ul li:nth-child(8) {
  left: 15vw;
  animation-delay: 8s;
}
@keyframes animate {
  0% {
    transform: scale(0);
    opacity: 1;
    top: 0;
  }
  100% {
    transform: scale(10);
    opacity: 0;
    top: 100%;
  }
}
</style>
