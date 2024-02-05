import { createContext, useContext, useState } from "react";

const ViewContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const ViewContextProvider = ({ children }) => {
  const [section, setSection] = useState("Home");
  const [editor, setEditor] = useState(false);
  const [derivedAuthenticationState, setDerivedAuthenticationState] = useState(
    {}
  );
  const [user, setUser] = useState({});

  return (
    <ViewContext.Provider
      value={{
        editor,
        setEditor,
        section,
        setSection,
        derivedAuthenticationState,
        setDerivedAuthenticationState,
        user,
        setUser,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useViewContext = () => {
  const context = useContext(ViewContext);
  if (!context) {
    console.log("useViewContext should be inside ViewContextProvider");
  }
  return context;
};
