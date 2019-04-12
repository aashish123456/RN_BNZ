export const getNavigationOptions = (title, backgroundColor, color) => ({
    title,
    headerTitle: title,
    headerStyle: {
        backgroundColor,
    },
    headerTitleStyle: {
        color,
    },
    headerTintColor: color,
});

export const getNavigationOptionsWithAction = (title, backgroundColor, color, headerLeft) => ({
    title,
    headerStyle: {
        backgroundColor,
    },
    headerTitleStyle: {
        color,
        alignSelf: 'center',
        textAlign: 'center',
        right:25
    },
    headerTintColor: color,
    headerLeft,
});

export const getDrawerNavigationOptions = (title, backgroundColor, titleColor, drawerIcon) => ({
    title,
    headerTitle: title,
    headerStyle: {
        backgroundColor,
    },
    headerTitleStyle: {
        color: titleColor,

    },
    headerTintColor: titleColor,
    drawerLabel: title,
    drawerIcon,
});

export const getDrawerConfig = (drawerWidth, drawerPosition, initialRouteName, drawerBackgroundColor) => ({
    drawerWidth: drawerWidth,
    drawerPosition: drawerPosition,
    initialRouteName,
    drawerBackgroundColor: '#000',
    contentOptions: {
        style: {
            backgroundColor: '#141764',
            flex: 1,
        },
        labelStyle: {
            color: 'white'
        }
    }

});