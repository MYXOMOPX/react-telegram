declare module ReactTelegram {
    // ### ################## ### //
    // ### NODES AND ELEMENTS ### //
    // ### ################## ### //

    // ANY NODE
    type RTNodeType = "rawText" | "element"
    interface RTNode<T extends RTNodeType = RTNodeType> {
        type: T;
    }

    // ELEMENT
    export interface RTElement<T extends  string = string, Data = any> extends RTNode<"element"> {
        elementName: T;
        data?: Data;

        children: Array<RTNode>;
    }

    // RAWTEXT
    type RawTextNode = RTNode<"rawText"> & {
        value: string
    }

    // ### #################### ### //
    // ###       DOCUMENT       ### //
    // ### #################### ### //

    interface RTDocument {
        instantiateRoot: (chatId: string | number) => RTMessageRootElement;
        getRootByMessageId: (messageId: number) => RTMessageRootElement | null;
        getRootByUUID: (uuid: string) => RTMessageRootElement | null;
        destroyRoot: (root: RTMessageRootElement) => void;

        appendChild: (parent: RTElement, child: RTNode) => void;
        removeChild: (parent: RTElement, child: RTNode) => void;
        insertBefore: (parent: RTElement, child: RTNode, beforeChild: RTNode) => void;

        createElement: (root: RTElement, name: string, data?: any) => RTElement
        createTextNode: (root: RTElement, value: string) => RawTextNode
    }

    // ### #################### ### //
    // ### Elements declaration ### //
    // ### #################### ### //

    type RTFormatElement = RTElement<"text", {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
    }>
    type RTMessageRootElement = RTElement<"message-root", {
        uuid: string;
        chatId: string;
        messageId?: number;
    }>
    type RTInlineKeyboardElement = RTElement<"inline-keyboard-button", {
        columns?: number
    }>
    type RTInlineKeyboardButtonElement = RTElement<"inline-keyboard-button", {
        text: string;
        url?: string;
        callback_data?: string;
        pay?: boolean;
    }>

    // Medias
    type ReactTelegramMessageType =
        | 'text'
        | 'animation'
        | 'audio'
        | 'channel_chat_created'
        | 'contact'
        | 'delete_chat_photo'
        | 'document'
        | 'game'
        | 'group_chat_created'
        | 'invoice'
        | 'left_chat_member'
        | 'location'
        | 'migrate_from_chat_id'
        | 'migrate_to_chat_id'
        | 'new_chat_members'
        | 'new_chat_photo'
        | 'new_chat_title'
        | 'passport_data'
        | 'photo'
        | 'pinned_message'
        | 'sticker'
        | 'successful_payment'
        | 'supergroup_chat_created'
        | 'video'
        | 'video_note'
        | 'voice'
        | 'video_chat_started'
        | 'video_chat_ended'
        | 'video_chat_participants_invited'
        | 'video_chat_scheduled'
        | 'message_auto_delete_timer_changed'
        | 'chat_invite_link'
        | 'chat_member_updated'
        | 'web_app_data'
    ;


    type RTElementData<T extends RTElement> = T["data"]
}