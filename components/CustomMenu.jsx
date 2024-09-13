import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { MoreVerticalIcon } from 'lucide-react';

export default function CustomMenu({ children, isOpen, onClose, onClick, icon }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        onClick()
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        if (onClose) {
            onClose();
        }
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={isOpen ? 'long-menu' : undefined}
                aria-expanded={isOpen ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
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
