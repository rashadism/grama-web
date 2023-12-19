import { useFlowContext } from "../contexts/FlowContext";
import { useViewContext } from "../contexts/ViewContext";
import { useState } from "react";
import Table from "./Table";
import Editor from "./Editor";

const Home = () => {
  const { derivedAuthenticationState } = useViewContext();
  const { step, setStep } = useFlowContext();
  const [editor, setEditor] = useState(false);

  const { user, setUser } = useFlowContext();
  const { setSection } = useViewContext();

  const handleClick = (request) => {
    setUser({ nic_number: request.nic_number });
    if (!request.identity_check) {
      setEditor(false);
      setSection("Identity");
    } else if (!request.police_check) {
      setEditor(false);
      setSection("Police");
    } else if (!request.status) {
      setEditor(true);
    }
  };

  return (
    <div className="bg-neutral/[0.2] px-24 py-12 flex flex-grow flex-col justify-start gap-4 max-h-screen overflow-auto">
      {editor ? <Editor />: <Table handleClick={handleClick} />}
    </div>
  );
};
export default Home;
