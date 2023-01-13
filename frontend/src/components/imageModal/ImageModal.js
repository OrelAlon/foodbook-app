import React from "react";

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
      // fullScreen
      opened={openedImage}
      onClose={() => setOpenedImage("")}
    >
      <Image
        radius='md'
        src={img.img}
        alt={img.img}
        width={200}
        className='open-image'
      ></Image>
    </Modal>
  );
};

export default ImageModal;
