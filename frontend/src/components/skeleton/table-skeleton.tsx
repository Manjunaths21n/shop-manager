import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export const TableSkeleton = () => {
    return (
        <Stack spacing={1}>
            <Skeleton variant="rounded" width={'100%'} height={80} />
            <Skeleton variant="rounded" width={'100%'} height={200} />
            <Skeleton variant="rounded" width={'100%'} height={40} />
        </Stack>
    );
};
