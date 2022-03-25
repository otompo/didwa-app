import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import ScreensNav from "./components/nav/ScreensNav";
import authStorage from "./context/storage";
import AppLoading from "expo-app-loading";
import { AuthContext, AuthProvider } from "./context/authContext";
import { RestaurantProvider } from "./context/restaurant";

export default function RootNavigation() {
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.token !== "" && state.user !== null;
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    restoreUser();
  }, []);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    // if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  return (
    <NavigationContainer>
      <AuthProvider>
        <RestaurantProvider>
          {authenticated ? <ScreensNav /> : <ScreensNav />}
        </RestaurantProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
