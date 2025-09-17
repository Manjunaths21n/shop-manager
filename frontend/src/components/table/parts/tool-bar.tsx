import { Toolbar, alpha, Checkbox, Tooltip, IconButton, Container, Button, Box, FormControlLabel } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import type { EnhancedTableToolbarProps } from "./types";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { useCallback, useState } from "react";

export function TableToolbar(props: Readonly<EnhancedTableToolbarProps>) {
  const { numSelected, onAddNewItem, AllowAddRecord, showIcon = false, showFilter, onCancel, onDelete, onEdit, onSave,
    showToggleSelection, onToggleAllSelection } = props;
  const [showSave, setShowSave] = useState(false);
  const [toggleAllSelection, setToggleAllSelection] = useState(false);

  const onEditClick = useCallback(() => {
    onEdit?.();
    setShowSave(true);
  }, [onEdit]);

  const onAddClick = useCallback(() => {
    onAddNewItem();
    onEditClick();
  }, [onEditClick, onAddNewItem]);

  const onCancelClick = useCallback(() => {
    onCancel?.();
    setShowSave(false);
  }, [onCancel]);

  const onDeleteClick = useCallback(() => {
    onDelete?.();
    setShowSave(false);
  }, [onDelete]);

  const onSaveClick = useCallback(() => {
    onSave?.();
    setShowSave(false);
  }, [onSave]);

  const onToggleAllSelectionClick = useCallback(() => {
    setToggleAllSelection(preState => !preState);
    onToggleAllSelection?.();
  }, [onSave]);

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
      <Container sx={{ p: 0 }}>
        {numSelected > 0 ?
          <>
            {showToggleSelection ?
              <Tooltip title="Toggle All Selection">
                <FormControlLabel
                  label="Select All"
                  control={
                    <Checkbox checked={toggleAllSelection}
                      color="primary"
                      name={'toggleAllSelection'}
                      onClick={onToggleAllSelectionClick} />
                  }
                />
              </Tooltip> :
              null}
            <Tooltip title="Delete">
              {showIcon ? <IconButton onClick={onDeleteClick}>
                <DeleteIcon />
              </IconButton> :
                <Button startIcon={<DeleteIcon />} sx={{ textTransform: "none" }} onClick={onDeleteClick}>
                  Delete
                </Button>}
            </Tooltip>
            {showSave ?
              <Tooltip title="Save">
                {showIcon ? <IconButton onClick={onSaveClick} >
                  <SaveIcon />
                </IconButton> :
                  <Button startIcon={<SaveIcon />} sx={{ textTransform: "none" }} onClick={onSaveClick}>
                    Save
                  </Button>}
              </Tooltip> :
              <Tooltip title="Edit">
                {showIcon ? <IconButton onClick={onEditClick}>
                  <EditIcon />
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
              {showIcon ? <IconButton onClick={onAddClick}>
                <AddSharpIcon />
              </IconButton> :
                <Button startIcon={<AddSharpIcon />} sx={{ textTransform: "none" }} onClick={onAddClick}>
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
