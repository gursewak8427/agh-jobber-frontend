import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

export default function RightSidebar({ children, isOpen, onClose }) {
    
    return (
        <div>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={onClose}
            >
                <div className="max-h-screen overflow-y-auto">
                    {children}
                </div>
            </Drawer>
        </div>
    );
}
