import React, { useState, useCallback } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import { markMsgsSeen } from "../../store/utils/thunkCreators";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  root: {
      justifySelf: "flex-end",
      marginTop: 15,
    },
    input: {
      height: 70,
      backgroundColor: "#F4F6FA",
      borderRadius: 8,
      marginBottom: 20,
    },
}));

const Input = ({ conversationId, otherUser, unseenCount}) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    user: state.user,
  }));

  const handleFocus = useCallback(() => {
    if(unseenCount > 0) {
      dispatch(markMsgsSeen(otherUser.id, conversationId));
    }
  }, [unseenCount, otherUser, conversationId, dispatch]);

  const handleChange = useCallback((event) => {
    setText(event.target.value);
  }, [setText]);

  const handleSubmit = useCallback ((event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId: conversationId,
      sender: conversationId ? null : user,
    };
    dispatch(postMessage(reqBody));
    setText("");
  }, [otherUser, conversationId, setText, dispatch, user]);

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          onFocus={handleFocus}
        />
      </FormControl>
    </form>
  );
}

export default Input;
