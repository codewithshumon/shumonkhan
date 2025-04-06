import LoadingPage from "../landing/LoadingPage";

const Header = () => {
  return (
    <div className="flex flex-row items-center p-4 bg-gray-800">
      <div className="mr-4">
        <LoadingPage isStatic />
      </div>
      <div className="flex space-x-4 text-white">
        <div>Work</div>
        <div>About</div>
        <div>Contact</div>
      </div>
    </div>
  );
};

export default Header;
