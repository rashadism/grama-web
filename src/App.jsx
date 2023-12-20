import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import { useViewContext } from "./contexts/ViewContext";
import Police from "./components/Police";
import Identity from "./components/Identity";
import Address from "./components/Address";
import NotFound from "./components/NotFound";
import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState, useCallback } from "react";
import Land from "./components/Land";
import { FlowContextProvider } from "./contexts/FlowContext";

function App() {
  const { state, signIn, getBasicUserInfo, getIDToken, getDecodedIDToken, on } =
    useAuthContext();

  const { derivedAuthenticationState, setDerivedAuthenticationState, section } =
    useViewContext();
  const [hasAuthenticationErrors, setHasAuthenticationErrors] = useState(false);
  const [hasLogoutFailureError, setHasLogoutFailureError] = useState();

  useEffect(() => {
    if (!state?.isAuthenticated) {
      return;
    }

    (async () => {
      const basicUserInfo = await getBasicUserInfo();
      const idToken = await getIDToken();
      const decodedIDToken = await getDecodedIDToken();
      // console.log("basicUserInfo", basicUserInfo)
      // console.log("idToken", idToken)
      // console.log("decodedIDToken", decodedIDToken)

      const derivedState = {
        authenticateResponse: basicUserInfo,
        idToken: idToken.split("."),
        decodedIdTokenHeader: JSON.parse(atob(idToken.split(".")[0])),
        decodedIDTokenPayload: decodedIDToken,
      };

      setDerivedAuthenticationState(derivedState);
    })();
  }, [state.isAuthenticated, getBasicUserInfo, getIDToken, getDecodedIDToken]);

  const handleLogin = useCallback(() => {
    console.log("clicked log in");
    setHasLogoutFailureError(false);
    signIn().catch(() => console.log("asd"));
  }, [signIn]);


  return (
    <>
      {state.isAuthenticated ? (
        <div className="h-screen flex flex-row font-display divide-x">
          <Sidebar />

          {section === "Home" ? (
            <FlowContextProvider>
              <Home />
            </FlowContextProvider>
          ) : section === "Police" ? (
            <FlowContextProvider>
              <Police />
            </FlowContextProvider>
          ) : section === "Identity" ? (
            <Identity />
          ) : section === "Address" ? (
            <Address />
          ) : (
            <NotFound />
          )}
        </div>
      ) : (
        <Land handleLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
