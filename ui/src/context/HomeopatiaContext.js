import CreateDataContext from "./CreateDataContext.js"
import * as manipulaDados from '../hooks/manipulaDados.js'

const pacienteReducer = (state, action) =>{

  switch(action.type){
      case 'edit_homeopatia' :
          return state.map(
              (receita) => {
                  if(receita.id === action.payload.id){
                      return receita.homeopatias = receita.homeopatias.map( (homeopatia) => {
                          if(homeopatia.id === action.payload.idHomeopatia){
                              homeopatia.descricao = action.payload.homeopatia.descricao
                              homeopatia.posologia = action.payload.homeopatia.posologia
                              homeopatia.dinamizacao = action.payload.homeopatia.dinamizacao
                              homeopatia.dinamo = action.payload.homeopatia.dinamo
                          }
                          return homeopatia
                      })
                  }
              }
          )     
      default :
          return state
  }
}

const addHomeopatia = dispatch => {
  return async (idReceita, homeopatia, callback) => {        
      
      const receita = await manipulaDados.retrieveById('receitas', '__name__', '==', idReceita )
      console.log('recuperou a receita', receita)

      if(receita.error.hasError)
          return error    

      receita.doc = Object.assign(receita.doc, {id: idReceita})

      if(typeof receita.doc.homeopatias === 'undefined' 
          || receita.doc.homeopatias === null)
          receita.doc = Object.assign(receita.doc, {homeopatias: [homeopatia]})
      else
          receita.doc.homeopatias = [...receita.doc.homeopatias, homeopatia]
          
      console.log(' receita com as homeopatias', receita.doc.homeopatias)

      const {doc, error} = await manipulaDados.persist('receitas', receita.doc)
      console.log('receita atualizda', doc)

      dispatch( {type: 'edit_receita', payload: {id: doc.id, nome: doc.nome, homeopatias: doc.homeopatias}})
      callback()
  }
}

const editarHomeopatia = dispatch => {
  return async (idHomeopatia, idReceita, descricao, posologia, dinamizacao, dinamo, callback) => {
      const receita = await manipulaDados.retrieveById('receitas', '__name__', '==', idReceita )
      console.log('recuperou a receita', receita)

      if(receita.error.hasError)
          return error    

      receita.doc = Object.assign(receita.doc, {id: idReceita})

      if(receita.doc.homeopatias === undefined 
          || receita.doc.homeopatias === null)
          receita.doc = Object.assign(receita.doc, {homeopatias: [{
              id: idHomeopatia,
              descricao: descricao,
              posologia: posologia,
              dinamizacao: dinamizacao,
              dinamo: dinamo
          }]})
      else
          receita.doc.homeopatias = receita.doc.homeopatias.map( (homeopatia) => {
              if(homeopatia.id === idHomeopatia){
                  homeopatia.descricao = descricao
                  homeopatia.posologia = posologia
                  homeopatia.dinamizacao = dinamizacao
                  homeopatia.dinamo = dinamo
              }
              return homeopatia
          })
          
      console.log(' receita com as homeopatias', receita.doc.homeopatias)

      const {doc, error} = await manipulaDados.persist('receitas', receita.doc)
      console.log('receita atualizda', doc)
      dispatch( {type: 'edit_homeopatia', payload: {id: doc.id, idHomeopatia, homeopatia: doc}})
      callback()
  }

}

const removerHomeopatia = dispatch => {
    return async (id, callback) => {
        
    }
}

export const {Context, Provider} = CreateDataContext(pacienteReducer, {addHomeopatia, editarHomeopatia, removerHomeopatia, }, [])