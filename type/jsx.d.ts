
declare module JSX {
    type KeyAttributes = import("react").Attributes
    type RefAttributes<T> = import("react").RefAttributes<T>

    type JSXElementData<T extends ReactTelegram.RTElement> =
        React.PropsWithChildren<ReactTelegram.RTElementData<T>> & KeyAttributes  & RefAttributes<T>

    interface IntrinsicElements {
        "root": JSXElementData<ReactTelegram.RTRootElement>,
        "message": JSXElementData<ReactTelegram.RTMessageElement>,
        "format": JSXElementData<ReactTelegram.RTFormatElement>,
        "reply-markup": JSXElementData<ReactTelegram.RTReplyMarkupElement>,
        "inline-keyboard-row": JSXElementData<ReactTelegram.RTInlineKeyboardRowElement>,
        "inline-keyboard-button": ReactTelegram.RTElementData<ReactTelegram.RTInlineKeyboardButtonElement>,
    }
}
