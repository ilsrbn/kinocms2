import {db, storage} from '@/modules/firebase'


export default {
  namespaced: true,
  state: {
    cards: [],
    picturesToRemove: [],
    picturesToWrite: []
  },

  mutations: {
    set0(state) {
      state.cards = []
    },
    setCards(state, cards) {
      state.cards = cards
    },

    removeCard(state, card) {
      if (card.URL != '') {
        state.picturesToRemove.push(card.URL)
      }
      state.cards = state.cards.filter(t => t.id !== card.id)
      state.picturesToWrite = state.picturesToWrite.filter(t => t.id !== card.id)

    },

    addCard(state) {
      if (!state.cards) {
        state.cards = []
      }
      state.cards.push({
        id: Date.now(),
        URL: ""

      })
    },

    addPreviewPicture(state, file) {
      state.picturesToWrite.push(file)
    },

    setPicture(state, card) {
      state.cards.filter(t => t.id == card.id)[0].URL = card.URL
    },

    setPicturesToWrite(state) {
      state.picturesToWrite = []
    }

  },

  actions: {
    async fetchCards(ctx, params) {
      let cards = []
      const snapshot = await db.ref(`/${params.node}/${params.id}/${params.lang}/gallery`).once('value')
      const value = snapshot.val()
      try {
        if (value != null) {
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

    async saveCards(ctx, params) {
      if (ctx.state.picturesToRemove.length != 0) {
        for (var i = ctx.state.picturesToRemove.length - 1; i >= 0; i--) {
          try {
            await storage.refFromURL(ctx.state.picturesToRemove[i]).delete()
          } catch(e) {
            console.error(e)
          }
        }
        ctx.state.picturesToRemove = []

      }

      if (ctx.state.picturesToWrite.length != 0) {
        for (var q = ctx.state.picturesToWrite.length - 1; q >= 0; q--) {
          let fl = ctx.state.picturesToWrite[q]
          const picRef = storage.ref(`/${params.node}/${params.id}/${params.lang}/gallery/${Date.now()}${fl.URL.name}`)
          const picRefSnapshot = await picRef.put(fl.URL)
          const downloadURL = await picRefSnapshot.ref.getDownloadURL()
          try {
            ctx.commit('setPicture', {id: fl.id, URL: downloadURL})
          } catch(e) {
            console.error(e)
          }
        }
        console.log(ctx.state.cards)
        ctx.commit('setPicturesToWrite')
        
      }
      ctx.commit('Movies/setGallery', {gallery: ctx.state.cards, lang: params.lang}, {root:true})
      
    }
  },

  getters: {
    getCards(state) {
      return state.cards
    }
  }
}