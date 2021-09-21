<template>
  <article>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mt-0 mx-auto">Рассылка</h1>
        </div>
      </div>
    </div>

    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col>
            <b-card>
              <h4>SMS</h4>
              <div
                v-if="!loaded"
                class="card-body d-flex justify-content-start"
              >
                <CardPreloader class="w-100 mh-100" />
              </div>
              <b-card-body v-else>
                <b-form-row class="mb-4">
                  <b-col :cols="smsAddress == 'choose' ? 6 : 12">
                    <b-form-radio v-model="smsAddress" value="all" inline
                      >Рассылка всем</b-form-radio
                    >
                    <b-form-radio value="choose" v-model="smsAddress" inline
                      >Выборочная рассылка</b-form-radio
                    >
                  </b-col>
                  <b-col v-if="smsAddress == 'choose'" cols="6">
                    <b-button v-b-modal.modal-xl variant="light" block
                      >Выбрать</b-button
                    >
                    <b-modal
                      id="modal-xl"
                      size="xl"
                      title="Выбор пользователей для SMS"
                      ><b-table
                        head-variant="light"
                        hover
                        :fields="keys"
                        id="users-table"
                        :filter="filterR"
                        outlined
                        responsive
                        :items="items"
                        :per-page="perPage"
                        :current-page="currentPage"
                        @filtered="onFiltered"
                      >
                        <template #cell(chosen)="data">
                          <b-form-checkbox
                            v-model="usersToSMS"
                            :value="data.value"
                          ></b-form-checkbox>
                        </template>
                      </b-table>
                      <b-pagination
                        class="w-100"
                        pills
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        aria-controls="users-table"
                        align="center"
                      ></b-pagination
                    ></b-modal>
                  </b-col>
                </b-form-row>
                <b-row>
                  <b-col cols="6">
                    <b-form-group
                      :description="`Символов: ${smsText.length}`"
                      label="Текст SMS рассылки"
                      label-for="sms"
                    >
                      <b-form-textarea
                        id="sms"
                        placeholder="Текст SMS"
                        v-model="smsText"
                      >
                      </b-form-textarea>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <p class="mb-1">
                      Колличество SMS для отправки: {{ maxSMS }}
                    </p>
                    <b-progress
                      :value="currentSMS"
                      :max="maxSMS"
                      show-value
                    ></b-progress>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="text-center">
                    <b-button @click="SMS" variant="light">Начать рассылку</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card>
              <h4>E-mail</h4>
              <b-card-body>
                <b-form-row class="mb-4">
                  <b-col :cols="emailAddress == 'choose' ? '6' : '12'">
                    <b-form-radio v-model="emailAddress" value="all" inline
                      >Рассылка всем</b-form-radio
                    >
                    <b-form-radio value="choose" v-model="emailAddress" inline
                      >Выборочная рассылка</b-form-radio
                    >
                  </b-col>
                  <b-col v-if="emailAddress == 'choose'" cols="6">
                    <b-button v-b-modal.modal2-xl variant="light" block
                      >Выбрать</b-button
                    >
                    <b-modal
                      id="modal2-xl"
                      size="xl"
                      title="Выбор пользователей email"
                      ><b-input
                        type="search"
                        class="mb-2"
                        placeholder="Фильтрация"
                        v-model="filterR"
                      ></b-input>
                      <b-table
                        head-variant="light"
                        hover
                        :fields="keys"
                        id="users-table"
                        :filter="filterR"
                        outlined
                        responsive
                        :items="items"
                        :per-page="perPage"
                        :current-page="currentPage"
                        @filtered="onFiltered"
                      >
                        <template #cell(chosen)="data">
                          <b-form-checkbox
                            v-model="usersToEmail"
                            :value="data.value"
                          ></b-form-checkbox>
                        </template>
                      </b-table>
                      <b-pagination
                        class="w-100"
                        pills
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        aria-controls="users-table"
                        align="center"
                      ></b-pagination
                    ></b-modal>
                  </b-col>
                </b-form-row>
                <b-form-row>
                  <b-col cols="6">
                    <b-form-group
                      label="Загрузить HTML письмо"
                      label-for="html-file"
                    >
                      <b-form-file
                        v-model="htmlTemplate"
                        id="html-file"
                        placeholder="Шаблон для рассылки"
                        accept="text/html"
                      ></b-form-file
                    ></b-form-group>
                    <p class="mb-1">
                      Колличество E-mail для отправки: {{ maxEmail }}
                    </p>
                    <b-progress
                      :value="currentEmail"
                      :max="maxEmail"
                      show-value
                    ></b-progress>
                  </b-col>
                  <b-col cols="6">
                    <b-card>
                      <b-card-body>
                        <b-form-group label="Шаблоны" label-for="r">
                          <b-form-radio-group
                            :options="htmlTemplates"
                            v-model="htmlTemplate"
                            stacked
                            id="r"
                          ></b-form-radio-group>
                        </b-form-group>
                      </b-card-body>
                    </b-card>
                  </b-col>
                </b-form-row>
                <b-row class="mt-4">
                  <b-col class="text-center">
                    <b-button @click="email" variant="light"
                      >Начать рассылку</b-button
                    >
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>
import CardPreloader from "@/components/CardPreloader";
import { fetch, save, addToStorage } from "@/modules/firebase";

