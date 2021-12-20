import React, { useEffect } from 'react';

import './Toast.css';
import { ToastI } from '../../../types';

interface ToastProps {
    position: string;
    currentToast: ToastI;
    autoDelete: number;
}

export const Toast: React.FC<ToastProps> = ({ position, currentToast, autoDelete }) => {
    const [toastList, setToastList] = React.useState<ToastI[]>([]);

    const deleteToast = (id: any) => {
        const toastListItem = toastList.findIndex((e: { id: any }) => e.id === id);
        toastList.splice(toastListItem, 1);
        setToastList([...toastList]);
    };

    useEffect(() => {
        const setToasts = async () => {
            if (currentToast) {
                setToastList([currentToast]);
            }
        };

        setToasts();
    }, [currentToast]);

    useEffect(() => {
        const deleteTimeout = async () => {
            if (toastList.length > 0 && autoDelete) {
                setTimeout(() => {
                    deleteToast(toastList[toastList.length - 1].id);
                }, autoDelete);
            }
        };

        deleteTimeout();
    }, [toastList]);

    const renderToasts = (arr: any) =>
        arr.map((toast: ToastI) => (
            <div key={toast.id} className={`notification ${toast.type}`}>
                <div>
                    <p className="notification-message">{toast.message}</p>
                </div>
                <button type="button" onClick={() => deleteToast(toast.id)}>
                    X
                </button>
            </div>
        ));

    const toasts = toastList ? renderToasts(toastList) : null;

    return <div className={`notification-container ${position}`}>{toasts}</div>;
};

export default Toast;