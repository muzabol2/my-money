import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MenuButton = styled(IconButton)(() => ({
  background: "none",
  border: "2px solid #1f9751",
  color: "#1f9751",
  backgroundColor: "#fff",
  fontWeight: "bold",
  "&:hover": {
    color: "#fff",
    backgroundColor: "#1f9751",
  },
}));
