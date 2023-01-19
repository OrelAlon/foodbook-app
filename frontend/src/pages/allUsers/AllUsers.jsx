import React, { useEffect, useState } from "react";

import axios from "axios";

import NavBar from "../../components/navBar/NavBar";
import UserCard from "../../components/userCard/UserCard";
import Loading from "../../components/loading/Loading";
import { IconSearch } from "@tabler/icons";
import { Input } from "@mantine/core";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [loading, setLoading] = useState(true);

  const searchLowerCase = searchUser.toLowerCase();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/api/users/users`);
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
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
          onChange={(e) => setSearchUser(e.target.value)}
          placeholder='Search By User...'
          style={{ width: "80%", margin: "auto" }}
          styles={{ input: { "&::placeholder": { textAlign: "center" } } }}
        />

        {loading ? (
          <Loading />
        ) : (
          <div className='restaurantsCards'>
            {users
              .filter((user) => {
                return searchLowerCase === ""
                  ? user
                  : user.username.toLowerCase().includes(searchLowerCase);
              })
              .map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllUsers;
