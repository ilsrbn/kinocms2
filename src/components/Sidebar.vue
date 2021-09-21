<template>
<aside class="main-sidebar sidebar-light-primary  elevation-4">
<div class="sidebar">
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <router-link class="b-link" :to="{name: 'StatsPage'}">
            <span class="brand-text"><b>Kino</b><i>CMS</i></span>
          </router-link>
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
              <li class="nav-item">
                <router-link :to="{name: 'StatsPage'}" exact class="nav-link">
                  <i class="fas fa-chart-area"></i>
                  <p> Статистика</p>
                  <i class="fas fa-check float-right"></i>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'BannersPage'}" class="nav-link">
                  <i class="fas fa-columns"></i>
                  <p> Баннеры</p>
                  <i class="fas fa-check float-right"></i>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'AllMovies'}" class="nav-link">
                  <i class="fas fa-photo-video"></i>
                  <p> Фильмы</p>
                  <i class="fas fa-check float-right"></i>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'CinemasPage'}" class="nav-link">
                  <i class="fas fa-hotel"></i>
                  <p> Кинотеатры</p>
                  <i class="fas fa-check float-right"></i>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'SchedulePage'}" class="nav-link">
                  <i class="far fa-clock"></i>
                  <p> Расписание</p>
                  <i class="fas fa-check float-right"></i>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'AllNews'}" class="nav-link">
                  <i class="fas fa-bullhorn"></i>
                  <p> Новости</p>
                  <i class="fas fa-check float-right"></i>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'AllPromotions'}" class="nav-link">
                  <i class="fas fa-search-dollar"></i>
                  <p> Акции</p>
                  <i class="fas fa-check float-right"></i>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'AllPages'}" class="nav-link">
                  <i class="far fa-clone"></i>
                  <p> Страницы</p>
                  <i class="fas fa-check float-right"></i>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'UsersPage'}" class="nav-link">
                  <i class="fas fa-users"></i>
                  <p> Пользователи</p>
                  <i class="fas fa-check float-right"></i>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{name: 'MailsPage'}" class="nav-link">
                  <i class="fas fa-envelope"></i>
                  <p> Рассылка</p>
                  <i class="fas fa-check float-right"></i>
                </router-link>
              </li>
        </ul>
      </nav>
  </div>

  
</aside>
</template>

<script>

export default {
  name: 'Sidebar'
}
</script>

<style>
.sidebar .nav-link, .nav-link.active {
  transition-property: background-color color;
  transition-duration: 100ms;
  transition-timing-function: ease-in;
}

.sidebar .nav-link.active {
  background-color: rgba(170, 20, 22, 0.8) !important;
}

.sidebar .nav-link > * {
  margin: 0 0.5rem;
  transition: margin 100ms ease-in;
}

.sidebar .nav-link:hover > * {
  margin: 0 0.9rem;
}


.b-link, .b-link:after {
  font-weight: 300;
  font-size: 1.6rem;
  width: 100%;
  background-color: opacity;
  margin: 0.2rem 0 0.7rem;
  padding-left: 0;
  border-radius: 0.2rem;
  padding-right: 0;
  text-align: center;
  transition-property: background-color;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
}
.brand-text {
  color: #460001;

  transition-property: color;
  transition-duration: 150ms;
  transition-timing-function: ease-in;
}

.b-link:hover {
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.1);
}

.b-link:hover .brand-text {
  color: #aa1416;

}
</style>