import { getFirestore, collection, addDoc, setDoc, where, getDocs, query, limit, endAt, startAt, updateDoc, doc, deleteDoc, orderBy }  from 'firebase/firestore'
import { initializeApp } from 'firebase/app';
import {firebaseConfig} from './../config/FirebaseConfig';

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

var numeroPagina = 0 , maxRegistros = 0

const update = async (refPath, data) => {
    try{
        let docRef = doc(db, refPath, data.id)
        await updateDoc(docRef, data)
            .then()
            .catch(err => {
                return {error: {hasError: true, err}}
            })
        return {doc: data, error: {hasError: false, msg: {}}}
    }catch (err){
        return {error: {hasError: true, err}}
    }
}

const persist = async (refPath, data) => {        
    try{

        if(data.id != null){
            const docRef = doc(db, refPath, data.id)
            console.log(`Atuliza o seguinte id com o objet: ${data.id}`, docRef)
            return await setDoc(docRef, data, { merge: true })
            .then((resposta) => {
                console.log(`Após persistir ${JSON.stringify(resposta)}`);
                return {
                    doc:  data,
                    error: { hasError: false, msg: {} }
                };
            })
            .catch((err) => {
                console.log(`Erro fazer merge ${JSON.stringify(err)}`);
                return { error: { hasError: true, msg: err } };
            });
        }
        console.log('Dados chegando no manipula dados ',data)
        const col = collection(db, refPath)
        return await addDoc(col, data)
            .then( (resposta) => {
                console.log(`Após persistir ${JSON.stringify(resposta)}`)
                return { doc: {
                    id: resposta.id,
                    nome : data.nome
                }, error: {hasError: false, msg: {}}}
            })
            .catch( (err) => {
                console.log(`Erro ao incluir ${JSON.stringify(error)}`)
                return {error: {hasError: true, msg: err}}
            });          
    }catch(err){
        console.log(`Erro no código ${err}`)

        return { error: {hasError: true, msg: err} }
    }
}

const retrieveNumeroPaginas = async (refPath, maxByPage, query) => {
    try{
        const col = collection(db, refPath)
        const q = query.keys.length != 0 
            ? query(col, where(query))
            : query(col)
        const snapshot = await getDocs(q)
        return {
            data: Math.ceil(snapshot.size / maxByPage),
            error: {hasError: false, msg: {}}
        }

    }catch(err) {
        return {error: {hasError: true, error: err }}
    }
} 


const retrieveById = async (refPath, compare, comparator, value) => {
    try{
        console.log('passo 1 query que veio', {compare, comparator, value})
        const col = collection(db, refPath)
        console.log('passo 2', col)
        const q = query(col, where(compare, comparator, value))
        console.log('passo 3', q)
        const querySnapshot = await getDocs(q);
        console.log('passo 4', querySnapshot)
        console.log('passo 4 b - data separada', querySnapshot.docs[0].data())
        return {doc : querySnapshot.docs[0].data(), error: {hasError:false }}
    }catch(err){
        console.log('passo em falso', err)
        return {error: {hasError: true, msg: err}}
    }
}

/**
 * Analisar a viabilidade
 * 
 * @param {a} refPath 
 * @param {*} params 
 * @deprecated
 * @returns 
 */
const retrieve = async (refPath, params) => {        
    try{

        const limit = 10    
        const page = params.page || 1

        const col = collection(db, refPath)
        const q = query(col,)

        return await getDocs(q)
            .then(
                (resposta) => {
                    return {doc: resposta.data(), error: {hasError: false, msg: {}}}
                }
            )
            .catch( (err) => {
                return {error: {hasError: true, msg : err}}
            })
    }catch (err){
        return {error: {hasError: true, msg: err}} 
    }
}
const retrieveAll = async (refPath, pageSelection, maxResults) => {        
    try{

        /**
         * import { query, limit, startAfter, getDocs } from "firebase/firestore";

            // Initial query
            const firstQuery = query(collectionRef, limit(10));
            const firstSnapshot = await getDocs(firstQuery);

            // Get the last document
            const lastVisible = firstSnapshot.docs[firstSnapshot.docs.length - 1];

            // Subsequent query (next "page")
            const nextQuery = query(collectionRef, startAfter(lastVisible), limit(10));
            const nextSnapshot = await getDocs(nextQuery);

         */

        maxRegistros = maxResults || 50
        numeroPagina = pageSelection || 1   

        const col = collection(db, refPath)
        
        const q = query(col, 
            [
                startAt(numeroPagina),
                limit(maxRegistros), 
            ] )

        return await getDocs(q)
            .then(
                (resposta) => {
                    
                    const docs = resposta.docs.map( (doc ) => {
                        return {id: doc.id, ...doc.data()}
                    })
                    return {doc: docs, error: {hasError: false, msg: {}}}
                }
            )
            .catch( (err) => {
                return {error: {hasError: true, msg: err}}
            })
    }catch (err){
        return {error: {hasError: true, msg: err}} 
    }
}

const retrievePage = async (refPath, page, pageSize) => {
    let verPage = 0, verPageSize = 0, start = 0
    try {
        if(page == null || page == undefined || page <= -1 )
            throw new Error('Page number must be greater than or equal to 0');
        verPage = page

        if(page == null || page == undefined || pageSize <= -1)
            throw new Error('Page size must be greater than or equal to 0');

        verPageSize = pageSize

        start = (page - 1) * pageSize
        
        console.log(`starting vlaue `,start)

        const col = collection(db, refPath);
        // const q = query(col, orderBy('id'), startAt(start), limit(pageSize));
        const q = query(col)
        console.log(`query que vai ser executada`, q)
        const snapshot = await getDocs(q);
        console.log(`snapshot que veio`, snapshot)

        if(!snapshot && snapshot.docs.length <= 0 )
            return {error: {hasError: true, msg : "Consulta invalida ou vazia!"}}
        console.log(`Documentos presentes`, snapshot.docs)
        const doc = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return { doc, error: { hasError: false, msg: {} } };
    } catch (err) {
        return { error: { hasError: true, msg: err } };
    }
}

const remove = async (ref, id) => {
    try{
        deletingDoc = doc(db, ref, id )
        console.log('Vai deletar ', deletingDoc)
        deleteDoc(deletingDoc)
            .then( msg =>{ 
                console.log('deletou', msg)
                return {error: {hasError: false, msg: null}}
            })
            .catch(err => console.log('Operacao falhou', err));
    }catch(err){
        return {error: {hasError: true, msg: err}}
    }
}


export {persist, update, retrieveAll, retrieve, retrieveNumeroPaginas, retrieveById, remove, retrievePage}