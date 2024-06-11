import { Link } from "react-router-dom";
import User from "./User";
function Header() {
  return (
    <div className="pl-20 flex justify-between mb-10">
      <Link to="/">
        <h1 className="text-3xl font-bold mt-2 min-w-[130px]">NC News</h1>
      </Link>
      <div className="flex items-center mr-[100px]">
        <User />
      </div>
    </div>
  );
}

export default Header;
