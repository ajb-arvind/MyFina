import {
  Avatar,
  Button,
  Card,
  CardContent,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import Title from './Title';
import { useSelector } from 'react-redux';

const UploadProfilePhoto = () => {
  return (
    <Paper sx={{ width: 240, p: 2, pb: 4 }}>
      <Title sx={{ p: 4 }}>Account Details</Title>
      <Divider light />
      <Divider />

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
    </Paper>
  );
};

const AccountDetails = ({ name, email }) => {
  return (
    <Paper sx={{ p: 4 }}>
      <Title>Account Details</Title>
      <Divider light />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Name: {name}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Email: {email}
      </Typography>
    </Paper>
  );
};

const TabPanelUserDetails = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} lg={3}>
        <UploadProfilePhoto />
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <AccountDetails name={user.name} email={user.email} />
      </Grid>
    </Grid>
  );
};
export default TabPanelUserDetails;
