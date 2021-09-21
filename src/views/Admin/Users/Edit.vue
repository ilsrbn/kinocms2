<template>
  <div v-if="!loaded">
    <CardPreloader />
  </div>
  <article v-else>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="my-0 mx-auto">Редактирование пользователя</h1>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col>
            <b-card>
              <b-row>
                <b-col md='6' cols>
                  <b-form-group
                    label="Имя:"
                    :label-for="'name-'+user.id"
                    label-cols="3"
                    
                  >
                    <b-form-input
                      :id="'name-'+user.id"
                      v-model="user.info.firstName"
                      placeholder="Имя пользователя"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Фамилия:"
                    :label-for="'surname-'+user.id"
                    label-cols="3"
                    
                  >
                    <b-form-input
                      :id="'surname-'+user.id"
                      v-model="user.info.lastName"
                      placeholder="Фамилия пользователя"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Псевдоним:"
                    :label-for="'username-'+user.id"
                    label-cols="3"
                    
                  >
                    <b-form-input
                      :id="'username-'+user.id"
                      v-model="user.username"
                      placeholder="Псевдоним пользователя"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Email:"
                    :label-for="'email-'+user.id"
                    label-cols="3"
                    
                  >
                    <b-form-input
                      :id="'email-'+user.id"
                      v-model="user.email"
                      placeholder="Почта пользователя"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Адрес:"
                    :label-for="'adress-'+user.id"
                    label-cols="3"
                    
                  >
                    <b-form-input
                      :id="'adress-'+user.id"
                      v-model="user.info.adress"
                      placeholder="Адрес пользователя"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Пароль:"
                    :label-for="'password-'+user.id"
                    label-cols="3"
                    
                  >
                    <b-form-input
                      :id="'password-'+user.id"
                      type="password"
                      v-model="user.password"
                      placeholder="Пароль пользователя"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Номер карты:"
                    :label-for="'bankCard-'+user.id"
                    label-cols="3"
                    
                  >
                    <b-form-input
                      :id="'bankCard-'+user.id"
                      type="password"
                      v-model="user.info.bankCard"
                      placeholder="Банковская карта пользователя"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col md="6" cols>
                  <b-form-group
                    label="Язык:"
                    :label-for="'lang-'+user.id"
                    label-cols="3"  
                  >
                    <b-form-radio
                      v-model="user.lang"
                      :aria-describedby="ariaDescribedby"
                      name="some-radios"
                      value="ru"
                      plain
                      inline
                    >Русский
                    </b-form-radio>
                    <b-form-radio
                      v-model="user.lang"
                      :aria-describedby="ariaDescribedby"
                      name="some-radios"
                      value="ua"
                      plain
                      inline
                    >Украинский</b-form-radio>
                  </b-form-group>

                  <b-form-group
                    label="Пол:"
                    :label-for="'gender-'+user.id"
                    label-cols="3"  
                  >
                    <b-form-radio
                      v-model="user.info.gender"
                      :aria-describedby="ariaDescribedby"
                      name="some-2radios"
                      value="male"
                      plain
                      inline
                    >Мужской
                    </b-form-radio>
                    <b-form-radio
                      v-model="user.lang"
                      :aria-describedby="ariaDescribedby"
                      name="some-2radios"
                      value="female"
                      plain
                      inline
                    >Женский</b-form-radio>
                  </b-form-group>

                  <b-form-group
                    label="Телефон:"
                    :label-for="'phone-'+user.id"
                    label-cols="3"
                  >
                    <b-form-input
                      :id="'phone-'+user.id"
                      type="phone"
                      v-model="user.info.phone"
                      placeholder="Номер телефона пользователя"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Дата рождения:"
                    :label-for="'birthday-'+user.id"
                    label-cols="3"  
                  >
                    <b-form-datepicker
                      selected-variant="success"
                      nav-button-variant="success"
                      :id="'birthday-'+user.id"
                      v-model="user.info.birthday"
                      class="mb-2"></b-form-datepicker>
                  </b-form-group>

                  <b-form-group
                    label="Город:"
                    :label-for="'city-'+user.id"
                    label-cols="3"
                  >
                    <b-form-input
                      :id="'city-'+user.id"
                      type="text"
                      v-model="user.info.city"
                      placeholder="Город проживания пользователя"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Подтверждение пароля:"
                    :label-for="'password2-'+user.id"
                    label-cols="3"
                  >
                    <b-form-input
                      :id="'password2-'+user.id"
                      type="password"
                      v-model="password2"
                      placeholder="Повторите пароль"
                    ></b-form-input>
                  </b-form-group>
                </b-col>

              </b-row>
              <b-container class="text-center">
                <b-button v-if="success" variant="success">УСПЕШНО СОХРАНЕНО!</b-button>
                <b-button v-else-if="!uploading" variant="light" @click="save">СОХРАНИТЬ</b-button>
                
                <b-button v-else variant="light" disabled ><i class="fas fa-circle-notch fa-spin mx-2"></i></b-button>
              </b-container>
                
              
              
            </b-card>
          </b-col>
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>
import {fetch, save} from '@/modules/firebase'
import CardPreloader from '@/components/CardPreloader'
export default {
    name: 'Edit',
    components: {
      CardPreloader
    },
    data: ()=>{
      return {
        saved: false,
        uploading: false,
        success: false,
        loaded: false,
        user: ''
      }
    },
    methods: {
      async save() {
        this.uploading = true

        await save(`/users/${this.$route.params.id}`, this.user)
        this.saved = true

        this.uploading = false
        this.success = true
        setTimeout(() => {this.success = false}, 2000)
        setTimeout(() => {this.$router.push({name: 'UsersPage'})}, 2000)

      }
    },
    beforeRouteLeave(to, from, next) {
      if (this.saved) {
        next()
      } else {
        const answer = window.confirm('Вы хотите уйти? У вас есть несохранённые изменения!')
        if (answer) {
          next()
        } else {
          next(false)
        }
      }
    },

    async mounted() {
      this.user = await fetch(`/users/${this.$route.params.id}`)
      this.loaded = true

    }
}
</script>

<style>

</style>