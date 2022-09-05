import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const RoomCard = ({ title }) => {
  return (
    <Grid item xs={6} sm={4} md={4} lg={3}>
      <Box
        sx={{
          p: 2,
          minHeight: "120px",
          border: "1px solid grey",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            border: "1px solid blue",
            cursor: "pointer",
          },
        }}
      >
        <Link
          to={`/click?roomId=${title.replace(/\s/g, "")}`}
          className="room-card-link"
        >
          <Typography component="h3" gutterBottom textAlign="center">
            {title}
          </Typography>
        </Link>
      </Box>
    </Grid>
  );
};

export default RoomCard;
