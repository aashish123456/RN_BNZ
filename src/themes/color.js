const app = {
    primary: '#258652',
    secondary: '#ddd',
    background: '#FFFFFF',
    cardBackground: '#FFFFFF',
    listItemBackground: '#FFFFFF',
};
const color = {
    Corn: '#DABB02',
    light_Gray: '#E3E2E3',
    white: 'white',
    black:'#000',
    lightGray_text: '#A7A7A7',
    lightSilver: '#f9f8f7',
    purple: '#141764',
    Westar_approx: '#dfdeda',
    red : '#ea1828',
    blurWhite:"rgba(120,120, 120, 0.7)"
};
const brand = {
    brand: {
        primary: '#0E4EF8',
        secondary: '#17233D',
    },
};
const text = {
    textPrimary: '#141764',
    textSecondary: '#777777',
    headingPrimary: brand.brand.primary,
    headingSecondary: brand.brand.primary,
};

const borders = {
    border: '#D0D1D5',
};

const tabbar = {
    tabbar: {
        background: '#ffffff',
        iconDefault: '#BABDC2',
        iconSelected: brand.brand.primary,
    },
};

const flexDirection = {
    flexDirectioncolumn: 'column',
    flexDirectionrow: 'row',
    justifyContentcenter: 'center',
    alignItemsflexstart: 'flex-start',
    justifyContentspacebetween: 'space-between',
    alignItemscenter: 'center',
}
const Flex = {
    flex1: 1,
    flex2: 2,
    flex3: 3,
    flex4: 4,
    flex5: 5,
    flex6: 6,
    flex7: 7,
    flex8: 8,
    flex9: 9,
    flex10: 10
}
const Margin = {
    marginTop2: 2,
    marginTop4: 4,
    marginTop6: 6,
    marginTop8: 8,
    marginTop10: 10,
    marginTop15: 15,
    marginTop20: 20,

    // Left Margin
    marginLeft10: 10,
    marginLeft20: 20,
    marginLeft30: 30,
    marginLeft40: 40,

    // Right Margin
    marginRight10: 10,
    marginRight20: 20,
    marginRight30: 30,
    marginRight40: 40,

    //Bottom Margin
    marginBottom10: 10,
    marginBottom20: 20,
    marginBottom30: 30,
    marginBottom40: 40,
}
const Padding = {
    padding10: 10,
    padding20: 20,
    padding30: 30,
    // padding Left
    paddingLeft10: 10,
    paddingLeft20: 20,
    paddingLeft30: 30,
    paddingLeft40: 40,

    // padding Right
    paddingRight10: 10,
    paddingRight20: 20,
    paddingRight30: 30,
    paddingRight40: 40,
    paddingRight50: 50,

    // padding top
    paddingTop10: 10,
    paddingTop15: 15,
    paddingTop20: 20,
    paddingTop30: 30,
}
const Align = {
    textAlignCenter: 'center',
    alignSelfcenter: 'center',
}
const Fonts = {
    fontFamilyRegular: "Roboto-Black",
    fontFamilyBlack: "Lato-Black",
    fontFamilyBlackItalic: "Lato-BlackItalic",
    fontFamilyBold: "Roboto-Bold",
    fontFamilyBoldItalic: "Roboto-BoldItalic",
    fontFamilyItalic: "Roboto-Italic",
    fontFamilyLight: "Roboto-Light",
    fontFamilyLightItalic: "Roboto-LightItalic",
    fontFamilyRegular: "Roboto-Regular",
}
export default {
    ...app,
    ...brand,
    ...text,
    ...borders,
    ...tabbar,
    ...color,
    ...flexDirection,
    ...Flex,
    ...Margin,
    ...Align,
    ...Padding,
    ...Fonts
};


/*
Roboto-Black.ttf
Roboto-BlackItalic.ttf
Roboto-Bold.ttf
Roboto-BoldCondensed.ttf
Roboto-BoldCondensedItalic.ttf
Roboto-BoldItalic.ttf
Roboto-Condensed.ttf
Roboto-CondensedItalic.ttf
Roboto-Italic.ttf
Roboto-Light.ttf
Roboto-LightItalic.ttf
Roboto-Medium.ttf
Roboto-MediumItalic.ttf
Roboto-Regular.ttf
Roboto-Thin.ttf
Roboto-ThinItalic.ttf

*/
