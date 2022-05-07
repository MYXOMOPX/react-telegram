import {MessengerDocument} from "./nodes";



export const parseDocument = (doc: MessengerDocument): any => {
    const msg = doc.getMessage();

    msg.children.forEach(it => {

    })
}