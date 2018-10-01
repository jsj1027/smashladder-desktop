import electronSettings from 'electron-settings';
import {
	SET_LOGIN_KEY,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGIN_BEGIN,
	INVALID_LOGIN_KEY,
	LOGOUT_BEGIN,
	DISABLE_CONNECTION,
	ENABLE_CONNECTION, ENABLE_DEVELOPMENT_URLS, ENABLE_PRODUCTION_URLS
} from '../actions/login';

const defaultLoginState = {
	player: null,
	loginCode: null,
	sessionId: null,
	productionUrls: true
};
const loginDatas = electronSettings.get('login', defaultLoginState);

const initialState = {
	loginErrors: [],
	player: loginDatas.player,
	loginCode: loginDatas.loginCode,
	sessionId: loginDatas.sessionId,
	productionUrls: loginDatas.productionUrls,
	connectionEnabled: true,
	isLoggingIn: false,
	showLoginButton: false,
};

export default (state = initialState, action) => {
	switch(action.type)
	{
		case ENABLE_DEVELOPMENT_URLS:
			electronSettings.set('login.productionUrls', false);
			return {
				...state,
				productionUrls: false
			};
		case ENABLE_PRODUCTION_URLS:
			electronSettings.set('login.productionUrls', true);
			return {
				...state,
				productionUrls: true
			};
		case ENABLE_CONNECTION:
			return {
				...state,
				connectionEnabled: true
			};
		case DISABLE_CONNECTION:
			return {
				...state,
				connectionEnabled: false
			};
		case LOGOUT_BEGIN:
			electronSettings.set('login', defaultLoginState);
			return {
				...state,
				...defaultLoginState,
				productionUrls: state.login.productionUrls,
			};
		case LOGIN_SUCCESS:
		case SET_LOGIN_KEY:
		case LOGIN_FAIL:
		case INVALID_LOGIN_KEY:
		case LOGIN_BEGIN:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}