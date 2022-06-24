declare module JSX {

    type JSXElementData<T extends ReactTelegram.RTElement> = React.PropsWithChildren<ReactTelegram.RTElementData<T>>

    interface IntrinsicElements {
        "root": JSXElementData<ReactTelegram.RTRootElement>,
        "message": JSXElementData<ReactTelegram.RTMessageElement>,
        "format": JSXElementData<ReactTelegram.RTFormatElement>,
        "inline-keyboard": JSXElementData<ReactTelegram.RTInlineKeyboardElement>,
        "inline-keyboard-row": JSXElementData<ReactTelegram.RTInlineKeyboardRowElement>,
        "inline-keyboard-button": ReactTelegram.RTElementData<ReactTelegram.RTInlineKeyboardButtonElement>,
    }
}
