import { Modal, useMantineTheme, Image } from "@mantine/core";

const ImageModal = ({ openedImage, setOpenedImage, img }) => {
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
      size='80%'
      fullScreen
      opened={openedImage}
      onClose={() => setOpenedImage(false)}
    >
      <Image radius='md' src={img} alt='img in big'></Image>
    </Modal>
  );
};

export default ImageModal;
