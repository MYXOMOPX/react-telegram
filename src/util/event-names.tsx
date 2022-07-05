import ChatID = ReactTelegram.ChatID;

export const getEventNameForQueryButton = (chatId: ChatID, messageId: number, callbackData: string): string | undefined => {
    if (!chatId || !messageId || !callbackData) return "";
    return `${chatId}:${messageId}:${callbackData}`;
}