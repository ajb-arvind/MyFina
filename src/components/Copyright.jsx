import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Copyright(props) {
  return (
    <Typography
      variant="subtitle2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'© '}
      <Link color="inherit" href="" style={{ textDecoration: 'none' }}>
        MyFinance
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
