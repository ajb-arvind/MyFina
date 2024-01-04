import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function Copyright(props) {
  return (
    <Typography
      variant="subtitle2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"© "}
      <Link
        color="inherit"
        href="https://mui.com/"
        style={{ textDecoration: "none" }}
      >
        MyFinance
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
