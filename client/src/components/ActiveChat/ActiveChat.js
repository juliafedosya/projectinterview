import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages, SeenBubble } from "./index";
import { connect } from "react-redux";

function isLastMessageSeen(conversation, user) {
  if(conversation) {
    const messages = conversation.messages;
    if(messages?.length > 0 && user) {
      const lastMessage = messages[messages.length -1];
      if(lastMessage.senderId === user.id) {
        return lastMessage.seen;
      }
    }
  }
  return false;
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};
  const displaySeenBubble = isLastMessageSeen(conversation, user);
  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Box>
              <Messages
                messages={conversation.messages}
                otherUser={conversation.otherUser}
                userId={user.id}
              />
              {displaySeenBubble && (<SeenBubble
                otherUser = {conversation.otherUser}>
              </SeenBubble>)}
            </Box>
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
              unseenCount = {conversation.unseenCount}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
