<template>
  <section id="bakc" class="w-100 min-vh-100 d-flex justify-content-center align-items-center">
      <b-card
      text-variant="white"
      class="col-6">
      <h2 class="text-center">Регистрация</h2>
      <b-card-text>
        <form @submit.prevent="submit">
        <label for="username" class="email-label w-100">Username</label>
        <input type="text" id="username" v-model.trim="username" placeholder="Придумайте пользовательский псевдоним">
        <div
          class="error"
          v-if="$v.username.$dirty && !$v.username.minLength">
          <p>Псевдоним должен содержать от 3 символов</p>
        </div>

        <label for="email" class="email-label w-100">Email *</label>
        <input type="email" id="email" v-model="email" placeholder="Введите Вашу электронную почту">
        <div
          class="error"
          v-if="$v.email.$dirty && !$v.email.required">
          <p>Заполните поле</p>
        </div>
        <div
          class="error"
          v-else-if="$v.email.$dirty && !$v.email.email">
          <p>Введите корректный адрес электронной почты</p>
        </div>

        <label for="password" class="email-label mt-5 w-100">пароль *</label>
        <input type="password" id="password" v-model="password" placeholder="Придумайте пароль">
        <div
          class="error"
          v-if="$v.password.$dirty && !$v.password.required">
          <p>Заполните поле</p>
        </div>
        <div
          class="error"
          v-else-if="$v.password.$dirty && !$v.password.minLength">
          <p>Пароль должен содержать от 6 символов</p>
        </div>

        <label for="password1" class="email-label mt-3 w-100">подтверждение пароля *</label>
        <input type="password" id="password1" v-model="password1" placeholder="Повторите придуманный пароль">
        <div
          class="error"
          v-if="$v.password1.$dirty && !$v.password1.required">
          <p>Заполните поле</p>
        </div>
        <div
          class="error"
          v-else-if="$v.password1.$dirty && !$v.password1.sameAsPassword">
          <p>Пароли должны совпадать</p>
        </div>

        <div class="ann">* &#8211; обязательное поле</div>

        <div class="wr d-flex justify-content-center mt-4">
          <button type="submit" class="register text-center">СОЗДАТЬ АККАУНТ</button>
        </div>
        <p class="text-center mt-3 mb-0 mr-2">Уже есть аккаунт? <router-link class="ml-2" :to="{name: 'LoginPage'}">Войти</router-link></p>
        </form>
      </b-card-text>
      </b-card>
  </section>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import messages from '../../utils/messages'
export default {
    name: 'Register',

    computed: {
      error() {
        return this.$store.getters.error
      }
    },

    watch: {
      error(fbError) {
        console.log(fbError)
      }
    },

    data() {
      return {
        username: '',
        email: '',
        password: '',
        password1: ''
      }
    },

    validations: {
      username: {
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      password1: {
        required,
        sameAsPassword: sameAs('password')
      }
    },

    methods: {
       makeToast(variant=null, body) {
      this.$bvToast.toast(body, {
        solid: true,
        title: variant == 'danger' ? 'Ошибка' : 'Информация',
        variant
      })
    },
      async submit() {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }
        const formData = {
          username: this.username == '' ? this.email : this.username,
          email: this.email,
          password: this.password
        }
        try {
          await this.$store.dispatch('signup', formData)
        } catch(e) {
          this.makeToast('danger', messages[e.code])
          throw e
        }
        this.$router.push({name: 'HomePage'})
      }
    }
}
</script>

<style scoped>
.ann {
  margin-top: 2rem;
  font-size: 0.8rem;
  letter-spacing: 0.05rem;
  color: rgba(255, 255, 255, 0.8);
}

a, a:visited {
  color: #aa1416;
  transition: color 150ms ease-in;
}

a:hover {
  color: #ec1e21;
}

.error {
  color: red;
}

.register {
  border: none;
  background: #460001;
  color: rgb(207, 196, 196);
  padding: 0.6rem 1rem;
  font-family:  'Roboto Condensed', sans-serif;
  font-weight: 400;
  transition: background 100ms ease-in-out;
}

.register:hover {
  background: #aa1416;
}

.card {
  background-color: rgba(0, 0, 0, 0.7);
}

.email-label {
  padding: 0 1rem;
  letter-spacing: 0.1rem;
  color: rgba(255, 255, 255, 0.8);
}

#email, #password, #password1, #username {
  width: 100%;
  background: rgba(0, 0, 0, 0.65);
  outline: none;
  border: none;
  border-top: 3px solid #460001;
  transition-property: border-top background color;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
  color: rgb(190, 168, 168);
  padding: 0.7rem 1rem;
  font-weight: 600;
}

#email:focus, #password:focus, #password1:focus, #username:focus {
  color: white;
  border-top: 3px solid #aa1416;
  background: rgba(0, 0, 0, 0.9);
}

#bakc {
  
  background: url('../../assets/hall.jpg');
  background-position: center;
  background-size: cover;
}
</style>