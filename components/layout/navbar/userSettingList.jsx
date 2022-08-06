import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyIcon from '@mui/icons-material/Key';
import ReceiptIcon from '@mui/icons-material/Receipt';

const UserSettingList = () => {
  return (
    <>
      <Paper sx={{ width: 320, maxWidth: '100%' }}>
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <SettingsIcon></SettingsIcon>
            </ListItemIcon>
            <ListItemText>User Settings</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <EmailIcon></EmailIcon>
            </ListItemIcon>
            <ListItemText>Message</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <KeyIcon></KeyIcon>
            </ListItemIcon>
            <ListItemText>Change Password</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ReceiptIcon></ReceiptIcon>
            </ListItemIcon>
            <ListItemText>Transaction History</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <LogoutIcon></LogoutIcon>
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </>
  )
}

export default UserSettingList;