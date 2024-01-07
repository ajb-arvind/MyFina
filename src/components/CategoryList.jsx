import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import { useState } from 'react';
import Title from './Title';

const CategoryComponent = ({ category, onClickCategory, selectedCategory }) => {
  return (
    <div>
      <ListItem
        onClick={onClickCategory}
        sx={[
          selectedCategory?.value === category && {
            backgroundColor: (theme) => theme.palette.secondary.main,
            color: 'white',
          },
          { borderRadius: 2 },
        ]}
      >
        <ListItemButton>
          <ListItemText primary={category} />
        </ListItemButton>
      </ListItem>
    </div>
  );
};

const SubCategoryComponent = ({ subcategory }) => {
  return (
    <ListItem sx={{ borderRadius: 2 }}>
      <ListItemText primary={subcategory} />
    </ListItem>
  );
};

const AccountComponent = ({ account }) => {
  return (
    <ListItem sx={{ borderRadius: 2 }}>
      <ListItemText primary={account} sx={{ textTransform: 'capitalize' }} />
    </ListItem>
  );
};

const CategoryList = ({ categoriesData, accountsData }) => {
  const [categories, setCategories] = useState(categoriesData);
  const [accounts, setAccounts] = useState(accountsData);

  const [selectedCategory, setSelectedCategory] = useState(categoriesData[0]);

  return (
    <Box>
      <Grid>
        <Title>Accounts Type</Title>

        <List>
          {accounts.map((account) => {
            return (
              <AccountComponent key={account.value} account={account?.value} />
            );
          })}
        </List>
      </Grid>

      <Grid container spacing={{ sm: 4 }}>
        <Grid item xs={12} sm={6}>
          <List sx={{ width: '100%', maxWidth: 360 }}>
            <Title> Categories</Title>

            {categories.map((category) => {
              return (
                <CategoryComponent
                  key={category?.value}
                  category={category?.value}
                  onClickCategory={() => setSelectedCategory(category)}
                  selectedCategory={selectedCategory}
                >
                  {category}
                </CategoryComponent>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List sx={{ width: '100%', maxWidth: 360 }}>
            <Title> Sub Categories: {selectedCategory.value}</Title>

            {categories?.map((category) =>
              category.value === selectedCategory.value
                ? category?.subCategory?.map((item) => (
                    <SubCategoryComponent
                      key={item.value}
                      subcategory={item.value}
                    />
                  ))
                : null
            )}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};
export default CategoryList;
