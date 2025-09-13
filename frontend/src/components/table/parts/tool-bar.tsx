import { Toolbar, alpha, Typography, Tooltip, IconButton, Container, Button, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import type { EnhancedTableToolbarProps } from "./types";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { useCallback, useState } from "react";

export function TableToolbar(props: Readonly<EnhancedTableToolbarProps>) {
  const { numSelected, onAddNewItem, AllowAddRecord, showIcon = false, showFilter } = props;
  const [showSave, setShowSave] = useState(false);

  const onEditClick = useCallback(() => {
    setShowSave(true);
  }, []);

  const onCancelClick = useCallback(() => {
    setShowSave(false);
  }, []);

  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 0 },
          pr: { xs: 0, sm: 0 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      <Container sx={{p:0}}>
        {numSelected > 0 ? <>
          <Tooltip title="Delete">
            {showIcon ? <IconButton>
              <DeleteIcon />
            </IconButton> :
              <Button startIcon={<DeleteIcon />} sx={{ textTransform: "none" }}>
                Delete
              </Button>}
          </Tooltip>
          {showSave ?
            <Tooltip title="Save">
              {showIcon ? <IconButton>
                <DeleteIcon />
              </IconButton> :
                <Button startIcon={<SaveIcon />} sx={{ textTransform: "none" }}>
                  Save
                </Button>}
            </Tooltip> :
            <Tooltip title="Edit">
              {showIcon ? <IconButton onClick={onEditClick}>
                <DeleteIcon />
              </IconButton> :
                <Button startIcon={<EditIcon />} sx={{ textTransform: "none" }} onClick={onEditClick}>
                  Edit
                </Button>}
            </Tooltip>}
          <Tooltip title="Cancel">
            {showIcon ? <IconButton onClick={onCancelClick}>
              <DeleteIcon />
            </IconButton> :
              <Button startIcon={<CancelIcon />} sx={{ textTransform: "none" }} onClick={onCancelClick}>
                Cancel
              </Button>}
          </Tooltip>

        </>
          :
          AllowAddRecord && (
            <Tooltip title="Add Item">
              {showIcon ? <IconButton>
                <AddSharpIcon />
              </IconButton> :
                <Button startIcon={<AddSharpIcon />} sx={{ textTransform: "none" }} onClick={onAddNewItem}>
                  Add Item
                </Button>}
            </Tooltip>
          )}
        {showFilter && (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Container>
      {numSelected > 0 && (
        <Box
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          component="div"
        >
          {numSelected} selected
        </Box>
      )}
    </Toolbar>
  );
}
