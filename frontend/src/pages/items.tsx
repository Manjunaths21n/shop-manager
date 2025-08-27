import { memo } from "react";
import { EnhancedTable } from "../components";
import Container from "@mui/material/Container";

export const Items = memo(() => {
    return (
        <Container sx={{ marginTop: 2 }} maxWidth={'xl'} >
            <EnhancedTable />
        </Container>
    );
});
