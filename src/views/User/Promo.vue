<template>
  <article>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col cols="12" class="mt-3">
            <h1>{{ promo[locale].title }}</h1>
          </b-col>
          <b-col class="mt-5">
            <b-row>
              <b-col cols="4"
                ><b-img fluid :src="promo[locale].banner"></b-img
              ></b-col>

              <b-col>
                <h4>{{ $t("cinema.description") }}</h4>
                <p>{{ promo[locale].description }}</p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>
import { fetch } from "@/modules/firebase";
export default {
  data: () => ({
    promo: {},
  }),

  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },

  async mounted() {
    this.promo = await fetch(`/promotions/${this.$route.params.id}`);
  },
};
</script>

<style>
</style>