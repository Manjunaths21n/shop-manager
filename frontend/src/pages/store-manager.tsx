import { memo } from "react";
import { ButtonAppBar } from "../components";
import { Outlet } from "react-router-dom";
import { ListSubheader } from "@mui/material";

export const StoreManager = memo(() => {
    return (
        <>
            <ListSubheader component="div" sx={{ pl: '0px', pr: '0px' }}><ButtonAppBar /></ListSubheader>


            <Outlet />
        </>
    );
});
