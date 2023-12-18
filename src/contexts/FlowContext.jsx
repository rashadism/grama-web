import { createContext, useContext, useState } from "react";

const FlowContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const FlowContextProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [addressCheck, setAddressCheck] = useState(false);
  const [identityCheck, setIdentityCheck] = useState(false);
  const [policeCheck, setPoliceCheck] = useState(false);
  const [user, setUser] = useState({});

  return (
    <FlowContext.Provider
      value={{
        step,
        setStep,
        addressCheck,
        setAddressCheck,
        identityCheck,
        setIdentityCheck,
        policeCheck,
        setPoliceCheck,
        user,
        setUser,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFlowContext = () => {
  const context = useContext(FlowContext);
  if (!context) {
    console.log("useFlowContext should be inside FlowContextProvider");
  }
  return context;
};
