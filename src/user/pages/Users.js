import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Chris Williams",
      image:
        "https://thumbs.dreamstime.com/z/beautiful-happy-reddish-havanese-puppy-dog-sitting-frontal-looking-camera-isolated-white-background-46868560.jpg",
      places: 5,
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
