import { createContext, useContext, useState } from "react";

const ViewContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const ViewContextProvider = ({ children }) => {
	const [section, setSection] = useState("Police");
	return (
		<ViewContext.Provider value={{ section, setSection }}>
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
