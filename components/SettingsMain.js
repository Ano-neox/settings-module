import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import PageContainer from '../../../../modernize-dashboard/src/components/container/PageContainer';

const SettingsMain = () => {
  return (
    <PageContainer title="Settings" description="System Configuration">
      <Box>
        <Typography variant="h4" mb={3}>Settings Dashboard</Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Company Settings</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Configure company information and preferences
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Module Configuration</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Enable or disable business modules
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">System Settings</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Configure system-wide settings and preferences
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">API Integrations</Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Manage third-party API keys and integrations
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default SettingsMain;