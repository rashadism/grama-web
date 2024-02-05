import { useViewContext } from "../contexts/ViewContext";
import { useState } from "react";
import Table from "./Table";
import Editor from "./Editor";

const map = (input) => {
  if (input === 1 || input === 2) {
    return false;
  } else if (input === 3) {
    return true;
  }
};

const Home = () => {
  const { user, setUser, editor, setEditor } = useViewContext();
  const { setSection } = useViewContext();

  const handleClick = (request) => {
    setUser(request);
    if (!map(request.identityCheckstatus)) {
      setEditor(false);
      setSection("Identity");
      console.log(request);
    } else if (!map(request.addressCheckstatus)) {
      setEditor(false);
      setSection("Address");
    } else if (!map(request.policeCheckstatus)) {
      setEditor(false);
      setSection("Police");
    } else if (!map(request.statusID)) {
      setEditor(true);
    }
  };

  return (
    <div className="bg-neutral/[0.2] px-24 py-12 flex flex-grow flex-col justify-start gap-4 max-h-screen overflow-auto">
      {editor ? <Editor /> : <Table handleClick={handleClick} />}
    </div>
  );
};
export default Home;
