import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Grid,
  makeStyles,
  Paper,
  InputBase,
  IconButton,
} from '@material-ui/core';
import Card from '../components/Card';
import Button from '../components/Button';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { SET_SNACKBAR_TEXT } from '../services/store';

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    width: '24%',
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: 120,
  },
  container: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '30%',
  },
  input: {
    marginLeft: theme.spacing(4),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function CompanyDetails() {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const company = location.state;

  const [searchResult, setSearchResult] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const handleSearch = (key) => {
    setSearchKey(key);
    let result = company.contactDetails.filter((item) => {
      if (
        item.name.toLocaleLowerCase().includes(key.trim().toLocaleLowerCase())
      ) {
        return item;
      }
    });

    setSearchResult(result);

    if (key.length === 0) {
      dispatch({
        type: SET_SNACKBAR_TEXT,
        data: {
          text: `Showing All Contacts`,
          type: 'warning',
        },
      });
    } else if (result.length > 0) {
      dispatch({
        type: SET_SNACKBAR_TEXT,
        data: {
          text: `${result.length} Contacts Found :)`,
          type: 'success',
        },
      });
    } else if (result.length === 0) {
      dispatch({
        type: SET_SNACKBAR_TEXT,
        data: {
          text: `Sorry No Contacts Found :(`,
          type: 'error',
        },
      });
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} style={{ margin: 20 }}>
        <Button onClick={() => history.goBack()}>Go Back</Button>
      </Grid>
      <Grid item xs={12}>
        <Card
          title={`Company Name : ${company.companyName}`}
          subtitle={`Company Name : ${company.companyDesc}`}
        />
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          padding: 20,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>Contact Person Details</div>
        <Paper component='form' className={classes.container}>
          <InputBase
            className={classes.input}
            placeholder='Search Contact Person'
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ flexWrap: 'wrap', display: 'flex' }}
        direction='row'
      >
        {[company.contactDetails, searchResult][
          searchKey.length > 0 ? 1 : 0
        ].map((contact) => (
          <Card
            className={classes.cardStyle}
            title={`Name : ${contact.name}`}
            subtitle={`Number : ${contact.number}`}
            isReveal
          />
        ))}
      </Grid>
    </Grid>
  );
}
