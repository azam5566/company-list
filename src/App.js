import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SET_SNACKBAR_TEXT, INSERT_DATA } from './services/store';
import { useDispatch, useSelector } from 'react-redux';
import CustomizedSnackbars from './components/Snackbar';
import CompanyList from './scenes/CompanyList';
import CompanyDetails from './scenes/CompanyDetails';
import { companyData } from './services/constants';

function App() {
  const dispatch = useDispatch();
  const snackbarText = useSelector((state) => state.root.snackbarText);
  const snackbarType = useSelector((state) => state.root.snackbarType);

  const insertData = () => {
    dispatch({
      type: INSERT_DATA,
      data: companyData,
    });
  };

  const handleClose = () => {
    dispatch({
      type: SET_SNACKBAR_TEXT,
      data: {
        text: '',
        type: '',
      },
    });
  };

  useEffect(() => {
    insertData();
  });

  return (
    <>
      <Switch>
        <Redirect exact from='/' to='/list' />
        <Route path='/list' component={CompanyList} />
        <Route exact path='/details' component={CompanyDetails} />
      </Switch>
      <CustomizedSnackbars
        text={SET_SNACKBAR_TEXT}
        open={!!snackbarText}
        handleClose={handleClose}
        type={snackbarType}
      />
    </>
  );
}

export default App;
