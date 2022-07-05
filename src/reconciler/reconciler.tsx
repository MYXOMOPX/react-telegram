import React from 'react';
import Reconciler from 'react-reconciler';
import {ReconcilerRTHostConfig} from "./type";

import {RootBotContextType} from "../react/context/RootBotContext/type";
import {RootBotContext} from "../react/context/RootBotContext/RootBotContext";
import ChatID = ReactTelegram.ChatID;

export interface CreateRTReconcilerOpts {
    rtDocument: ReactTelegram.RTDocument,
    render: (root: ReactTelegram.RTRootElement, msgs: ReactTelegram.MessagesToRender) => void,
}

export const createRTReconciler = (opts: CreateRTReconcilerOpts) => {
    const {rtDocument, render: renderFn} = opts;

    const hostConfig: ReconcilerRTHostConfig = {
        // Среда поддерживает мутацию нод
        supportsMutation: true,

        /*
         * Нужно ли обрабатывать вложенное содержимое как текст?
         * Вызывается во время рендер-фазы
         *
         * true: на следующем шаге будет создано представление узла
         * и дальнейший обход вложенного поддерева осуществляться не будет
         * false: рекурсивная обработка поддерева продолжается
         * */
        shouldSetTextContent: (type, data) => {
            return false
        },

        /*
         * Сопоставляет хост-компонент с конкретным инстансом в среде
         * и обрабатывает первоначальные пропсы. Вызывается на всех нодах,
         * кроме текстовых листьев во время рендер-фазы
         *
         * Возвращает созданный инстанс
         * */
        createInstance(type, data) {
            const node = rtDocument.createElement(type, data);

            return node;
        },

        /*
         * Создает представление для текстового листа в среде
         * Вызывается исключительно на текстовых листьях во время рендер-фазы
         *
         * Возвращает созданный текстовый инстанс
         * */
        createTextInstance(text) {
            return rtDocument.createTextNode(text);
        },

        /*
         * Присоединяет ребенка к родителю
         * Вызывается на каждом ребенке, если родитель еще не отрисован на экране
         * (т.е. во время рендер-фазы)
         * */
        appendInitialChild(parentInstance, child) {
            rtDocument.appendChild(parentInstance, child);
        },

        /*
         * Добавляет ребенка корневому контейнеру
         * Вызывается для каждого ребенка во время коммит-фазы
         * */
        appendChildToContainer(container, child) {
            rtDocument.appendChild(container, child);
        },

        // Изменение пропсов

        /*
         * Проверяет наличие изменений и говорит реконсилятору, изменилось ли что-то
         * Основная задача – найти их, но не вносить. Рекурсивно вызывается на всех
         * вершинах изменившегося поддерева (кроме текстовых) во время рендер-фазы.
         * */
        prepareUpdate(instance, type, oldData, newData) {
            return newData;
        },

        /*
         * Вносит изменения, найденные ранее. Вызывается в фазе коммита
         * на всех элементах, которые имеют updatePayload
         * */
        commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
            // ToDo ?;
        },

        // Вставка узлов

        /*
         * Присоединяет ребенка к родителю
         * Вызывается для ребенка на стадии коммита, если родитель уже отрисован на экране
         * */
        appendChild(parentInstance, child) {
            rtDocument.appendChild(parentInstance, child);
        },

        /*
         * Вставляет нового ребенка перед некоторым узлом, который уже существует на экране
         * Вызывается во время коммит-фазы
         */
        insertBefore(parentInstance, child, beforeChild) {
            rtDocument.insertBefore(parentInstance, child, beforeChild);
        },

        /*
         * Аналогично insertBefore, только родитель – корневой контейнер
         */
        insertInContainerBefore(container, child, beforeChild) {
            rtDocument.insertBefore(container, child, beforeChild);
        },

        // Удаление узлов

        /*
         * Удаляет некоторого ребенка (и его детей)
         * Вызывается в стадии коммита
         */
        removeChild(parentInstance, child) {
            rtDocument.removeChild(parentInstance, child);
        },

        /*
         * Аналогично removeChild, если родитель – корневой контейнер
         */
        removeChildFromContainer(container, child) {
            rtDocument.removeChild(container, child);
        },

        detachDeletedInstance(node) {
            rtDocument.detachInstance(node)
        },

        clearContainer(root) {
            root.children = []
        },
        // Обновление текстовых листьев

        /*
         * Выполняется во время коммит-фазы, если на текстовом листе произошло изменение
         */
        commitTextUpdate(textInstance, oldText, newText) {
            rtDocument.updateTextInstance(textInstance, newText);
        },

        getRootHostContext(rootContainerInstance) {},
        getChildHostContext(parentHostContext, type, rootContainerInstance) {},

        // Заглушки
        finalizeInitialChildren(domElement, type, props) {
            return false;
        },

        // Тут скорее всего будет рендеринг
        prepareForCommit(rootContainer) {
        },
        resetAfterCommit(rootContainer) {
            renderFn(rootContainer, rtDocument.getMessagesToRender(rootContainer))
        },

        // Method for ref attribute |||| ref={}
        getPublicInstance(instance) {
            return instance
        },

        commitMount(domElement, type, newProps) {},
    };

    const render = (jsx: React.ReactNode, chatId: ChatID, ctxValue: Partial<RootBotContextType>) => {
        const root = rtDocument.instantiateRoot(chatId);
        const reconciler = Reconciler(hostConfig);
        const container = reconciler.createContainer(root, false, false);

        const fullCtxVal: RootBotContextType = {
            ...ctxValue,
            root,
            chatId
        } as RootBotContextType;

        const jsxWithContext = (
            <RootBotContext.Provider value={fullCtxVal}>
                {jsx}
            </RootBotContext.Provider>
        )
        reconciler.updateContainer(jsxWithContext, container);
        return root;
    };

    return {
        render
    }
}