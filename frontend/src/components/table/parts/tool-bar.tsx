import { Toolbar, alpha, Typography, Tooltip, IconButton, Container, Button, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import type { EnhancedTableToolbarProps } from "./types";
import AddSharpIcon from '@mui/icons-material/AddSharp';

export function EnhancedTableToolbar(props: Readonly<EnhancedTableToolbarProps>) {
  const { numSelected, onAddNewItem } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Container>

          <Button startIcon={<AddSharpIcon />} sx={{ textTransform: "none" }} onClick={onAddNewItem}>
            New Item
          </Button>
        </Container>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
