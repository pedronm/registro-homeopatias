import CreateDataContext from "./CreateDataContext.js"
import * as manipulaDados from '../hooks/manipulaDados.js'

const pacienteReducer = (state, action) =>{

    switch(action.type){
        case 'get_paciente': 
            return [...state, ...action.payload]
        case 'add_paciente':
            return [...state, { 
                id: action.payload.id,
                nome: action.payload.nome,
                homeopatias: []
            }]
        case 'edit_paciente':
            const updatedState = state.map( 
               (paciente) => {
                 if(paciente.id === action.payload.id){
                    console.log('dentro do mapa com o id ', action.payload.id)
                    paciente.nome = action.payload.nome
                    if(action.payload.homeopatias){
                      paciente.homeopatias = action.payload.homeopatias
                    }
                 }                
                return paciente 
            })
            return updatedState
        case 'remover_paciente' :
            return state.filter( (receita) => receita.id !== action.payload)
        case 'get_pacientes':
            const newPacientes = action.payload.filter(paciente => 
                {
                    return paciente.id !== undefined && paciente.id !== null
                }
            );

            state.forEach(
                ( pac )=> {
                   let newPac = newPacientes.find( p => p.id === pac.id)
                   if(newPac !== null && newPac !== undefined)
                     pac = newPac
                }
            )

            console.info('Sendo armazenado no state, dentro do context', [...state, ...newPacientes])
             
            return [...state, ...newPacientes]
        default :
            return state
    }
}
const getNumeroPaginas = dispatch => {
    return async (maxByPage) => {
        const {doc, error} = await manipulaDados.retrieveNumeroPaginas('pacientes', maxByPage)
        if (error.hasError) {
            console.log(error)
            return error.msg
        }
        dispatch({type: 'get_numero_paginas', payload: doc})
    }
}

const getPorPagina = dispatch => {
    return async (pagina, maxByPage) => {
        console.log(`maximo por pagina`, maxByPage)
        const {doc, error} = await manipulaDados
            .retrievePage('pacientes', pagina, maxByPage !== null 
                    && maxByPage !== undefined ? maxByPage : 10)
        console.log(`documento`, doc)
        if (error.hasError) {
            console.error(error)
            return error.msg
        }
        dispatch({type: 'get_pacientes', payload: doc})
    }
}

// Esse aqui é pra quando for trabalhart com o backend!
// const getPaciente = dispatch => async () => {
//     try {
//         // const response = await api.get(`/pacientes?page=${page}`)
//         // console.log(response)
//         const 
//         dispatch({ type: 'get_pacientes', payload: response.data })
//     } catch (err) {
//         console.error(err)
//     }
// }

const addPaciente = dispatch => {
    return async (nome, callback) => {

        console.log('Nome a ser gravado, antes do manipula dados', nome)
        const {doc, error} = await manipulaDados.persist('pacientes', {nome: nome})

        console.log(doc)

        if(error.hasError){
            console.log(error)
            return error.msg
        }        
        dispatch({type: 'add_paciente', payload: { id: doc.id, nome: doc.nome }})
        callback()
    }
}

const editarPaciente = dispatch => {
    return async (id, nome, callback ) => {
        const {doc, error} = await manipulaDados.update('pacientes', {id, nome})
        if(error.hasError){
            console.log(error)
            return error.msg
        }
        dispatch({type: 'edit_paciente', payload: { id: doc.id, nome: doc.nome}})
        callback()
    }
}

const removerPaciente = dispatch => {
    return (id) => {
        console.log(id)
        const {doc, error} = manipulaDados.remove('pacientes', id)
        console.log(`Isso que voltou ${doc} e isso ${erro}`)
        console.log(error)
        if(error.hasError){
            console.log(error)
            return error.msg
        }        
        dispatch({type: 'remover_paciente', payload: {id}})
    }
}


export const {Context, Provider} = CreateDataContext(
    pacienteReducer, 
    {addPaciente, editarPaciente, removerPaciente, getPorPagina, getNumeroPaginas,}, 
    []
)