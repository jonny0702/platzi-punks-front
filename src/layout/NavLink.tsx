import { ReactNode } from "react";
import { Link as DefaultLink, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
interface navLinkProps{
  children: string,
  to: string,
}

export const NavLink:React.FC<navLinkProps> = ({ children, to }) => (
  <DefaultLink
    px={2}
    py={1}
    as={Link}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    // {...props}
    to={to}
  >
    {children}
  </DefaultLink>
);
