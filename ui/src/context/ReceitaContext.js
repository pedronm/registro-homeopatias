import CreateDataContext from "./CreateDataContext";
import manipulaDados from "./../hooks/manipulaDados";

export const receitaReducer = (state, action) => {
  switch (action.type) {
    case 'add_receita':
      return [...state, action.payload];
    case 'editar_receita':
      state.map( (receita) => {
          if(receita.id === action.payload.id){
            return action.payload
          }                
        return receita 
      })
    case 'remover_receita':
    default:
      return state;
  }
};

const addReceita = dispatch => {
  return async (pacienteId, receita) => {
    console.log(`Id do paciente ${pacienteId} e payload da receita ${receita}`)
    try {
      if (pacienteId && receita) {
        // Attach the pacienteId to the receita object
        const payload = {  pacienteId, receita };
        console.log(payload)
        const { doc, error } = await manipulaDados.persist('receita', payload);

        if (!error.hasError) {
          dispatch({ type: 'add_receita', payload: doc });
        } else {
          console.error("Error adding receita:", error.msg);
        }
      } else {
        console.error("Paciente ID or receita data is missing.");
      }
    } catch (err) {
      console.error("Error in addReceita:", err);
    }
  };
};

const editarReceita = dispatch => {
  return async (pacienteId, receita) => {
    try {
      if (pacienteId && receita) {
        // Attach the pacienteId to the receita object
        const payload = { ...receita, pacienteId };
        const { doc, error } = await manipulaDados.update('receita', payload);

        if (!error.hasError) {
          dispatch({ type: 'editar_receita', payload: doc });
        } else {
          console.error("Error editing receita:", error.msg);
        }
      } else {
        console.error("Paciente ID or receita data is missing.");
      }
    } catch (err) {
      console.error("Error in editarReceita:", err);
    }
  };
};

const removerReceita = dispatch => {
  return async (pacienteId, receitaId) => {
    try {
      if (pacienteId && receitaId) {
        const refPath = `receita/${receitaId}`;
        const { error } = await manipulaDados.remove(refPath);

        if (!error.hasError) {
          dispatch({ type: 'remover_receita', payload: receitaId });
        } else {
          console.error("Error removing receita:", error.msg);
        }
      } else {
        console.error("Paciente ID or receita ID is missing.");
      }
    } catch (err) {
      console.error("Error in removerReceita:", err);
    }
  };
};

export const { Context, Provider } = CreateDataContext(
  receitaReducer,
  { addReceita, editarReceita, removerReceita },
  []
);