<template>
  <article>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col cols="12">
            <b-img
              fluid
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Sala_de_cine.jpg"
            ></b-img>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col cols="10">
            <h1 class="text-center">{{ $t("contacts") }}</h1>
            <b-row>
              <b-col
                v-for="(contact, index) in contacts[locale].cinemas"
                :key="index"
                cols="12"
              >

                <b-card
                  bg-variant="dark"
                  no-body
                  class="overflow-hidden"
                  style="max-width: 1500px"
                >
                  <b-row no-gutters>
                    <b-col md="6">
                      <b-card-img
                        :src="
                          contact.banner != ''
                            ? contact.banner
                            : 'https://via.placeholder.com/1600x900.png'
                        "
                        alt="Image"
                        class="rounded-0"
                      ></b-card-img>
                    </b-col>
                    <b-col md="6">
                      <b-card-body :title="contact.title">
                        <b-embed
                        type="iframe"
                        aspect="21by9"
                        :src="contact.map">
                        </b-embed>
                        <b-card-text>
                          <p>{{ contact.adress }}</p>
                        </b-card-text>
                      </b-card-body>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            ><b-img
              fluid
              src="https://via.placeholder.com/200x900.png?text=Контекстная+реклама"
            ></b-img
          ></b-col>
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>
import { fetch } from "@/modules/firebase";
export default {
  data: () => ({
    contacts: {},
  }),

  computed: {
    locale() {
      return this.$i18n.locale;
    },
  },

  async mounted() {
    this.contacts = await fetch("/pages/6");
  },
};
</script>

<style>
</style>