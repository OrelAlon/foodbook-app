import { Modal, useMantineTheme, Image } from "@mantine/core";
import TagPost from "../tagPost/TagPost";

const ImageModal = ({ openedImage, setOpenedImage, img }) => {
  console.log(img);

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
      {/* <ul className='tags '>
      {img.length>0&& {img.foodCategory.map((el, i) => (
          <TagPost key={i} el={el} />
        ))}
      </ul>
      <ul className='tags'>
        {img.dishType.map((el, i) => (
          <TagPost key={i} el={el} />
        ))}
      </ul> */}
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
