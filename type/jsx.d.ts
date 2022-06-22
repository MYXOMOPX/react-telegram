declare module JSX {

    type JSXElementData<T extends ReactTelegram.RTElement> = React.PropsWithChildren<ReactTelegram.RTElementData<T>>


    interface IntrinsicElements {
        "message-root": JSXElementData<ReactTelegram.RTMessageRootElement>,
        "format": JSXElementData<ReactTelegram.RTFormatElement>,
        "inline-keyboard": JSXElementData<ReactTelegram.RTInlineKeyboardElement>,
        "inline-keyboard-button": ReactTelegram.RTElementData<ReactTelegram.RTInlineKeyboardButtonElement>,
    }
}
