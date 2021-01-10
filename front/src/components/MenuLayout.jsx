import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Login from './Login';

const useStyles = makeStyles(() => ({
  loginbutton: {
    float: 'right',
    marginTop: '5px',
    marginRight: '20px',
    background: '#ffffffff',
    color: 'rgba(0, 0, 0, 0.26)',
    boxShadow: 'none',
  },
  sideBar: {
    position: 'absolute',
    width: '55px',
    height: '100%',
    backgroundColor: '#CCCCCCCC',
  },
  span: {
    color: 'rgba(0, 0, 0, 0.54);',
    fontSize: '14px',
  },
}));

// eslint-disable-next-line react/prop-types
const Menu = ({ children }) => {
  const [loginVisible, setLoginVisible] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <div>
        <header
          style={{
            position: 'absolute',
            height: '8%',
            width: '100%',
          }}
        >
          <IconButton style={{ marginRight: '20px' }}>
            <MenuRoundedIcon />
          </IconButton>

          <Button
            style={{ zIndex: 10000 }}
            onClick={() => {
              setLoginVisible((pre) => !pre);
            }}
            className={classes.loginbutton}
            startIcon={<AccountCircleRoundedIcon />}
          >
            로그인
          </Button>
        </header>
      </div>
      {loginVisible ? <Login /> : <> </>}

      <Grid container>
        <Grid xs={1}>
          <div className={classes.sideBar}>
            <MenuList>
              <MenuItem
                onClick={() => history.push('/')}
                style={{ marginTop: '120px' }}
              >
                <ListItemIcon>
                  <HomeRoundedIcon fontSize="big" />
                </ListItemIcon>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  history.push('/freeboard');
                }}
              >
                {/* <Link to="/freeboard">자유게시판</Link> */}
                <ListItemIcon>
                  <AssignmentRoundedIcon fontSize="big" />
                </ListItemIcon>
              </MenuItem>

              <MenuItem onClick={() => history.push('/feedboard')}>
                {/* <Link to="/feedboard">일상 피드</Link> */}
                <ListItemIcon>
                  <SupervisorAccountRoundedIcon fontSize="big" />
                </ListItemIcon>
              </MenuItem>

              <MenuItem onClick={() => history.push('/study')}>
                <ListItemIcon>
                  <MenuBookRoundedIcon fontSize="big" />
                </ListItemIcon>
              </MenuItem>
            </MenuList>
          </div>
        </Grid>

        <Grid xs={11}>{children}</Grid>
      </Grid>
    </>
  );
};

export default Menu;
