import { memo } from "react";
import { ButtonAppBar } from "../components";
import { Outlet } from "react-router-dom";

export const StoreManager = memo(() => {
    return (
        <>
            <ButtonAppBar />
            <Outlet />
        </>
    );
});
