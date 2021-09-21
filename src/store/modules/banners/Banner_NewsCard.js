import {db, storage} from '@/modules/firebase'


export default {
  namespaced: true,
  state: {
    cards: [],
    picturesToRemove: [],
    picturesToWrite: [],
    upload: {
      current: 0,
      total: 0
    }
  },

  mutations: {
    setCards(state, cards) {
      state.cards = cards
    },

    removeCard(state, card) {
      if (card.picture != '') {
        state.picturesToRemove.push(card.picture)
      }
      state.cards = state.cards.filter(t => t.id !== card.id)
    },

    addCard(state) {
      state.cards.unshift({
        id: Date.now(),
        URL: "",
        picture: ""
      })
    },

    addPreviewPicture(state, file) {
      state.picturesToWrite.push(file)
    },

    setPicture(state, card) {
      state.cards.filter(t => t.id == card.id)[0].picture = card.picture
    },


    setUploadTotal(state, value) {
      state.upload.total = value
    },

    setUploadCurrent(state, value) {
      state.upload.current = value
    }

  },

  actions: {
    async fetchCards(ctx) {
      try {
        let cards = []
        const snapshot = await db.ref('/banners/news').once('value')
        const value = snapshot.val()

        if(value != null) {
          cards = value
          ctx.commit('setCards', cards)

        } else {
          cards = []
          ctx.commit('setCards', cards)
        }

      } catch(e) {
        console.error(e)
      }
    },

    removeCard(ctx, card) {
      ctx.commit('removeCard', card)
    },

    async saveCards(ctx) {
      console.log(ctx.state.picturesToWrite)

      if (ctx.state.picturesToRemove.length != 0) {
        try {
          for (var i = ctx.state.picturesToRemove.length - 1; i >= 0; i--) {
            await storage.refFromURL(ctx.state.picturesToRemove[i]).delete()
          }
          ctx.state.picturesToRemove = []
        } catch (e) {
          console.error(e)
        }
      }

      if (ctx.state.picturesToWrite.length != 0) {
        try {
          console.log('Before cycle')
          ctx.commit('setUploadTotal', ctx.state.picturesToWrite.length)
          for (var q = ctx.state.picturesToWrite.length - 1; q >= 0; q--) {
            console.log('In cycle')
            let fl = ctx.state.picturesToWrite[q]
            console.log(fl)
            const picRef = storage.ref('/banners/news/' + fl.picture.name)
            const picRefSnapshot = await picRef.put(fl.picture)
            const downloadURL = await picRefSnapshot.ref.getDownloadURL()
            console.log(downloadURL)
            ctx.commit('setPicture', {
              id: fl.id,
              picture: downloadURL,
              URL: fl.URL
            })
            ctx.commit('setUploadCurrent', ctx.state.upload.current + 1)
          }
          ctx.commit('setUploadTotal', 0)
          ctx.commit('setUploadCurrent', 0)

          ctx.state.picturesToWrite = []
        } catch (e) {
           console.error(e)
        }
      }
      return await db.ref('/banners/news').set(ctx.state.cards)
    }
  },

  getters: {
    getCards(state) {
      return state.cards
    },

    getUpload(state) {
      return state.upload
    }
  }
}