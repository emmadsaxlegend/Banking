import Axios from "axios"
import { setAuthHeader } from "../utils/Common"
import { GET_PROFILE, UPDATE_PROFILE } from "../utils/Constant"
import { setErrors } from "./Alert"

export const updateProfile = (profileData) => async dispatch => {
    try {
        const profile = await Axios.post(`http://localhost:5000/profile`, profileData);
        dispatch({
            type: UPDATE_PROFILE,
            payload: profile.data
        });
        // history.push('/profile');
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data));
    }
}

export const initiateGetProfile = (phone) => async dispatch => {
    try {
        setAuthHeader()
        const profile = await Axios.get(`http://localhost:5000/profile`);
        dispatch({
            type: GET_PROFILE,
            payload: profile.data
        });
    } catch (error) {
        error.response && dispatch(setErrors(error.response.data));
    }
}