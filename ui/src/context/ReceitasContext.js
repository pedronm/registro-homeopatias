import CreateDataContext from "./CreateDataContext"

const receitaReducer = (state, action) =>{

    switch(action.type){
        case 'add_receita':
            return [...state, {}]
        case 'edit_receita':
        
        case 'remover_receita' :

        default :
            return state
    }
}

const addReceita = dispatch => {
    return () => {
        dispatch({type: 'add_receita', payload: receita})
    }
}

const editReceita = dispatch => {
    return (id, receita ) => {
        dispatch({type: 'edit_receita', payload: receita})
    }
}

export const {Context, Provider} = CreateDataContext(receitaReducer, {addReceita}, [])