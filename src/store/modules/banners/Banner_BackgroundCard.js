import {db, storage} from '@/modules/firebase'

export default {
  namespaced: true,
  state: {
    type: false,
    picture: '',
    newPic: '',
    oldPic: ''
  },
  mutations: {
    setPicture(state, url) {
      state.picture = URL.createObjectURL(url)
      state.newPic = url
      console.log(state.newPic)
    },

    fetchPicture(state, url) {
      state.picture = url.picture
      state.type = url.type
      state.oldPic = url.picture
    },

    updatePicture(state, url) {
      state.picture = url
      state.oldPic = url
      state.newPic = ''
    },

    setType(state, value) {
      state.type = value
      console.log(state.type, value)
    }
  },
  actions: {
    async fetchCard(ctx) {
      try {
        const snapshot = await db.ref('/banners/background').once('value')
        const value = snapshot.val()
        if (value != null) {
          console.log(value)
          ctx.commit('fetchPicture', value)
        }
      } catch (e) {
        console.error(e)
      }
    },

    async saveCard(ctx) {
      if (ctx.state.newPic) {
        try {
          try {
            await storage.refFromURL(ctx.state.oldPic).delete()
          } catch(e) {
            console.error(e)
          }
          const ref = storage.ref('/banners/background/' + ctx.state.newPic.name)
          console.log(ctx.state.newPic)
          const snapshot = await ref.put(ctx.state.newPic)
          const value = await snapshot.ref.getDownloadURL()
          ctx.commit('updatePicture', value)
        } catch(e) {
          console.error(e)
        }
      }
      const dbField = {
        type: ctx.state.type,
        picture: ctx.state.picture
      }
      return await db.ref('/banners/background').set(dbField)
    }
  },
  getters: {
    getCard(state) {
      return {
        type: state.type,
        picture: state.picture
      }
    }
  }
}