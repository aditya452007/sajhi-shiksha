import React, { useState, useCallback } from 'react';
import { Snackbar as MuiSnackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';

interface SnackbarMessage {
    id: number;
    text: string;
    severity: AlertColor;
}

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<SnackbarMessage[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = useCallback((): void => {
        setOpen(false);
        setTimeout(() => {
            setMessages((prev) => prev.slice(1));
        }, 300);
    }, []);

    const current = messages[0];

    return (
        <>
            {children}
            <MuiSnackbar
                open={open && !!current}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                sx={{
                    pb: { xs: 10, md: 4 },
                    '& .MuiSnackbarContent-root': {
                        animation: 'snackbar-slide-in 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
                    },
                }}
            >
                {current && (
                    <Alert
                        onClose={handleClose}
                        severity={current.severity}
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {current.text}
                    </Alert>
                )}
            </MuiSnackbar>
        </>
    );
};
