import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 25,
    borderRadius: 4,
    backgroundColor: '#fff',
    boxShadow: '0px 0px 13px 0px rgba(82, 63, 105, 0.05)',
    marginBottom: 10,
    marginTop: 10,
    height: '80px',
    width: '100%',
    '&:hover': {
      boxShadow: '0px 9px 16px 0px rgba(88,103,221,0.25)',
      borderColor: theme.palette.primary.main,
    },
  },
  cardTitle: {
    paddingTop: 0,
    paddingBottom: 18,
    marginBottom: 30,
    '& h3': {
      fontSize: 20,
      fontWeight: 500,
      marginBottom: 0,
      color: '#6c7293',
    },
    '& span': {
      marginTop: 4,
      color: '#a7abc3',
    },
  },
}));

export default function Card({ className, title, subtitle, content, ...rest }) {
  const classes = useStyles();

  return (
    <div className={`${classes.card} ${className}`} {...rest}>
      <div className={classes.cardTitle}>
        <h3 style={{ marginBottom: 20 }}>{title}</h3>
        <span>{subtitle}</span>
      </div>
      <div className={classes.cardContent}>
        <div>{content}</div>
      </div>
    </div>
  );
}
