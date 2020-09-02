/* eslint-disable prettier/prettier */
import * as types from './types';

// library
import axios from 'axios';

let urlBackend = 'https://dev.dispenda.online/api';

export const random_code = randomCode => {
    return {
        type: types.RANDOM_CODE,
        payload: {
            randomCode,
        },
    };
};

export const getRandomCode = () => {
    return dispatch => {
      return new Promise((resolve, reject) => {
          axios
            .get(urlBackend + '/get-random-code', {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(res => {
              console.log(res);
              if (res.data.error) {
                resolve(res.data);
              } else {
                dispatch(random_code(res.data));
                resolve(res.data);
              }
            })
            .catch(error => {
              console.log('ERRRR:: ', error.response.data);
              resolve(error);
            });
      });
    };
  };

export const submit_code = submitCode => {
  return {
      type: types.SUBMIT_CODE,
      payload: {
          submitCode,
      },
  };
};

export const SubmitCode = (data) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
        axios
          .post(urlBackend + '/post-screen-1', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(res => {
            console.log(res);
            if (res.data.error) {
              resolve(res.data);
            } else {
              dispatch(submit_code(res.data));
              resolve(res.data);
            }
          })
          .catch(error => {
            console.log('ERRRR:: ', error.response.data);
            resolve(error);
          });
    });
  };
};
