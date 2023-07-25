import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"

import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth = 260 }) => {

    const { articles } = useSelector( state => state.store );

    return (
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        display: { xs: 'flex' },
                        '&.MuiPaper-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                    >
                    
                    <Toolbar>
                        <Typography variant="h6" noWrap component="div">
                            Dashboard
                        </Typography>
                    </Toolbar>
                    <Divider/>

                    <List>
                        {
                            articles.map(  article => (
                                <SideBarItem key={ article.id } { ...article }/>
                            ))
                        }
                    </List>

                </Drawer>

        </Box>
    )

}