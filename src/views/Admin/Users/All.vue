<template>
  <article>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">Пользователи</h1>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col>
            <b-card>
              <b-card-text>
                <b-row>
                  <b-input type="search" class="mb-2" placeholder="Фильтрация" v-model="filterR"></b-input>
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
                    <template #cell(edit)="data">
                      <router-link class="btn btn-warning" :to="{name: 'EditUser', params: {id: data.value}}"><i class="fas fa-pen"></i></router-link>
                    </template>
                    <template #cell(remove)="data">
                      <b-button @click="remove(data.value)" variant="danger"><i class="fas fa-times"></i></b-button>
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
                  ></b-pagination>
                </b-row>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>
import { fetch, save } from "@/modules/firebase";
export default {
  name: "All",
  data: () => {
    return {
      filterR: '',
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      users: [],
      keys: [
        { key: "ID", sortable: true },
        { key: "rdate", label: "Дата регистрации", sortable: true },
        { key: "bdate", label: "День рождения", sortable: true },
        { key: "Email", sortable: true },
        { key: "phone", label: "Телефон", sortable: true },
        { key: "name", label: "ФИО", sortable: true },
        { key: "username", label: "Псевдоним", sortable: true },
        { key: "city", label: "Город", sortable: true },
        { key: 'edit', sortable: false, label: ''},
        { key: 'remove', sortable: false, label: ''},
      ],
    };
  },

  methods: {
    formatDate(key) {
      let date = new Date(parseInt(key))
      return `${date.toLocaleDateString('ru', {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'})}`
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    async remove(key) {
      const answer = window.confirm('Вы действитеьно хотите удалить этого пользователя? Это действие нельзя будет отменить!')
      if (answer) {
        this.$set(this.users, key, null)
        delete this.users[key]

        await save('/users', this.users)
      } else {
        return
      }
      
    }
  },

  async mounted() {
    this.users = await fetch("/users");
    this.totalRows = this.items.length
  },

  computed: {
    items() {
      let items = [];
      for (let key in this.users) {
        let user = this.users[key];
        items.push({
          ID: key.slice(0, 8) + '...',
          rdate: this.formatDate(user.id),
          bdate: user.info.birthday,
          Email: user.email,
          phone: user.info.phone,
          name: user.info.lastName + ' ' + user.info.firstName,
          username: user.username,
          city: user.info.city,
          edit: key,
          remove: key
        });
      }

      return items
    },
  },
};
</script>

<style>
.page-item.active .page-link {
  background-color: rgba(170, 20, 22, 0.8) !important;
  border-color: rgba(170, 20, 22, 0.8) !important; 
  color: white !important;
}

.page-item .page-link {
  color: rgba(170, 20, 22, 0.8) !important;
}

.page-item.disabled .page-link {
  color: gray !important;
}
</style>