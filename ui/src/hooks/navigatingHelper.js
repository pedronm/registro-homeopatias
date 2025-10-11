  // Vou modificar isso aqui tudo posteriormente
  // Aparentemnte o Alert é só em aplicativos
  // então o jeito é condicionar o alerta pra web e mobile!
  // já fiz isso, falta só generalizar aqui pros outros! 
  // vai funcionar bem aparentemnte o que eu achei que era um erro de contexto era 
  // essa uqestão de mobile e desktop
  export const useBackHandlerWithAlert = (navigation, {alerta, backHandler, useEffect}) => {
        useEffect(() => {
            const backAction = () => {
                alerta.alert(
                    "Atenção!",
                    "As alterações não salvas serão perdidas. Deseja realmente sair?",
                    [
                        {
                            text: "Cancelar",
                            onPress: () => null,
                            style: "cancel"
                        },
                        { text: "Sim", onPress: () => navigation.pop() }
                    ]
                );z
                return true;
            };

            backHandler.addEventListener("hardwareBackPress", backAction);
            backHandler.addEventListener("backPress", backAction);

            return () => {
              backHandler.removeEventListener("hardwareBackPress", backAction)
              backHandler.removeEventListener("backPress", backAction)
            };
        }, [navigation]);
    };

    exports = {
      useBackHandlerWithAlert
    }