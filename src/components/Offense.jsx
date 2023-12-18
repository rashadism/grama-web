const Offense = ({ id, date, description }) => {
  return (
    <div className="w-3/4 shadow-sm p-5 hover:shadow-md">
      <div className="flex justify-between mb-2">
        <div className="font-medium">
          Offense ID: <span className="font-light">{id}</span>
        </div>
        <div className="font-medium">
          Date: <span className="font-light">{date}</span>
        </div>
      </div>
      <div className="text-neutral/[0.8]">{description}</div>
    </div>
  );
};

export default Offense;
