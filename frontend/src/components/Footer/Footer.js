import React from 'react';
import { Box, Typography, Link, Container, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="body2" color="text.secondary">
              Created by Ark Barua
            </Typography>
            <Typography variant="caption" color="text.secondary">
              March 2024 • Version 1.0.0
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link
              href="https://github.com/Pro5765"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <GitHubIcon />
            </Link>
            <Link
              href="https://www.linkedin.com/in/arkbarua"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <LinkedInIcon />
            </Link>
            <Link
              href="mailto:arb2442004@sicsr.ac.in"
              color="inherit"
              sx={{
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <EmailIcon />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 