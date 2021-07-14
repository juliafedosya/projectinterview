import React, { useCallback} from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { setActiveChat } from "../../store/activeConversation";
import { markMsgsSeen } from "../../store/utils/thunkCreators";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab",
    },
  },
}));

const Chat = (props) => {
  const classes = useStyles();
  const otherUser = props.conversation.otherUser;
  const dispatch = useDispatch();

  const handleClick = useCallback((conversation) => {
    dispatch(setActiveChat(conversation.otherUser.username));
    if (conversation.unseenCount > 0) {
      dispatch(markMsgsSeen(conversation.otherUser.id, conversation.id));
    }
  }, [dispatch]);
  return (
    <Box
      onClick={() => handleClick(props.conversation)}
      className={classes.root}
    >
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={props.conversation} />
    </Box>
  );
}

export default Chat;
