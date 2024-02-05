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
import Spinner from "./components/Spinner";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const notify = (val) => {
    if (val) {
      toast.success("Success :)");
    } else {
      toast.error("Error :(");
    }
  };
  const {
    state,
    signIn,
    getBasicUserInfo,
    getIDToken,
    getDecodedIDToken,
    getAccessToken,
  } = useAuthContext();

  const { derivedAuthenticationState, setDerivedAuthenticationState, section } =
    useViewContext();
  const [hasLogoutFailureError, setHasLogoutFailureError] = useState();

  console.log("access token", getAccessToken());
  useEffect(() => {
    if (!state?.isAuthenticated) {
      return;
    }

    (async () => {
      const basicUserInfo = await getBasicUserInfo();
      const idToken = await getIDToken();
      const decodedIDToken = await getDecodedIDToken();
      // console.log("decodedIDToken", decodedIDToken);

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
    setHasLogoutFailureError(false);
    signIn().catch((e) => alert(e));
  }, [signIn]);

  return (
    <>
      {state.isAuthenticated ? (
        <div className="h-screen flex flex-row font-display divide-x">
          <Sidebar />

          {section === "Home" ? (
            <Home notify={notify} />
          ) : section === "Police" ? (
            <Police notify={notify} />
          ) : section === "Identity" ? (
            <Identity notify={notify} />
          ) : section === "Address" ? (
            <Address notify={notify} />
          ) : (
            <NotFound />
          )}
        </div>
      ) : state.isLoading ? (
        <div className="bg-neutral/[0.6] h-screen flex flex-grow items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <Land handleLogin={handleLogin} />
      )}
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default App;
