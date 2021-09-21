import firebase from 'firebase/app'
import 'firebase/database'

export default {
    state: {
        info: {}
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        }
    },
    actions: {
        async fetchUser({dispatch, commit}) {
            try {
                const uid = await dispatch('getUid')
                const info = (await firebase.database().ref(`/users/${uid}`).once('value')).val()
                commit('setInfo', info)
            } catch(e) {
                // eslint-disable-line
            }
            
        }
    },
    getters: {
        info: s => s.info 
    }
}