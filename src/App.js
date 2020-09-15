import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { SET_SNACKBAR_TEXT, INSERT_DATA } from './services/store';
import { useDispatch, useSelector } from 'react-redux';
import CustomizedSnackbars from './components/Snackbar';
import CompanyList from './scenes/CompanyList';
import CompanyDetails from './scenes/CompanyDetails';

function App() {
  const dispatch = useDispatch();
  const snackbarText = useSelector((state) => state.root.snackbarText);
  const snackbarType = useSelector((state) => state.root.snackbarType);

  const companyData = [
    {
      id: 0,
      companyName: 'Dell',
      contactDetails: [
        { id: 0, name: 'Person1' },
        { id: 1, name: 'Person 2' },
      ],
      companyDesc: 'A computer manufacturing company',
    },
    {
      id: 0,
      companyName: 'HP',
      contactDetails: [
        { id: 0, name: 'Person1' },
        { id: 1, name: 'Person 2' },
      ],
      companyDesc: 'A computer manufacturing company',
    },
    {
      id: 0,
      companyName: 'Lenovo',
      contactDetails: [
        { id: 0, name: 'Person1' },
        { id: 1, name: 'Person 2' },
      ],
      companyDesc: 'A computer manufacturing company',
    },
    {
      id: 0,
      companyName: 'Acer',
      contactDetails: [
        { id: 0, name: 'Person1' },
        { id: 1, name: 'Person 2' },
      ],
      companyDesc: 'A computer manufacturing company',
    },
    {
      id: 0,
      companyName: 'Asus',
      contactDetails: [
        { id: 0, name: 'Person1' },
        { id: 1, name: 'Person 2' },
      ],
      companyDesc: 'A computer manufacturing company',
    },
    {
      id: 0,
      companyName: 'Razer Blade',
      contactDetails: [
        { id: 0, name: 'Person1' },
        { id: 1, name: 'Person 2' },
      ],
      companyDesc: 'A computer manufacturing company',
    },
  ];

  const insertData = (data) => {
    dispatch({
      type: INSERT_DATA,
      data: data,
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
    insertData(companyData);
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
