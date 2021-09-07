import { Container, List, ListItem, Typography } from "@material-ui/core";
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
      paddingBottom: "25px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    list: {
      paddingTop: "48px",
      overflow: "auto",
      height: "100%",
    },
  };
});

const initialState = {
  messages: [],
};

enum ReducerTypes {
  add = "add",
  reset = "reset",
}

const reducer = (
  state: any,
  action: { type: ReducerTypes; payload?: IMessage }
) => {
  switch (action.type) {
    case "add":
      return {
        messages: [...state.messages, action.payload],
      };
    case "reset":
      return {
        messages: [],
      };
  }
};
const MainChatArea = () => {
  const [messagesState, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    state.local.get("currentChannel").on((channel) => {
      if (!channel.name) return;
      dispatch({ type: ReducerTypes.reset });

      console.log("changed channel", channel);
      state.public
        .get("chatty1")
        .get("channels")
        .get(channel.name)
        .get("messages")
        .map()
        .on((msg) => {
          console.log("incoming msg", msg);
          dispatch({ type: ReducerTypes.add, payload: msg });
        }, true);
    }, true);
  }, []);

  // cleanup
  // return state.public.get("chatty1").get("channels").off();
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <List className={classes.list}>
        {[...new Set(messagesState!.messages)].map((msg: IMessage) => {
          return <Message text={msg.text} />;
        })}
      </List>
      <ChatForm />
    </Container>
  );
};

interface IMessageProps {
  text: string;
}

const Message = ({ text }: IMessageProps) => {
  return (
    <ListItem>
      <Typography variant="body1">{text}</Typography>
    </ListItem>
  );
};

export default MainChatArea;