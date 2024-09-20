import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { MoreVerticalIcon } from 'lucide-react';

export default function CustomMenuWrapper({ children, icon }) {
    const [open, setOpen] = useState(null);

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={isOpen ? 'long-menu' : undefined}
                aria-expanded={isOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={() => setOpen(!open)}
            >
                {icon}
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={isOpen && Boolean(anchorEl)}
                onClose={handleClose}
            >
                {children}
            </Menu>
        </div>
    );
}
