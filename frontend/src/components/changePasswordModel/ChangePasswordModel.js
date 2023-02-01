import { useContext, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  Modal,
  useMantineTheme,
  Button,
  PasswordInput,
  Space,
  Stack,
  Loader,
} from "@mantine/core";

import { changeUserPassword } from "../../api/ApiPostHandle";

function ChangePasswordModel({ changePasswordModel, setChangePasswordOpened }) {
  const [visible, { toggle }] = useDisclosure(false);
  const { user } = useContext(AuthContext);

  const theme = useMantineTheme();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState(user._id);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setErrorMsg("Password don't match...");
    }
    try {
      setErrorMsg("");
      setLoading(true);

      // Send a request to the server to update the password
      const res = await changeUserPassword(newPassword, userId);
      setSuccess(res.data.message);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.res.data.error);
    }
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
      size='85%'
      opened={changePasswordModel}
      onClose={() => setChangePasswordOpened(false)}
    >
      {/* Modal content */}
      <form className='infoForm' onSubmit={submitHandler}>
        <Stack sx={{ maxWidth: 480 }} mx='auto'>
          <PasswordInput
            description='Password must be at least 6 character'
            placeholder='Password'
            label='Password'
            size='md'
            withAsterisk
            style={{ width: "80%", margin: "auto" }}
            visible={visible}
            onVisibilityChange={toggle}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <PasswordInput
            placeholder='Password'
            label='Confirm Password'
            size='md'
            withAsterisk
            style={{ width: "80%", margin: "auto" }}
            visible={visible}
            onVisibilityChange={toggle}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Stack>
        {errorMsg && <div className='error msg'>{errorMsg}</div>}
        {success && <div className='success msg'>{success}</div>}
        <div className='center-div'>{loading && <Loader />}</div>

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
