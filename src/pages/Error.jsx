import { Box, Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          px: 8,
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h1" fontWeight={600} color="primary">
            404
          </Typography>
          <Typography
            variant="h4"
            fontSize={30}
            lineHeight={1}
            fontWeight={700}
            letterSpacing={-0.0025}
            mt={1}
          >
            Page not found
          </Typography>
          <Typography variant="paragraph" fontWeight={500} sx={{ mt: 3 }}>
            Sorry, we couldn’t find the page you’re looking for.
          </Typography>
        </Box>
      </Box>
    );
  }
  return (
    <Typography variant="paragraph" fontWeight={500} sx={{ mt: 3 }}>
      Error in the page
    </Typography>
  );
};
export default Error;
