import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material';
import Title from '../components/Title';
import { useState } from 'react';
import PropTypes from 'prop-types';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const defaultTheme = createTheme();
const Profile = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '90vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Paper
              sx={{
                p: 2,

                height: '100%',
              }}
            >
              <Title>Profile</Title>
              <Divider light />
              <Box sx={{ borderRight: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  aria-label="basic tabs example"
                  orientation="horizontal"
                  textColor="primary"
                  indicatorColor="primary"
                  onChange={handleChange}
                >
                  <Tab
                    label="User Data"
                    {...a11yProps(0)}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mt: 2,
                    }}
                  />
                  <Tab
                    label="Categories"
                    {...a11yProps(1)}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mt: 2,
                    }}
                  />
                  <Tab
                    label="Change Password"
                    {...a11yProps(2)}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      mt: 2,
                    }}
                  />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <Card sx={{ width: 240 }}>
                    <CardHeader title="Profile Photo"></CardHeader>
                    <Divider />
                    <CardContent>
                      <Grid
                        container
                        rowSpacing={2}
                        alignItems="center"
                        sx={{ mt: 2 }}
                        direction="column"
                      >
                        <Grid item>
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 80, height: 80 }}
                          />
                        </Grid>
                        <Grid item>
                          <Typography
                            component="p"
                            variant="caption"
                            gutterBottom
                            sx={{ mt: 2 }}
                          >
                            Upload/Change Your Profile Image
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button variant="contained">Upload Profile</Button>
                        </Grid>
                      </Grid>

                      <CssBaseline />
                    </CardContent>
                  </Card>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Item Three
                </TabPanel>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Profile;
