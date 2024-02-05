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
  const { derivedAuthenticationState } = useViewContext();
  const { idUser, setIdUser } = useViewContext();
  const [editor, setEditor] = useState(false);
  const [address, setAddress] = useState(false);

  const { user, setUser } = useViewContext();
  const { setSection } = useViewContext();

  const handleClick = (request) => {
    setUser(request);
    if (!map(request.identityCheckstatus)) {
      setEditor(false);
      setSection("Identity");
      console.log(request);
      setIdUser(request);
    } else if (!map(request.addressCheckstatus)) {
      setEditor(false);
      setSection("Address");
    } else if (!map(request.policeCheckstatus)) {
      // setUser({ nic_number: request.nic_number });
      setEditor(false);
      setSection("Police");
    } else if (!map(request.statusID)) {
      setEditor(true);
    }
  };

  const Address = () => {
    return (
      <div className="bg-neutral/[0.2] px-24 py-24 flex flex-grow flex-col justify-start gap-4 max-h-screen overflow-auto">
        <div className="flex flex-col gap-4">Address</div>
      </div>
    );
  };

  return (
    <div className="bg-neutral/[0.2] px-24 py-12 flex flex-grow flex-col justify-start gap-4 max-h-screen overflow-auto">
      {address ? (
        <Address />
      ) : editor ? (
        <Editor />
      ) : (
        <Table handleClick={handleClick} />
      )}
    </div>
  );
};
export default Home;
