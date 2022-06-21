import { createReactTelegram } from "../reconciler";
import {ReactApp} from "./ReactApp";

const ReactTelegram = createReactTelegram();

ReactTelegram.render((
    <ReactApp/>
))