import Typography from '@mui/material/Typography';

import {AppBar, Toolbar} from "@mui/material";

function Header() {

    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        HTML Text Replacer
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
