import firebase from "firebase/app"
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"

const db = firebase.firestore()

export const realtimeCall = async ( col, data ) => {
  // utilizar https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/eval
  // pra criar a invocação condicionada pela quantidade de "wheres"
  const q = query( collection(db, col), data != null ? where(data.field, data.operator, data.value) : null)
  const qSnap = await getDocs(q)

  return qSnap.exists() ? qSnap.data() : null
}

exports = {
  realtimeCall
}