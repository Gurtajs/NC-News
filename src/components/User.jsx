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

  const filteredUser = users.filter((user) => user.username === "grumpy19");

  return (
    <>
      <h1 className="mr-1">User:</h1>
      <p> {filteredUser[0].username}</p>
      <img className="border-2 border-black ml-2 mt-2 rounded-md"
        src={filteredUser[0].avatar_url}
        alt="avatar url"
        width={30}
        height={20}
      />
    </>
  );
}

export default User;