export default {
  name: "MailsPage",
  components: {
    CardPreloader,
  },
  async mounted() {
    this.users = await fetch("/users");
    this.htmlTemplates = await fetch("/html-templates")
    this.totalRows = this.items.length;
  },
  methods: {
    formatDate(key) {
      let date = new Date(parseInt(key));
      return `${date.toLocaleDateString("ru", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}`;
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    async email() {
      if (this.emailAddress == "all") {
        this.maxEmail = Object.keys(this.users).length;
        this.htmlTemplate = {text: this.htmlTemplate.name, value: await addToStorage(this.htmlTemplate, 'html-template', '')}
        for (let element in this.users) {
          if (this.users[element].notification == undefined) {
            this.users[element].notification = { email: [], sms: [] };
          }
          if (this.users[element].notification.email == undefined) {
            this.users[element].notification.email = []
          }
          this.users[element].notification.email.unshift(this.htmlTemplate);
          this.currentEmail += 1;
        }
        this.currentEmail = this.maxEmail = 0;
        this.htmlTemplates.unshift(this.htmlTemplate);

        if (this.htmlTemplates.length == 6) {
          this.htmlTemplates = this.htmlTemplates.filter(
            (t) => this.htmlTemplates.indexOf(t) != 5
          );
        }
        await save('/html-templates', this.htmlTemplates)
        await save('/users', this.users)
        return;
      }
      this.currentEmail = 0;
      this.maxEmail = this.usersToEmail.length;
      this.htmlTemplate = {text: this.htmlTemplate.name, value: await addToStorage(this.htmlTemplate, 'html-template', this.htmlTemplates.length - 2)}
      this.usersToEmail.forEach((element) => {
        if (this.users[element].notification == undefined) {
          this.users[element].notification = { email: [], sms: [] };
        }
        
        this.users[element].notification.email.unshift(this.htmlTemplate);
        this.currentEmail += 1;
      });
      this.currentEmail = this.maxEmail = 0;
      this.htmlTemplates.unshift(this.htmlTemplate);
      if (this.htmlTemplates.length == 6) {
        this.htmlTemplates = this.htmlTemplates.filter(
          (t) => this.htmlTemplates.indexOf(t) != 5
        );
      }
      await save('/html-templates', this.htmlTemplates)
      await save('/users', this.users)
    },

    async SMS() {

      if (this.smsAddress == "all") {
        this.maxSMS = Object.keys(this.users).length;
        for (let element in this.users) {
          if (this.users[element].notification == undefined) {
            this.users[element].notification = { email: [], sms: [] };
          }
          this.users[element].notification.sms.unshift(this.smsText);
          this.currentSMS += 1;
        }
        this.currentSMS = this.maxSMS = 0;
        await save('/users', this.users)
        return;
      }

      this.maxSMS = this.usersToSMS.length;
      this.usersToSMS.forEach((element) => {
        if (this.users[element].notification == undefined) {
          this.users[element].notification = { email: [], sms: [] };
        }
        this.users[element].notification.sms.unshift(this.smsText);
        this.currentSMS += 1;
      });
      this.currentSMS = this.maxSMS = 0;
      await save('/users', this.users)
    },
  },
  computed: {
    items() {
      let items = [];
      for (let key in this.users) {
        let user = this.users[key];
        items.push({
          chosen: key,
          ID: key.slice(0, 8) + "...",
          rdate: this.formatDate(user.id),
          bdate: user.info.birthday,
          Email: user.email,
          phone: user.info.phone,
          name: user.info.lastName + " " + user.info.firstName,
          username: user.username,
          city: user.info.city,
        });
      }

      return items;
    },
  },
  data() {
    return {
      maxEmail: 0,
      currentEmail: 0,
      maxSMS: 0,
      currentSMS: 0,

      loaded: true,

      smsAddress: "all",
      smsText: "",
      emailAddress: "all",
      htmlTemplates: [],
      htmlTemplate: "",

      usersToEmail: [],
      usersToSMS: [],

      filterR: "",
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      users: [],
      keys: [
        { key: "chosen", label: "", sortable: false },
        { key: "ID", sortable: true },
        { key: "rdate", label: "Дата регистрации", sortable: true },
        { key: "bdate", label: "День рождения", sortable: true },
        { key: "Email", sortable: true },
        { key: "phone", label: "Телефон", sortable: true },
        { key: "name", label: "ФИО", sortable: true },
        { key: "username", label: "Псевдоним", sortable: true },
        { key: "city", label: "Город", sortable: true },
      ],
    };
  },
};
</script>

<style lang="css" scoped>
</style>