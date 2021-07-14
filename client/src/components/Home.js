import React, { useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, CssBaseline, Button } from "@material-ui/core";
import { SidebarContainer } from "./Sidebar";
import { ActiveChat } from "./ActiveChat";
import { logout, fetchConversations } from "../store/utils/thunkCreators";
import { clearOnLogout } from "../store/index";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "97vh",
  }
}));

const Home = (props) => {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useSelector((state) => ({
    user: state.user,
  }));
  const [prevUserId, setPrevUserId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if(user.id !== prevUserId) {
      setIsLoggedIn(true);
      setPrevUserId(user.id);
    }
  }, [prevUserId, setPrevUserId, user, setIsLoggedIn]);

  const handleLogout = useCallback(() => {
    dispatch(logout(user.id));
    dispatch(clearOnLogout());
  }, [dispatch, user]);

  if (!user.id) {
    // If we were previously logged in, redirect to login instead of register
    if (isLoggedIn) return <Redirect to="/login" />;
    return <Redirect to="/register" />;
  }
  return (
    <>
      {/* logout button will eventually be in a dropdown next to username */}
      <Button className={classes.logout} onClick={handleLogout}>
        Logout
      </Button>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <SidebarContainer />
        <ActiveChat />
      </Grid>
    </>
  );
}

export default Home;
