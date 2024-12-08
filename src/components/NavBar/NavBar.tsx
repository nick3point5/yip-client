import { useState } from 'react'

import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.css'
import { API } from '../../api'

export function NavBar() {
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
	const isLogin = !!API.getToken()

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseMenu = () => {
		setAnchorElUser(null)
	}

	return (
		<AppBar position="static" elevation={1} className={`NavBar`}>
			<Toolbar disableGutters id="navToolbar">
				<Typography variant="h6" noWrap component="div">
					YIP
				</Typography>
				{isLogin ? (
					<Box id="loginActions">
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
								<MenuIcon />
							</IconButton>
						</Tooltip>
						<Menu
							anchorEl={anchorElUser}
							sx={{ mt: '45px' }}
							id="navbarMenu"
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseMenu}
						>
						</Menu>
					</Box>
				) : (
					<Button>Login</Button>
				)}
			</Toolbar>
		</AppBar>
	)
}
