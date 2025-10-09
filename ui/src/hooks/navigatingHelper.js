  // Yes, you can extract that logic into a custom hook in another file.
  // For example, create a file called useBackHandlerWithAlert.js:
  
  const useBackHandlerWithAlert = (navigation) => {
        useEffect(() => {
            const backAction = () => {
                Alert.alert(
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
                );
                return true;
            };

            BackHandler.addEventListener("hardwareBackPress", backAction);

            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [navigation]);
    };

    exports = {
      useBackHandlerWithAlert
    }