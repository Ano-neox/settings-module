import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, TextField, 
  Switch, FormControlLabel, Tabs, Tab, Chip, IconButton, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem,
  FormControl, InputLabel, Divider, List, ListItem, ListItemText,
  ListItemIcon, Badge, Tooltip, LinearProgress
} from '@mui/material';

import PageContainer from '../../../../modernize-dashboard/src/components/container/PageContainer';

const SettingsMain = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [companySettings, setCompanySettings] = useState(() => {
    const saved = localStorage.getItem('companySettings');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      name: 'WebMonk Tech Solutions',
      email: 'info@webmonk.com',
      phone: '+91-9876543210',
      address: '123 Tech Park, Bangalore, India',
      website: 'https://webmonk.com',
      currency: 'INR',
      timezone: 'Asia/Kolkata',
      taxNumber: 'GST123456789',
      logo: ''
    };
  });

  const [moduleSettings, setModuleSettings] = useState(() => {
    const saved = localStorage.getItem('enabledModules');
    if (saved) {
      const enabledModules = JSON.parse(saved);
      return {
        crm: enabledModules.includes('crm'),
        inventory: enabledModules.includes('inventory'),
        sales: enabledModules.includes('sales'),
        accounting: enabledModules.includes('accounting'),
        hr: enabledModules.includes('hr'),
        projects: enabledModules.includes('projects'),
        billing: enabledModules.includes('billing'),
        analytics: enabledModules.includes('analytics'),
        tasks: enabledModules.includes('tasks'),
        auth: enabledModules.includes('auth'),
        notifications: enabledModules.includes('notifications'),
        broadcast: enabledModules.includes('broadcast'),
        marketplace: enabledModules.includes('marketplace'),
        settings: true, // Always keep settings enabled
        ecommerce: enabledModules.includes('ecommerce'),
        booking: enabledModules.includes('booking'),
        'live-tracking': enabledModules.includes('live-tracking'),
        'geofencing-attendance': enabledModules.includes('geofencing-attendance'),
        'mobile-users': enabledModules.includes('mobile-users')
      };
    }
    return {
      crm: true,
      inventory: true,
      sales: true,
      accounting: true,
      hr: true,
      projects: true,
      billing: true,
      analytics: true,
      tasks: true,
      auth: true,
      notifications: true,
      broadcast: true,
      marketplace: true,
      settings: true,
      ecommerce: true,
      booking: true,
      'live-tracking': true,
      'geofencing-attendance': true,
      'mobile-users': true
    };
  });

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    dataRetention: 365,
    autoLogout: true
  });

  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Payment Gateway', key: 'pk_live_***************', status: 'Active', lastUsed: '2024-01-20' },
    { id: 2, name: 'SMS Service', key: 'sk_test_***************', status: 'Active', lastUsed: '2024-01-19' },
    { id: 3, name: 'Email Service', key: 'api_key_***************', status: 'Inactive', lastUsed: '2024-01-15' },
    { id: 4, name: 'Cloud Storage', key: 'cs_key_***************', status: 'Active', lastUsed: '2024-01-18' }
  ]);

  const [saved, setSaved] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [themeSettings, setThemeSettings] = useState({
    mode: 'light',
    primaryColor: '#1976d2',
    sidebarColor: 'dark',
    compactSidebar: false
  });
  const [backupSettings, setBackupSettings] = useState({
    frequency: 'daily',
    time: '02:00',
    retention: 30,
    location: 'cloud',
    lastBackup: '2024-01-20 02:00:00'
  });
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, user: 'Admin', action: 'Settings Updated', timestamp: '2024-01-20 14:30:00', ip: '192.168.1.100' },
    { id: 2, user: 'Manager', action: 'Module Disabled', timestamp: '2024-01-20 12:15:00', ip: '192.168.1.101' },
    { id: 3, user: 'Admin', action: 'API Key Generated', timestamp: '2024-01-20 10:45:00', ip: '192.168.1.100' },
    { id: 4, user: 'User', action: 'Password Changed', timestamp: '2024-01-19 16:20:00', ip: '192.168.1.102' }
  ]);

  const handleCompanyChange = (field, value) => {
    const newSettings = { ...companySettings, [field]: value };
    setCompanySettings(newSettings);
    localStorage.setItem('companySettings', JSON.stringify(newSettings));
    
    // Dispatch custom event to update logo
    window.dispatchEvent(new CustomEvent('companySettingsUpdated'));
  };

  const handleLogoUpload = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleCompanyChange('logo', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModuleToggle = (module) => {
    const newSettings = { ...moduleSettings, [module]: !moduleSettings[module] };
    setModuleSettings(newSettings);
    
    // Update localStorage
    const enabledModules = Object.keys(newSettings).filter(key => newSettings[key]);
    localStorage.setItem('enabledModules', JSON.stringify(enabledModules));
    
    // Show confirmation
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSystemChange = (field, value) => {
    setSystemSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const regenerateApiKey = (id) => {
    setApiKeys(apiKeys.map(api => 
      api.id === id ? { ...api, key: 'new_key_' + Math.random().toString(36).substr(2, 15) + '***' } : api
    ));
  };

  const handleBackup = () => {
    setDialogType('backup');
    setOpenDialog(true);
  };

  const handleRestore = () => {
    setDialogType('restore');
    setOpenDialog(true);
  };

  const executeBackup = () => {
    setBackupSettings(prev => ({ ...prev, lastBackup: new Date().toLocaleString() }));
    setOpenDialog(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const CompanyTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {saved && <Alert severity="success" sx={{ mb: 2 }}>Settings saved successfully!</Alert>}
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Company Name"
          value={companySettings.name}
          onChange={(e) => handleCompanyChange('name', e.target.value)}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Email"
          value={companySettings.email}
          onChange={(e) => handleCompanyChange('email', e.target.value)}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Phone"
          value={companySettings.phone}
          onChange={(e) => handleCompanyChange('phone', e.target.value)}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Website"
          value={companySettings.website}
          onChange={(e) => handleCompanyChange('website', e.target.value)}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Address"
          value={companySettings.address}
          onChange={(e) => handleCompanyChange('address', e.target.value)}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          select
          label="Currency"
          value={companySettings.currency}
          onChange={(e) => handleCompanyChange('currency', e.target.value)}
          margin="normal"
          SelectProps={{ native: true }}
        >
          <option value="INR">Indian Rupee (₹)</option>
          <option value="USD">US Dollar ($)</option>
          <option value="EUR">Euro (€)</option>
          <option value="GBP">British Pound (£)</option>
        </TextField>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          select
          label="Timezone"
          value={companySettings.timezone}
          onChange={(e) => handleCompanyChange('timezone', e.target.value)}
          margin="normal"
          SelectProps={{ native: true }}
        >
          <option value="Asia/Kolkata">Asia/Kolkata</option>
          <option value="America/New_York">America/New_York</option>
          <option value="Europe/London">Europe/London</option>
          <option value="Asia/Dubai">Asia/Dubai</option>
        </TextField>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Tax Number (GST)"
          value={companySettings.taxNumber}
          onChange={(e) => handleCompanyChange('taxNumber', e.target.value)}
          margin="normal"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>Company Logo</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Button variant="outlined" component="label">
            Upload Logo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleLogoUpload(e.target.files[0])}
            />
          </Button>
          {companySettings.logo && (
            <Box>
              <img 
                src={companySettings.logo} 
                alt="Company Logo" 
                style={{ height: '50px', maxWidth: '150px', objectFit: 'contain' }}
              />
              <Button size="small" color="error" onClick={() => handleCompanyChange('logo', '')}>
                Remove
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );

  const ModulesTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>Module Management</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="body2" color="text.secondary">
            Enable or disable business modules for your organization. Disabled modules won't appear in the sidebar.
          </Typography>
          <Button variant="outlined" size="small" onClick={() => window.location.reload()}>
            Apply Changes
          </Button>
        </Box>
      </Grid>
      {Object.entries(moduleSettings).map(([module, enabled]) => (
        <Grid item xs={12} md={6} lg={4} key={module}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                  {module === 'hr' ? 'HR' : module === 'crm' ? 'CRM' : module}
                </Typography>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={enabled} 
                      onChange={() => handleModuleToggle(module)}
                      color="primary"
                      disabled={module === 'settings'}
                    />
                  }
                  label=""
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {module === 'crm' && 'Customer Relationship Management'}
                {module === 'inventory' && 'Stock & Product Management'}
                {module === 'sales' && 'Sales Order Processing'}
                {module === 'accounting' && 'Financial Management'}
                {module === 'hr' && 'Human Resources Management'}
                {module === 'projects' && 'Project Management'}
                {module === 'billing' && 'Invoicing & Quotations'}
                {module === 'analytics' && 'Business Intelligence'}
                {module === 'tasks' && 'Task Management'}
                {module === 'auth' && 'User Authentication'}
                {module === 'notifications' && 'System Notifications'}
                {module === 'broadcast' && 'Message Broadcasting'}
                {module === 'marketplace' && 'Module Marketplace'}
                {module === 'settings' && 'System Configuration'}
                {module === 'ecommerce' && 'Online Store Management'}
                {module === 'booking' && 'Appointment & Service Booking'}
                {module === 'live-tracking' && 'Real-time Vehicle Tracking'}
                {module === 'geofencing-attendance' && 'Location-based Attendance'}
                {module === 'mobile-users' && 'Mobile User Management'}
              </Typography>
              <Chip 
                label={enabled ? 'Enabled' : 'Disabled'} 
                color={enabled ? 'success' : 'default'} 
                size="small" 
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const SystemTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>System Configuration</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <FormControlLabel
              control={
                <Switch 
                  checked={systemSettings.maintenanceMode} 
                  onChange={(e) => handleSystemChange('maintenanceMode', e.target.checked)}
                  color="warning"
                />
              }
              label="Maintenance Mode"
            />
            <Typography variant="body2" color="text.secondary">
              Restrict system access during updates
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <FormControlLabel
              control={
                <Switch 
                  checked={systemSettings.autoBackup} 
                  onChange={(e) => handleSystemChange('autoBackup', e.target.checked)}
                />
              }
              label="Auto Backup"
            />
            <Typography variant="body2" color="text.secondary">
              Automatically backup data daily at 2 AM
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <FormControlLabel
              control={
                <Switch 
                  checked={systemSettings.emailNotifications} 
                  onChange={(e) => handleSystemChange('emailNotifications', e.target.checked)}
                />
              }
              label="Email Notifications"
            />
            <Typography variant="body2" color="text.secondary">
              Send system alerts via email
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <FormControlLabel
              control={
                <Switch 
                  checked={systemSettings.twoFactorAuth} 
                  onChange={(e) => handleSystemChange('twoFactorAuth', e.target.checked)}
                />
              }
              label="Two-Factor Authentication"
            />
            <Typography variant="body2" color="text.secondary">
              Require 2FA for enhanced security
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Session Timeout (minutes)"
          type="number"
          value={systemSettings.sessionTimeout}
          onChange={(e) => handleSystemChange('sessionTimeout', parseInt(e.target.value))}
          margin="normal"
          helperText="Auto-logout inactive users"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Max Login Attempts"
          type="number"
          value={systemSettings.maxLoginAttempts}
          onChange={(e) => handleSystemChange('maxLoginAttempts', parseInt(e.target.value))}
          margin="normal"
          helperText="Lock account after failed attempts"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Data Retention (days)"
          type="number"
          value={systemSettings.dataRetention}
          onChange={(e) => handleSystemChange('dataRetention', parseInt(e.target.value))}
          margin="normal"
          helperText="Keep deleted data for recovery"
        />
      </Grid>
    </Grid>
  );

  const IntegrationsTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">API Keys & Integrations</Typography>
          <Button variant="outlined" size="small">
            Add Integration
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Service</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>API Key</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Last Used</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiKeys.map((api) => (
                <TableRow key={api.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
                  <TableCell sx={{ fontWeight: 'medium' }}>{api.name}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                    {api.key}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={api.status} 
                      color={api.status === 'Active' ? 'success' : 'default'} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{api.lastUsed}</TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => regenerateApiKey(api.id)}>
                      Refresh
                    </Button>
                    <Button size="small">
                      Edit
                    </Button>
                    <Button size="small" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );

  const BackupTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>Backup & Restore</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" mb={2}>Backup Configuration</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Backup Frequency</InputLabel>
              <Select
                value={backupSettings.frequency}
                onChange={(e) => setBackupSettings(prev => ({ ...prev, frequency: e.target.value }))}
              >
                <MenuItem value="hourly">Hourly</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="time"
              label="Backup Time"
              value={backupSettings.time}
              onChange={(e) => setBackupSettings(prev => ({ ...prev, time: e.target.value }))}
              margin="normal"
            />
            <TextField
              fullWidth
              type="number"
              label="Retention Days"
              value={backupSettings.retention}
              onChange={(e) => setBackupSettings(prev => ({ ...prev, retention: parseInt(e.target.value) }))}
              margin="normal"
            />
            <Typography variant="body2" color="text.secondary" mt={2}>
              Last Backup: {backupSettings.lastBackup}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" mb={2}>Backup Actions</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                variant="contained"
                onClick={handleBackup}
                fullWidth
              >
                Create Backup Now
              </Button>
              <Button
                variant="outlined"
                onClick={handleRestore}
                fullWidth
              >
                Restore from Backup
              </Button>
              <Button
                variant="outlined"
                fullWidth
              >
                Download Backup Files
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Backup includes: Database, Files, Configurations, User Data
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const AppearanceTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" mb={2}>Theme & Appearance</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" mb={2}>Theme Settings</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Theme Mode</InputLabel>
              <Select
                value={themeSettings.mode}
                onChange={(e) => setThemeSettings(prev => ({ ...prev, mode: e.target.value }))}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="auto">Auto (System)</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              type="color"
              label="Primary Color"
              value={themeSettings.primaryColor}
              onChange={(e) => setThemeSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Sidebar Theme</InputLabel>
              <Select
                value={themeSettings.sidebarColor}
                onChange={(e) => setThemeSettings(prev => ({ ...prev, sidebarColor: e.target.value }))}
              >
                <MenuItem value="light">Light</MenuItem>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="colored">Colored</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch 
                  checked={themeSettings.compactSidebar}
                  onChange={(e) => setThemeSettings(prev => ({ ...prev, compactSidebar: e.target.checked }))}
                />
              }
              label="Compact Sidebar"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" mb={2}>Preview</Typography>
            <Box 
              sx={{ 
                height: 200, 
                border: 1, 
                borderColor: 'divider', 
                borderRadius: 1,
                backgroundColor: themeSettings.mode === 'dark' ? 'grey.900' : 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography color={themeSettings.mode === 'dark' ? 'white' : 'text.primary'}>
                Theme Preview
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, backgroundColor: themeSettings.primaryColor }}
            >
              Apply Theme
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const AuditTab = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">System Audit Logs</Typography>
          <Button variant="outlined" size="small">
            Export Logs
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>User</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Timestamp</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>IP Address</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}>
                  <TableCell sx={{ fontWeight: 'medium' }}>{log.user}</TableCell>
                  <TableCell>
                    <Chip 
                      label={log.action} 
                      color={log.action.includes('Updated') ? 'info' : log.action.includes('Disabled') ? 'warning' : 'success'} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{log.timestamp}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{log.ip}</TableCell>
                  <TableCell>
                    <Button size="small">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );

  return (
    <PageContainer title="Settings" description="System Configuration">
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Settings Dashboard</Typography>
          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#f8f9ff',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#e8eaff',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#5a67d8' }}>📦</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    {Object.values(moduleSettings).filter(Boolean).length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Active Modules
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#f0fff4',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#c6f6d5',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#38a169' }}>🔗</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    {apiKeys.filter(api => api.status === 'Active').length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    API Integrations
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: systemSettings.maintenanceMode ? '#fffbf0' : '#f0fff4',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: systemSettings.maintenanceMode ? '#fed7aa' : '#c6f6d5',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: systemSettings.maintenanceMode ? '#d69e2e' : '#38a169' }}>
                    {systemSettings.maintenanceMode ? '🔧' : '✅'}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    {systemSettings.maintenanceMode ? 'Maintenance' : 'Online'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    System Status
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: systemSettings.twoFactorAuth ? '#f0fff4' : '#fffbf0',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: systemSettings.twoFactorAuth ? '#c6f6d5' : '#fed7aa',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: systemSettings.twoFactorAuth ? '#38a169' : '#d69e2e' }}>
                    {systemSettings.twoFactorAuth ? '🔒' : '🔓'}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    {systemSettings.twoFactorAuth ? 'High' : 'Medium'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Security Level
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="scrollable">
              <Tab label="Company" />
              <Tab label="Modules" />
              <Tab label="System" />
              <Tab label="Integrations" />
              <Tab label="Backup" />
              <Tab label="Appearance" />
              <Tab label="Audit Logs" />
            </Tabs>
          </Box>
          <CardContent>
            {activeTab === 0 && <CompanyTab />}
            {activeTab === 1 && <ModulesTab />}
            {activeTab === 2 && <SystemTab />}
            {activeTab === 3 && <IntegrationsTab />}
            {activeTab === 4 && <BackupTab />}
            {activeTab === 5 && <AppearanceTab />}
            {activeTab === 6 && <AuditTab />}
          </CardContent>
        </Card>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            {dialogType === 'backup' ? 'Create System Backup' : 'Restore from Backup'}
          </DialogTitle>
          <DialogContent>
            {dialogType === 'backup' ? (
              <Box>
                <Typography variant="body2" mb={2}>
                  This will create a complete backup of your system including:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="• Database & Records" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• File Uploads & Documents" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="• System Configuration" />
                  </ListItem>
                </List>
                <LinearProgress sx={{ mt: 2 }} />
                <Typography variant="caption" color="text.secondary" mt={1}>
                  Estimated time: 5-10 minutes
                </Typography>
              </Box>
            ) : (
              <Box>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  Restoring will overwrite current data. This action cannot be undone.
                </Alert>
                <TextField
                  fullWidth
                  type="file"
                  label="Select Backup File"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={executeBackup}
              color={dialogType === 'backup' ? 'primary' : 'warning'}
            >
              {dialogType === 'backup' ? 'Create Backup' : 'Restore'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default SettingsMain;