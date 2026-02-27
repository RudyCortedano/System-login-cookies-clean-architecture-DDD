<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <main class="verify__global">
    <main className="verify__global">
      <div className="verify__init">
        <img
          className="verify__logo"
          src="https://cdn-icons-png.flaticon.com/512/6364/6364343.png"
          alt=""
        />
        <h1 className="verify__letter">Usuario Verificado</h1>
        <span className="verify__letter"
          >Si desea empezar
          <RouterLink to="/auth/login">Inicie Sesión</RouterLink> acá</span
        >
        <br />
        <br />
        <small className="verify__letter">
          Nota: esta ruta se eliminara al salir de ella
        </small>
      </div>
    </main>
    <ThemeVerifyUser />
  </main>
</template>

<style scoped>
/* --------------------------------- */
/* --------------------------------- */
/* Animación - usuario verificado */
@keyframes verifyTheme {
  0% {
    --c-0: hsla(221.24999999999994, 100%, 96%, 1);
    --s-start-0: 6.018788142925232%;
    --s-end-0: 35%;
    --x-0: 59%;
    --y-0: 16%;
    --c-1: hsla(203.12500000000003, 55%, 65%, 1);
    --s-start-1: 3.315649867374005%;
    --s-end-1: 6.33664952285726%;
    --y-1: 7%;
    --x-1: 92%;
    --c-2: hsla(201.47727272727275, 100%, 34%, 1);
    --y-2: 75%;
    --x-2: 78%;
    --s-start-2: 0%;
    --s-end-2: 7%;
    --x-3: 59%;
    --s-start-3: 0%;
    --s-end-3: 68%;
    --y-3: 59%;
    --c-3: hsla(200.88888888888889, 100%, 26%, 1);
    --x-4: 7%;
    --c-4: hsla(199.3548387096774, 100%, 18%, 1);
    --y-4: 86%;
    --s-start-4: 3%;
    --s-end-4: 36%;
  }

  100% {
    --c-0: hsla(205.71428571428575, 58%, 81%, 1);
    --s-start-0: 0%;
    --s-end-0: 11.238503048843667%;
    --x-0: 63%;
    --y-0: 23%;
    --c-1: hsla(202.05882352941177, 53%, 50%, 1);
    --s-start-1: 0%;
    --s-end-1: 36%;
    --y-1: 14%;
    --x-1: 89%;
    --c-2: hsla(200.90322580645162, 100%, 30%, 1);
    --y-2: 90%;
    --x-2: 92%;
    --s-start-2: 1%;
    --s-end-2: 28%;
    --x-3: 2%;
    --s-start-3: 0%;
    --s-end-3: 36.852784336403765%;
    --y-3: 9%;
    --c-3: hsla(200, 100%, 22%, 1);
    --x-4: 13%;
    --c-4: hsla(197.49999999999997, 100%, 14%, 1);
    --y-4: 19%;
    --s-start-4: 12.198718286003295%;
    --s-end-4: 40%;
  }
}

@property --c-0 {
  syntax: "<color>";
  inherits: false;
  initial-value: hsla(221.24999999999994, 100%, 96%, 1);
}

@property --s-start-0 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 6.018788142925232%;
}

@property --s-end-0 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 35%;
}

@property --x-0 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 59%;
}

@property --y-0 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 16%;
}

@property --c-1 {
  syntax: "<color>";
  inherits: false;
  initial-value: hsla(203.12500000000003, 55%, 65%, 1);
}

@property --s-start-1 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 3.315649867374005%;
}

@property --s-end-1 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 6.33664952285726%;
}

@property --y-1 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 7%;
}

@property --x-1 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 92%;
}

@property --c-2 {
  syntax: "<color>";
  inherits: false;
  initial-value: hsla(201.47727272727275, 100%, 34%, 1);
}

@property --y-2 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 75%;
}

@property --x-2 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 78%;
}

@property --s-start-2 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}

@property --s-end-2 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 7%;
}

@property --x-3 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 59%;
}

@property --s-start-3 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}

@property --s-end-3 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 68%;
}

@property --y-3 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 59%;
}

@property --c-3 {
  syntax: "<color>";
  inherits: false;
  initial-value: hsla(200.88888888888889, 100%, 26%, 1);
}

@property --x-4 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 7%;
}

@property --c-4 {
  syntax: "<color>";
  inherits: false;
  initial-value: hsla(199.3548387096774, 100%, 18%, 1);
}

@property --y-4 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 86%;
}

@property --s-start-4 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 3%;
}

@property --s-end-4 {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 36%;
}

.verify__global {
  --c-0: hsla(221.24999999999994, 100%, 96%, 1);
  --x-0: 59%;
  --y-0: 16%;
  --c-1: hsla(203.12500000000003, 55%, 65%, 1);
  --y-1: 7%;
  --x-1: 92%;
  --c-2: hsla(201.47727272727275, 100%, 34%, 1);
  --y-2: 75%;
  --x-2: 78%;
  --x-3: 59%;
  --y-3: 59%;
  --c-3: hsla(200.88888888888889, 100%, 26%, 1);
  --x-4: 7%;
  --c-4: hsla(199.3548387096774, 100%, 18%, 1);
  --y-4: 86%;
  background-color: hsla(196.15384615384613, 100%, 10%, 1);
  background-image:
    radial-gradient(
      circle at var(--x-0) var(--y-0),
      var(--c-0) var(--s-start-0),
      transparent var(--s-end-0)
    ),
    radial-gradient(
      circle at var(--x-1) var(--y-1),
      var(--c-1) var(--s-start-1),
      transparent var(--s-end-1)
    ),
    radial-gradient(
      circle at var(--x-2) var(--y-2),
      var(--c-2) var(--s-start-2),
      transparent var(--s-end-2)
    ),
    radial-gradient(
      circle at var(--x-3) var(--y-3),
      var(--c-3) var(--s-start-3),
      transparent var(--s-end-3)
    ),
    radial-gradient(
      circle at var(--x-4) var(--y-4),
      var(--c-4) var(--s-start-4),
      transparent var(--s-end-4)
    );
  animation: verifyTheme 10s linear infinite alternate;
  background-blend-mode: normal, normal, normal, normal, normal;
}
/* --------------------------------- */
/* --------------------------------- */
/* Estilos generales */
.verify__global {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 0 0.5rem;
}
.verify__init {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  color: #597aa7;
  font-weight: bold;
  box-shadow:
    -3px -3px 8px #fff,
    3px 3px 5px rgba(94, 104, 121, 0.7);
  border: 5px;
  padding: 1rem 3rem;
  text-align: center;
  border-radius: 10px;
}
.verify__logo {
  width: 200px;
  height: 200px;
}
.verify__letter {
  color: white;
}
.verify__404 {
  font-size: 3rem;
}
.verify__notFound {
  font-size: 1.2rem;
}
/* --------------------------------- */
/* --------------------------------- */
</style>
