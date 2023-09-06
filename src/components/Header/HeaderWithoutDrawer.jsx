import { Flex, Image, Box } from "@chakra-ui/react";
import React from "react";
import MainLogoPhoto from "./MainLogo.png";

function HeaderWithoutDrawer() {
  const header_style = {
    position: "sticky", // Can be remove
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "30px",
    padding: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    top: 0,
    boxShadow: "-1px 1px 23px 0px rgba(0,0,0,0.1)",
    zIndex: 1,
  };
  return (
    <>
      <Box sx={header_style}>
        <Flex align="center" justify="space-between">
          <Box>
            <Image src={MainLogoPhoto} loading="lazy" alt="Logo" h={8} />
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default HeaderWithoutDrawer;
