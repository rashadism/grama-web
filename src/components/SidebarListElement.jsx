import { useState } from "react";
import { useViewContext } from "../contexts/ViewContext";

// eslint-disable-next-line react/prop-types
const SidebarListElement = ({ title, icon: Icon, view }) => {
	// Context for active
	const { section, setSection } = useViewContext();
	// console.log("key", key)

	return (
		<a
			className={`flex gap-4 items-center pl-8 cursor-pointer p-3 hover:bg-primary/[0.04] hover:text-primary ${
				view === section &&
				"border-l-4 border-primary bg-primary/[0.04] text-primary"
			}`}
			onClick={() => setSection(view)}
		>
			<div className="flex gap-4 items-center">
				<Icon className="" />
				<span className="text-black">{title}</span>
			</div>
		</a>
	);
};
export default SidebarListElement;
