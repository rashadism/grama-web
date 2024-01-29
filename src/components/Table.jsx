import { GrFormEdit } from "react-icons/gr";

const pending = [
  {
    requestID: 123,
    userID: "john123",
    reason: "Employment verification",
    requestTypeID: 2,
    policeCheckstatus: 3,
    identityCheckstatus: 3,
    addressCheckstatus: 3,
    character: "Good",
    statusID: 2,
    gramaID: "G123",
  },
  {
    requestID: 212,
    userID: "jane456",
    reason: "Rental application",
    requestTypeID: 1,
    policeCheckstatus: 2,
    identityCheckstatus: 3,
    addressCheckstatus: 3,
    character: null,
    statusID: 2,
    gramaID: "G456",
  },
  {
    requestID: 333,
    userID: "bob789",
    reason: "Volunteer screening",
    requestTypeID: 3,
    policeCheckstatus: 2,
    identityCheckstatus: 3,
    addressCheckstatus: 1,
    character: "Excellent",
    statusID: 2,
    gramaID: "G789",
  },
  {
    requestID: 456,
    userID: "alice101",
    reason: "Loan application",
    requestTypeID: 4,
    policeCheckstatus: 2,
    identityCheckstatus: 2,
    addressCheckstatus: 2,
    character: null,
    statusID: 1,
    gramaID: "G101",
  },
];

const cols = [
  "Request ID",
  "Username",
  "Identity Check",
  "Address Check",
  "Police Check",
  "Status",
  "",
];

const process = (val) => {
  if (typeof val === "boolean") {
    return (
      <span className={val ? "badge-green" : "badge-red"}>
        {val ? "passed" : "pending"}
      </span>
    );
  } else return val;
};

const map = (input) => {
  if (input === 1 || input === 2) {
    return false;
  } else if (input === 3) {
    return true;
  }
};

const Table = ({ handleClick }) => {
  return (
    <table className="table-auto">
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
        {pending.map((request) => {
          return (
            <tr
              className="hover:bg-neutral/[0.05] divide-y"
              key={request.requestID}
            >
              <td className="p-2 text-center">{process(request.requestID)}</td>
              <td className="p-2 text-center flex flex-col">
                {process(request.userID)}
              </td>
              <td className="p-2 text-center">
                {process(map(request.identityCheckstatus))}
              </td>
              <td className="p-2 text-center">
                {process(map(request.addressCheckstatus))}
              </td>
              <td className="p-2 text-center">
                {process(map(request.policeCheckstatus))}
              </td>
              <td className="p-2 text-center">
                {process(map(request.statusID))}
              </td>
              <td className="p-2 text-center text-xl">
                <GrFormEdit
                  className="hover:text-primary cursor-pointer"
                  onClick={() => handleClick(request)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
