import {
  Card,
  Container,
  Dialog,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useReducer, useState } from "react";
import state from "../../state";
import { IChannel, IMessage } from "../../types";
import ChatForm from "./ChatForm";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      backgroundColor: theme.palette.primary.main,
      height: "100%",
      maxWidth: "100vw",
      minHeight: "100vh",
      paddingTop: "25px",
      paddingBottom: "0px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    list: {
      paddingTop: "48px",
      // 100vh - form height - container padding - list padding
      height: "calc(100vh - 125px - 25px - 48px)",
      overflow: "auto",
      display: "flex",
      flexDirection: "column-reverse",
    },
    mine: {
      justifyContent: "flex-end",
    },
    else: {},
    messageCard: {
      wordBreak: "break-all",
      backgroundColor: theme.palette.secondary.main,
      padding: "0.2rem",
      marginLeft: "0.35rem",
    },
  };
});

const initialState = {
  messages: [],
};

type ReducerType = "add" | "reset";

const reducer = (
  state: any,
  action: { type: ReducerType; payload?: IMessage }
) => {
  switch (action.type) {
    case "add":
      return {
        messages: [action.payload, ...state.messages],
      };
    case "reset":
      return {
        messages: [],
      };
  }
};

interface MainChatAreaProps {
  isLoggedIn: boolean;
}

const MainChatArea = ({ isLoggedIn }: MainChatAreaProps) => {
  const [messagesState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    state.local.get("currentChannel").on((channel) => {
      if (!channel || !channel.name) return;
      dispatch({ type: "reset" });

      if (!channel || !channel.name) return;

      console.log("changed channel", channel);
      state.public
        .get("channels")
        .get(channel.name)
        .get("messages")
        .map()
        .on((msg: IMessage, key: string) => {
          console.log(key);
          if (!msg.id || !msg.from || !msg.text || !msg.timestamp || !msg.to)
            return;
          console.log("incoming msg", msg);
          dispatch({ type: "add", payload: msg });
        }, true);
    });
    // TODO
    // we listen to isLoggedIn because the first render doesn't call the event listeners for some reason
    // so we need this for when the user first logs in.
    // We should find a different method...
  }, [isLoggedIn]);

  // cleanup
  // return state.public.get("channels").off();
  const classes = useStyles();

  const Message = ({ id, from, text, timestamp, to }: IMessage) => {
    const date = new Date(timestamp);
    const mine = from === state.local.user().pair().pub;
    return (
      <ListItem className={mine ? classes.mine : classes.else}>
        <Typography>
          {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
        </Typography>
        <Card className={classes.messageCard}>
          <Typography variant="body1">{text}</Typography>
        </Card>
      </ListItem>
    );
  };

  return (
    <Container className={classes.container}>
      <div className={classes.list}>
        {[...new Set(messagesState.messages)].map((msg) => {
          return <Message {...msg} />;
        })}
      </div>
      <ChatForm />
    </Container>
  );
};

export default MainChatArea;
