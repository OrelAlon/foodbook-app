import { Modal, useMantineTheme } from "@mantine/core";

function Demo() {
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
    >
      {/* Modal content */}
    </Modal>
  );
}
