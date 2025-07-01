import React, {useReducer} from 'react'

export default (reducer, actions, initialState) => {
    const Context = React.createContext()

    const Provider = ({children}) => {

        const [state, dispatch] = useReducer(reducer, initialState)

        const acoesVinculadas = {}

        // Ele não enxerga as propriedaes como algo "iterável" logo ele não faz
        // o For sem erro a não ser que veja como Propriedades
        for(let key of Object.keys(actions)){
            acoesVinculadas[key] = actions[key](dispatch)
        }

        return (
            <Context.Provider value={ {state, ...acoesVinculadas}}>
                {children}
            </Context.Provider>
        )
    }

    return {Context, Provider}
}