import ChatID = ReactTelegram.ChatID;

export const getEventChannelForQueryButton = (chatId: ChatID, messageId: number, callbackData: string): string | undefined => {
    if (!chatId || !messageId || !callbackData) return undefined;
    return `${chatId}:${messageId}:${callbackData}`;
}

export const getEventChannelForReply = (chatId: ChatID, messageId: number) => {
    if (!chatId || !messageId) return undefined;
    return `${chatId}:${messageId}`;
}