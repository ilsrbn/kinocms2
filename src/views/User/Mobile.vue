<template>
  <article>
    <section class="content">
      <div class="container-fluid">
        <b-row>
          <b-col cols="12">
            
            <b-img
              fluid
              src="https://1.bp.blogspot.com/-b1_n6tOHvWU/YKMssWEjo-I/AAAAAAAAQjk/vIJQsAPUpRQKxR44GoCbm3CtRgr8tVBKACLcBGAsYHQ/s0/Android_NewForDevelopers_1024x512_updated.png"

            ></b-img>
          </b-col>
          <b-row class="my-5">
            <b-col cols="10">
              <h1>{{$t('mobile.h1')}}</h1>
              <p>{{$t('mobile.p')}}</p>
              <b-row>
                <b-col cols="4">
                  <b-img fluid src="https://escadra.com.ua/wp-content/uploads/2021/09/android-dev.png"></b-img>
                </b-col>
                <b-col cols="4"><b-img fluid src="https://developer.apple.com/news/images/og/apple-developer-og.png"></b-img></b-col>
                <b-col cols="4"><b-img fluid src="https://wm-help.net/image/art-img/1857392086hire-node-js-top.png"></b-img></b-col>
              </b-row>

            </b-col>
            <b-col>
               <b-img
                  fluid
                  src="https://via.placeholder.com/200x1000.png?text=Контекстная+реклама"
                ></b-img>
            </b-col>
          </b-row>
        </b-row>
      </div>
    </section>
  </article>
</template>

<script>

export default {
  computed: {
    locale() {
      return this.$i18n.locale
    }
  }
};
</script>

<style>
</style>