import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';
import store from '../services/store';
import Card from '../components/Card';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    marginLeft: 6,
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '34ch',
      },
    },
  },
}));

export default function CompanyList() {
  const classes = useStyles();
  const history = useHistory();
  const companyList = useSelector((store) => store.root.data);

  const [searchResult, setSearchResult] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const handleCardClick = (company) => {
    history.push({ pathname: '/details', state: company });
  };

  const handleSearch = (key) => {
    setSearchKey(key);
    let result = companyList.filter((item) => {
      if (
        item.companyName
          .toLocaleLowerCase()
          .includes(key.trim().toLocaleLowerCase()) ||
        item.companyDesc
          .toLocaleLowerCase()
          .includes(key.trim().toLocaleLowerCase())
      ) {
        return item;
      }
    });
    setSearchResult(result);
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.title}>Company Hub</div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search Company Name/type'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              style={{ font: 'inherit' }}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: 80 }}>
        {[companyList, searchResult][searchKey.length > 0 ? 1 : 0].map(
          (company, index) => (
            <Card
              key={index}
              title={company.companyName}
              subtitle={company.companyDesc}
              onClick={() => handleCardClick(company)}
            />
          )
        )}
      </div>
    </div>
  );
}
