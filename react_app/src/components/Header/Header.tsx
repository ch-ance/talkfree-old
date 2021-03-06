import { AppBar, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import state from "../../state";
import { IChannel } from "../../types";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      backgroundColor: theme.palette.primary.main,
      paddingTop: "12px",
      paddingBottom: "12px",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
    logoutBtn: {
      width: "100px",
    },
  };
});

interface HeaderProps {
  isLoggedIn: boolean;
}

const Header = ({ isLoggedIn }: HeaderProps) => {
  const [currentChannel, setCurrentChannel] = useState<IChannel>();
  const classes = useStyles();

  useEffect(() => {
    state.local.get("currentChannel").on((channel) => {
      if (!channel.name) return;
      console.log("currently in channel", channel);
      setCurrentChannel(channel);
    });

    // return state.local.get("currentChannel").off();
  }, [isLoggedIn]);

  return (
    <AppBar className={classes.container}>
      <Typography>{currentChannel?.name}</Typography>
      <Button
        className={classes.logoutBtn}
        onClick={() => {
          state.local.user().leave();
        }}
      >
        Log out
      </Button>
    </AppBar>
  );
};

export default Header;
