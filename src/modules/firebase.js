import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

const app = firebase.initializeApp({	
  apiKey: "AIzaSyCECN-5uILYnZHfXeZlQunkC-U9CAF2vxI",
  authDomain: "kinocms-e93e3.firebaseapp.com",
  databaseURL: "https://kinocms-e93e3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kinocms-e93e3",
  storageBucket: "kinocms-e93e3.appspot.com",
  messagingSenderId: "282608509129",
  appId: "1:282608509129:web:ceb8b20f9eac624a506d18"
})

export const db = app.database()
export const storage = app.storage()


export async function removeFromStorage(url) {
	try {
		return await storage.refFromURL(url).delete()
	} catch(e) {
		console.log('Error.\nDeleting from storage.', e)
	}
}

export async function addToStorage(file, route, id) {
	try {
		const ref = storage.ref(`${route}/${id}/${Date.now()}-${file.name}`)
		const snapshot = await ref.put(file)
		const value = await snapshot.ref.getDownloadURL()
		return value	
	} catch(e) {
		console.log('Error.\nWriting to storage.', e)
	}

}

export async function fetch(path) {
	try {
		const snapshot = await db.ref(path).once('value')
		return snapshot.val()
	} catch(e) {
		console.log('Error.\nFetching from database.', e)
	}
}

export async function save(path, payload) {
	try {
		await db.ref(path).set(payload)
	} catch(e) {
		console.log("Error.\nWriting to database.", e)
	}
	
}
