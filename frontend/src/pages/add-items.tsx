import Container from "@mui/material/Container";
import { memo } from "react";
import { AddItemTable } from "../components/add-items-table";

export const AddItems = memo(() => {
    return (

        <Container sx={{ marginTop: 2 }} maxWidth={'xl'} >
            <AddItemTable />
        </Container>);
});
