import { Modal, useMantineTheme } from "@mantine/core";

function ShareImageModal({ shareImageOpened, setShareImageOpened }) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={shareImageOpened}
      onClose={() => setShareImageOpened(false)}
    >
      {/* Modal content */}
      <form className='infoForm'>
        <h3>Your info</h3>

        <div>
          <input
            type='text'
            className='infoInput'
            name='FirstName'
            placeholder='First Name'
          />
        </div>
      </form>
    </Modal>
  );
}

export default ShareImageModal;
