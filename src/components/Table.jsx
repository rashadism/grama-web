import { GrFormEdit } from "react-icons/gr";
import { useFlowContext } from "../contexts/FlowContext";
import { useViewContext } from "../contexts/ViewContext";

const pending = [
    {
      request_id: "4321",
      name: "Mohamed Rashad",
      nic_number: "200023402567",
      identity_check: true,
      address_check: false,
      police_check: false,
      status: true,
    },
    {
      request_id: "4322",
      name: "Aisha Ahmed",
      nic_number: "200045612345",
      identity_check: true,
      address_check: true,
      police_check: true,
      status: false,
    },
    {
      request_id: "4323",
      name: "John Doe",
      nic_number: "200078901234",
      identity_check: true,
      address_check: true,
      police_check: true,
      status: true,
    },
    {
      request_id: "4324",
      name: "Sara Smith",
      nic_number: "200056789012",
      identity_check: false,
      address_check: false,
      police_check: false,
      status: false,
    },
  ];

  
  
  const cols = [
    "Request ID",
    "Name",
    "Identity Check",
    "Address Check",
    "Police Check",
    "Status",
    ""
  ];
  
  const process = (val) => {
    if (typeof val === "string") {
      return val;
    } else if (typeof val === "boolean") {
      return (
        <span className={val ? "badge-green" : "badge-red"}>
          {val ? "passed" : "pending"}
        </span>
      );
    }
  };

const Table = ({handleClick}) => {
    
  return (
    <table class="table-auto">
        <thead>
          <tr className="text-center bg-primary/[0.8] text-white text-sm">
            {cols.map((col) => (
              <th className="p-1 font-medium" key={col}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pending.map((request) => (
            <tr className="hover:bg-neutral/[0.05] divide-y" key={request.id}>
              <td className="p-2 text-center">{process(request.request_id)}</td>
              <td className="p-2 text-center flex flex-col">
                <div className="text-left">{process(request.name)}</div>
                <div className="text-left text-sm text-neutral">
                  {process(request.nic_number)}
                </div>
              </td>
              <td className="p-2 text-center">
                {process(request.identity_check)}
              </td>
              <td className="p-2 text-center">
                {process(request.address_check)}
              </td>
              <td className="p-2 text-center">
                {process(request.police_check)}
              </td>
              <td className="p-2 text-center">{process(request.status)}</td>
              <td className="p-2 text-center text-xl"><GrFormEdit className="hover:text-primary cursor-pointer" onClick={() => handleClick(request)}/></td>

            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default Table