import { useFlowContext } from "../contexts/FlowContext";
import { useViewContext } from "../contexts/ViewContext";
import Table from "./Table";



const Home = () => {
  const { derivedAuthenticationState } = useViewContext();
  const { step, setStep} = useFlowContext();

  return (
    <div className="bg-neutral/[0.2] px-24 py-12 flex flex-grow flex-col justify-start gap-4 max-h-screen overflow-auto">
      <Table />
    </div>
  );
};
export default Home;
