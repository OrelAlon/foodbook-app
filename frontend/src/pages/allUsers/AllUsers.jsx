import React, { useEffect, useState } from "react";

import axios from "axios";

import NavBar from "../../components/navBar/NavBar";
import UserCard from "../../components/userCard/UserCard";
import { IconSquarePlus, IconSearch } from "@tabler/icons";
import { Input } from "@mantine/core";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/api/users/users`);
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <NavBar />

      <div className='restaurantSContainer'>
        <div className='center-div'>
          <h1 style={{ display: "inline-block" }}>Users</h1>
        </div>

        <Input
          icon={<IconSearch size={16} />}
          onChange={setSearchUser}
          placeholder='Search By user...'
          clearable
          style={{ width: "80%", margin: "auto" }}
        />
        <div className='restaurantsCards'>
          {users
            .filter((user) => {
              return searchUser.toLowerCase() === ""
                ? user
                : user.username.toLowerCase().includes(searchUser);
            })
            .map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
