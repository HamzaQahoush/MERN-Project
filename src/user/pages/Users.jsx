import React from "react";
import UserList from "../components/UsersList";
function Users() {
  const Users = [
    {
      id: 'u1',
      name: "Hamza Qahoush",
      image: "https://avatars.githubusercontent.com/u/79087330?v=4",
      places: 3,
    },
  ];
  return <UserList items={Users} />;
}

export default Users;
