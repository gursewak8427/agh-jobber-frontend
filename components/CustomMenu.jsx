import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { MoreVerticalIcon } from 'lucide-react';

export default function CustomMenu({ children, icon }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <div
                aria-label="more"
                id="long-button"
                aria-controls={true ? 'long-menu' : undefined}
                aria-expanded={true ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                {icon}
            </div>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={true && Boolean(anchorEl)}
                onClose={handleClose}
            >
                {children}
            </Menu>
        </div>
    );
}
