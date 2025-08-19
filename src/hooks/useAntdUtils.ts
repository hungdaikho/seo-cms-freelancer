import { App } from 'antd';

/**
 * Custom hook for using Ant Design message and notification
 * This hook ensures compatibility with React 18+ and Concurrent Mode
 */
export const useAntdMessage = () => {
    const { message } = App.useApp();
    return message;
};

/**
 * Custom hook for using Ant Design notification
 * This hook ensures compatibility with React 18+ and Concurrent Mode
 */
export const useAntdNotification = () => {
    const { notification } = App.useApp();
    return notification;
};

/**
 * Custom hook for using Ant Design modal
 * This hook ensures compatibility with React 18+ and Concurrent Mode
 */
export const useAntdModal = () => {
    const { modal } = App.useApp();
    return modal;
};
