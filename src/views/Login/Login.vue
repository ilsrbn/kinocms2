<template>
  <section
    id="bakc"
    class="w-100 min-vh-100 d-flex justify-content-center align-items-center"
  >
    <b-card text-variant="white" class="col-6">
      <h2 class="text-center">Вход</h2>
      <b-card-text>
        <form @submit.prevent="submit">
          <label for="email" class="email-label w-100">Email</label>
          <input
            id="email"
            v-model.trim="email"
            placeholder="Введите Вашу электронную почту"
          />
          <div class="error" v-if="$v.email.$dirty && !$v.email.required">
            <p>Поле не должно быть пустым</p>
          </div>
          <div class="error" v-else-if="$v.email.$dirty && !$v.email.email">
            <p>Введите корректный email</p>
          </div>

          <label for="password" class="email-label mt-3 w-100">пароль</label>
          <input
            type="password"
            id="password"
            v-model.trim="password"
            placeholder="Введите пароль"
          />
          <div class="error" v-if="$v.password.$dirty && !$v.password.required">
            <p>Поле не должно быть пустым</p>
          </div>

          <div
            class="error"
            v-if="$v.password.$dirty && !$v.password.minLength"
          >
            <p>
              Пароль должен содержать от
              {{ $v.password.$params.minLength.min }} символов
            </p>
          </div>

          <div class="wr d-flex justify-content-center mt-4 pb-2 w-50 mx-auto">
            <button type="submit" class="register text-center">Войти</button>
          </div>
          <div class="d-flex justify-content-center mt-2">
            <button class="register text-center" @click="$router.push({name: 'HomePage'})">Гость</button>
          </div>
          <p class="text-center mt-3 mb-0 mr-2">
            Нет аккаунта?
            <router-link class="ml-2" :to="{ name: 'SignupPage' }"
              >Зарегистрироваться</router-link
            >
          </p>
        </form>
      </b-card-text>
    </b-card>
  </section>
</template>

<script>
import messages from '../../utils/messages'
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
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
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch("login", formData);
      } catch(e) {
        this.makeToast('danger', messages[e.code])
        throw e
      }
      await this.$store.dispatch("fetchUser");
      if (this.$store.getters.info.admin) {
        this.$router.push({ name: "StatsPage" });
      } else {
        this.$router.push({ name: "HomePage" });
      }
    },
  },
};
</script>

<style scoped>
.wr {
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
}
a,
a:visited {
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
  font-family: "Roboto Condensed", sans-serif;
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

#email,
#password {
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

#email:focus,
#password:focus {
  color: white;
  border-top: 3px solid #aa1416;
  background: rgba(0, 0, 0, 0.9);
}

#bakc {
  background: url("../../assets/hall.jpg");
  background-position: center;
  background-size: cover;
}
</style>