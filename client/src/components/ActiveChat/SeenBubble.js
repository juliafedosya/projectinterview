import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  avatar: {
    height: 19,
    width: 19,
    marginTop: '0.5rem'
  },
}));

const SeenBubble = (props) => {
    const classes = useStyles();
    const { otherUser } = props;
    return (
      <Box className={classes.root}>
        <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      </Box>
    );
  };

export default SeenBubble;