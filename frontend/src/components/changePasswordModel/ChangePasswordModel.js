import { useContext, useState, useEffect } from "react";

import {
  Modal,
  useMantineTheme,
  Button,
  TextInput,
  Space,
} from "@mantine/core";

import axios from "axios";

function ChangePasswordModel({ changePasswordModel, setChangePasswordOpened }) {
  const theme = useMantineTheme();

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("dd");
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size='75%'
      opened={changePasswordModel}
      onClose={() => setChangePasswordOpened(false)}
    >
      {/* Modal content */}
      <form className='infoForm' onSubmit={submitHandler}>
        <TextInput
          placeholder='Password'
          label='Password'
          size='md'
          withAsterisk
          style={{ width: "40%", margin: "auto" }}
        />
        <Space h='lg' />

        <TextInput
          placeholder='Password'
          label='Confirm Password'
          size='md'
          withAsterisk
          style={{ width: "40%", margin: "auto" }}
        />
        <Space h='lg' />
        <div className='share-btn-div'>
          <Button
            color='green'
            size='md'
            onClick={submitHandler}
            style={{ margin: "auto" }}
          >
            SAVE
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ChangePasswordModel;
