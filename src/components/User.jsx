import { useState, useEffect } from "react";
import { getUser } from "../../api";


function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUser().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <h1>Loading user...</h1>;
  }

  const filteredUser = users.filter((user) => user.username === "tickle122");

  return (
    <div className="flex items-center text-base text-2xl sm:text-xl">
      <h1 className="mr-1 ">User:</h1>
      <p className="text-orange-500"> {filteredUser[0].username}</p>
      <img className="border-2 border-2 border-gray-500 ml-2 mt-2 rounded-md"
        src={filteredUser[0].avatar_url}
        alt="avatar url"
        width={50}
        height={30}
      />
     
    </div>
    
  );
}

export default User;
