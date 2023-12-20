import { GrCalendar, GrLocation } from "react-icons/gr";

const Offense = ({ id, date, description, location }) => {
  return (
    <div className="w-3/4 shadow-sm p-5 hover:shadow-md">
      <div className="flex justify-between mb-2">
        <div>
          <div className="font-medium flex items-center gap-1">
            <GrCalendar /> <span className="font-light">{date}</span>
          </div>
          <div className="font-medium flex items-center gap-1">
            <GrLocation /> <span className="font-light">{location}</span>
          </div>
        </div>
        <div className="font-medium">
          File Number: <span className="font-light">{id}</span>
        </div>
      </div>
      <div className="text-neutral/[0.8]">{description}</div>
    </div>
  );
};

export default Offense;
