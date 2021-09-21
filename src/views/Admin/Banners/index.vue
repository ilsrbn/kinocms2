<template>
  <article>
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <h1 class="m-0">Баннеры</h1>
        </div>
      </div>
    </div>
    <section class="content">
      <div class="container-fluid">
        <MainCardsContainer />
        <CardBackground />
        <NewsCardsContainer />
      </div>
    </section>  
  </article>
</template>

<script>
import MainCardsContainer from '@/components/banners/MainCardsContainer'
import CardBackground from '@/components/banners/CardBackground'
import NewsCardsContainer from '@/components/banners/NewsCardsContainer'

  export default {
    name: 'BannersPage',

    components: {
      MainCardsContainer,
      CardBackground,
      NewsCardsContainer
    },

    data() {
      return {
      }
    }
  };
</script>
