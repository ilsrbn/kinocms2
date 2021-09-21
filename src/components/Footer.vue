<template>
  <b-card bg-variant="dark"
    ><b-card-body class="pb-0">
      <b-row>
        <b-col cols="3">
          <p>Мобильные приложухи</p>
          <br />
          <div class="ccc">
            <b-img
              fluid
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Google_Play_2016_logo.svg/1200px-Google_Play_2016_logo.svg.png"
            ></b-img>
          </div>
          <div class="mt-2 ccc">
            <b-img
              fluid
              src="https://cdn.worldvectorlogo.com/logos/aivalable-on-the-app-store-2.svg"
            ></b-img>
          </div>
        </b-col>
        <b-col cols="4"></b-col>
        <b-col cols="4"></b-col>
      </b-row>
      <b-row class="mt-4"
        ><b-col class="text-center"
          ><small class="text-center">©KinoCMS 2002, All Rights Reserved</small></b-col
        >
      </b-row></b-card-body
    ></b-card
  >
</template>

<script>
export default {};
</script>

<style>
.ccc {
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 100ms ease-in;
}

.ccc:hover {
  opacity: 1;
}
</style>