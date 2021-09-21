<template>
  <article>
    <section class="content">
      <div class="container-fluid p-4">
        <b-row>
          <Gallery />
        </b-row>
        <b-row class="mt-5">
          <MoviesContainer />
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>




import Gallery from "@/components/User/Gallery";
import MoviesContainer from '@/components/User/MoviesContainer' 
export default {
  components: {
    Gallery,
    MoviesContainer
  },

  name: "Home",
};
</script>

<style>
.d {
  text-decoration: none;
  color: white;
  text-shadow: 0 0 0.2rem rgba(0, 0, 0, 0.8);
}
</style>