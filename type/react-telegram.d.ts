declare module ReactTelegram {
    // ### ################## ### //
    // ### NODES AND ELEMENTS ### //
    // ### ################## ### //

    // ANY NODE
    type RTNodeType = "rawText" | "element"
    interface RTNode<T extends RTNodeType = RTNodeType> {
        type: T;
        parent?: RTElement
    }

    // ELEMENT
    export interface RTElement<T extends ElementName = ElementName, Data = any, Ext = {}> extends RTNode<"element"> {
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
        instantiateRoot: () => RTRootElement;
        getRootByUUID: (uuid: string) => RTRootElement | null;
        destroyRoot: (root: RTRootElement) => void;

        appendChild: (parent: RTElement, child: RTNode) => void;
        removeChild: (parent: RTElement, child: RTNode) => void;
        insertBefore: (parent: RTElement, child: RTNode, beforeChild: RTNode) => void;
        updateElement: (element: RTElement, data: any) => void;

        createElement: (name: ReactTelegram.ElementName, data?: any) => RTElement
        createTextNode: (value: string) => RawTextNode
    }

    // ### #################### ### //
    // ### Elements declaration ### //
    // ### #################### ### //

    type ElementName =
        | "format"
        | "root"
        | "message"
        | "inline-keyboard"
        | "inline-keyboard-row"
        | "inline-keyboard-button"
    ;

    type RTFormatElement = RTElement<"format", {
        bold?: boolean;
        italic?: boolean;
        underline?: boolean;
    }>
    type RTRootElement = RTElement<"root", never> & {
        uuid: string;
    }
    type RTMessageElement = RTElement<"message", {
        disable_notification?: boolean,
        disable_web_page_preview?: boolean,
        protect_content?: boolean,
        reply_to_message_id?: number,
        chat_id?: string;
    }> & {
        uuid: string;
        messageId?: number;
        isChanged: boolean;
    }

    type RTInlineKeyboardElement = RTElement<"inline-keyboard", never>
    type RTInlineKeyboardRowElement = RTElement<"inline-keyboard-row", never>
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