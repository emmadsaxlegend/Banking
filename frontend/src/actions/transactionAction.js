import Axios from 'axios'
import { ADD_TRANSACTION, GET_TRANSACTION } from '../utils/Constant'
import { updateAccount } from './accountActions'
import { setErrors } from './Alert'

export const depositAmount = (account_id, deposit_amount) => async dispatch => {
    try {
        const { data: { msg , accountDetails, transactionDetails } } = await Axios.post(`http://localhost:5000/deposit/${account_id}`, { deposit_amount })
        
        dispatch({
            type: ADD_TRANSACTION,
            payload: transactionDetails
        })

        dispatch(updateAccount(accountDetails))
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data))
    }
}

export const withdrawAmount = (account_id, withdraw_amount) => async dispatch => {
    try {
        const { data: { msg , accountDetails, transactionDetails } } = await Axios.post(`http://localhost:5000/withdraw/${account_id}`, { withdraw_amount })

        dispatch({
            type: ADD_TRANSACTION,
            payload: transactionDetails
        })

        dispatch(updateAccount(accountDetails))
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data))
    }
}

export const getTransactions = (account_id, startDate, endDate) => async dispatch => {
    try {
        const transactions = await Axios.get(`http://localhost:5000/transaction/${account_id}`,
            {
                params: {
                    startDate,
                    endDate
                }
            })
        dispatch({
            type: GET_TRANSACTION,
            payload: transactions.data
        })
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data))
    }
}