import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const CommonCategory = ({
  id,
  data,
  selectedCategoryId,
  onClickCategory,
  onClickCheckbox,
  handleDeleteCategory,
  isEdit,
}) => {
  const currentCategories = data[id];
  return (
    <ListItem
      sx={[
        selectedCategoryId === id && {
          backgroundColor: (theme) => theme.palette.secondary.main,
          color: 'white',
        },
        { borderRadius: 2 },
      ]}
    >
      {isEdit && (
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={currentCategories?.isEnabled}
            onChange={onClickCheckbox}
          />
        </ListItemIcon>
      )}
      <ListItemText
        primary={currentCategories?.label}
        onClick={onClickCategory}
        sx={[currentCategories.isCategory && { cursor: 'pointer' }]}
      />
      {isEdit && (
        <IconButton>
          <DeleteIcon onClick={handleDeleteCategory} />
        </IconButton>
      )}
    </ListItem>
  );
};
export default CommonCategory;
