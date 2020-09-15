import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Grid, makeStyles } from '@material-ui/core';
import Card from '../components/Card';
import Button from '../components/Button';

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    width: '24%',
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
}));

export default function CompanyDetails() {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const company = location.state;
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
      <Grid item xs={12} style={{ padding: 20 }}>
        Contact Person Details
      </Grid>
      <Grid
        item
        xs={12}
        style={{ flexWrap: 'wrap', display: 'flex' }}
        direction='row'
      >
        {company.contactDetails.map((contact) => (
          <Card
            className={classes.cardStyle}
            title={`Name : ${contact.name}`}
            subtitle={`Number : ${contact.number}`}
          />
        ))}
      </Grid>
    </Grid>
  );
}
