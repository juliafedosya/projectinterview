import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
  },
  previewTextBold: {
    letterSpacing: -0.17,
    fontWeight: 'bold'
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: "1.5rem",
    marginTop: "0.5rem",
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;
  const unseenCount = conversation.unseenCount;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Box fontWeight="fontWeightBold">
        <Typography className={[classes.previewText, unseenCount > 0 ? classes.previewTextBold : '']}>
          {latestMessageText}
        </Typography>
        </Box>
      </Box>
      {unseenCount > 0 && (
        <Typography className={classes.notification}>{unseenCount}</Typography>
      )}
    </Box>
  );
};

export default ChatContent;
