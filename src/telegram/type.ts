import TelegramBot from "node-telegram-bot-api";
import ChatID = ReactTelegram.ChatID;


export interface ReactTelegramBot extends TelegramBot {
    sendJSX(node: React.ReactNode, chatID: ChatID);
}