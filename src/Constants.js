/**
 * Created by rishi paliwal on 6 nov 2017
 * Global constants for using  whole application  
*/

import { Dimensions } from 'react-native';
// ...
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const extraSmallScreen = Dimensions.get("window").height < 568;
export const smallScreen = Dimensions.get("window").height < 667;
// ...
export const COVERIMAGE_HEIGHT = SCREEN_WIDTH / 3 * 2;
export const CARD_OFFSET = 20;
export const STATUS_BAR_HEIGHT_IOS = 20;
export const CARD_BETWEEN_DISTANCE = 7;
// ...
export const SYMBOL = '℃';
export const SYMBOL_SECOND = 'Sec';
export const SYMBOL_MINUTE = 'Min';

// ... more spacing constants
export const SPACING_XXS = 4;
export const SPACING_XS = 6;
export const SPACING_S = 12;
// ...
// export const BASE_URL = "www.example.com";
// export const URL_Login = BASE_URL + 'Login';
// export const URL_ForgotPassword = BASE_URL + 'ForgotPassword';
// export const URL_GetUserProfile = BASE_URL + 'GetUserProfile';
// export const URL_UpdateUserProfile = BASE_URL + 'UpdateUserProfile';
// export const URL_DashboardCount = BASE_URL + 'DashboardCount';
// export const URL_GetTodayInspection = BASE_URL + 'GetTodayInspection';
// export const URL_GetWorkload = BASE_URL + 'GetWorkload';




