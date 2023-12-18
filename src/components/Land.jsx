const Land = ({ handleLogin }) => {
  return (
    <div className="bg-neutral/[0.6] h-screen flex flex-col items-center justify-center">
      <div className="text-xl mb-4">Grama Portal</div>
      <button
        className="bg-primary p-1 px-2 rounded-md text-white"
        onClick={handleLogin}
      >
        Log in
      </button>
    </div>
  );
};

export default Land;
