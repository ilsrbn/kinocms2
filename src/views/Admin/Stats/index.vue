<template>
  <article>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="mx-auto my-0">Статистика</h1>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <div class="w-50 small-box bg-warning">
                  <div class="inner px-5">
                    <h1>{{usersL}}</h1>
                    <p>Зарегистированных пользователей</p>
                  </div>
                  <div class="icon">
                    <i class="fas fa-users"></i>
                  </div>
                  <router-link class="small-box-footer" :to="{name:'UsersPage'}">
                    Больше информации<i class="fas fa-arrow-circle-right ml-2"></i>
                  </router-link>
                </div>   
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import {fetch} from '@/modules/firebase'
export default {
  name: 'StatsPage',
  data: ()=> {
    return {
      usersL: ''
    }
  },
  async mounted() {
    let users = await fetch('/users')
    this.usersL = Object.keys(users).length
  }
}
</script>
