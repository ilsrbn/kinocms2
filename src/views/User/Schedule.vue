<template>
  <article>
    <section class="content">
      <div class="container-fluid p-4">
        <b-row
          ><b-col
            ><b-form-input
              class="mb-2"
              style="
                color: rgba(255, 255, 255, 0.8);
                background: rgba(255, 255, 255, 0.1);
                border: none;
              "
              v-model="filter"
              placeholder="Фильтрация"
            ></b-form-input>
            <b-table
              table-variant="dark"
              no-border-collapse
              :fields="fields"
              sort-by="date"
              :filter="filter"
              :filter-included-fields="filterOn"
              :items="schedule"
            >
              <template #cell(time)="data">
                {{data.value.slice(0, -3)}}
              </template>
            </b-table></b-col
        ></b-row>
      </div>
    </section>
  </article>
</template>

<script>
import { fetch } from "@/modules/firebase";
export default {
  data: () => ({
    schedule: [],
    filter: null,
    filterOn: ["movie", "cinema"]
  }),

  computed: {
    fields() {
      return [
        { key: "movie", label: this.$t("schedule.movie"), sortable: true },
        { key: "date", label: this.$t("schedule.date"), sortable: true },
        { key: "time", label: this.$t("schedule.time") },
        { key: "cinema", label: this.$t("schedule.cinema"), sortable: true },
        { key: "hall", label: this.$t("schedule.hall") },
        { key: "price", label: this.$t("schedule.price"), sortable: true },
      ];
    },
  },

  async mounted() {
    this.schedule = await fetch("/schedule");
  },
};
</script>

<style>
</style>