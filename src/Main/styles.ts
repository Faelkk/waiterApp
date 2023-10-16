import styled from "styled-components/native";
import Constants from "expo-constants";
import { Platform } from "react-native";

const isAndroid = Platform.OS === "android";
const statusBarHeight = Constants.statusBarHeight;

export const Container = styled.SafeAreaView`
    flex: 1;
    margin-top: ${isAndroid ? `${statusBarHeight}px` : "0"};
    background: #fafafa;
`;

export const CategoriesContainer = styled.View`
    height: 73px;
    margin-top: 34px;
`;
export const MenuContainer = styled.View`
    flex: 1;
`;

export const Footer = styled.View`
    background: #fff;
    min-height: 110px;
`;

export const FooterContainer = styled.SafeAreaView``;

export const CenteredContainer = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`;
