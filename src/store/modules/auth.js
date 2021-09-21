/* eslint-disable */
import firebase from "firebase/app"
import 'firebase/auth'

export default {
    actions: {
        async login(ctx, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch(e) {
                throw e
            }
        },

        async logout(ctx) {
            await firebase.auth().signOut()
            await ctx.commit('clearInfo')
        },

        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },

        async signup(ctx, {email, password, username}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await ctx.dispatch('getUid')
                await firebase.database().ref(`/users/${uid}`).set({
                    admin: false,
                    id: Date.now(),
                    username,
                    lang: 'ru',
                    email,
                    password,
                    info: {
                        firstName: '',
                        lastName: '',
                        adress: '',
                        bankCard: '',
                        gender: '',
                        phone: '',
                        birthday: '',
                        city: ''
                    }
                })
            } catch(e) {
                throw e
            }
        }
    }
}