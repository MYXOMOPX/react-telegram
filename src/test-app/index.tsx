import {ReactApp} from "./ReactApp";
import TelegramBot  from 'node-telegram-bot-api';
import {createReactTelegramBot} from "../telegram/ReactTelegramBot";

const token = process.env.BOT_TOKEN;

const reactBot = createReactTelegramBot(
    new TelegramBot(token, {polling: true})
);

reactBot.on("message", (msg) => {
    console.log("GOT",msg.text)
    if (msg.text === "/test") {
        reactBot.sendJSX(<ReactApp/>, msg.chat.id);
    }
})

