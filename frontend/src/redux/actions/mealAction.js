import {
  MEAL_REQUEST,
  MEAL_SUCCESS,
  MEAL_FAIL,
  MEAL_DETAILS_REQUEST,
  MEAL_DETAILS_SUCCESS,
  MEAL_DETAILS_FAIL,
  MEAL_DELETE_REQUEST,
  MEAL_DELETE_SUCCESS,
  MEAL_DELETE_FAIL,
  MEAL_CREATE_REQUEST,
  MEAL_CREATE_SUCCESS,
  MEAL_CREATE_FAIL,
  MEAL_UPDATE_REQUEST,
  MEAL_UPDATE_SUCCESS,
  MEAL_UPDATE_FAIL,
} from "../constants/mealConstants";
import mealApi from "../../components/api/mealApi";
import { logout } from "./userActions";

//Fetch meal list
export const getMealList = () => async (dispacth) => {
  try {
    dispacth({ type: MEAL_REQUEST });
    const { data } = await mealApi.get("/api/meals");

    dispacth({ type: MEAL_SUCCESS, payload: data });
  } catch (err) {
    dispacth({
      type: MEAL_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

//Fetch meal details
export const getMealDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MEAL_DETAILS_REQUEST });

    const { data } = await mealApi.get(`/api/meals/${id}`);

    dispatch({ type: MEAL_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: MEAL_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

//Delete meals
export const deleteMeal = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEAL_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await mealApi.delete(`/api/meals/${id}`, config);

    dispatch({
      type: MEAL_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: MEAL_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createMeal =
  (name, price, image, category, countInStock, description) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: MEAL_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await mealApi.post(
        `/api/meals`,
        { name, price, image, category, countInStock, description },
        config
      );

      dispatch({
        type: MEAL_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: MEAL_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateMeal = (meal) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEAL_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await mealApi.put(`/api/meals/${meal._id}`, meal, config);

    dispatch({
      type: MEAL_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: MEAL_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: MEAL_UPDATE_FAIL,
      payload: message,
    });
  }
};
