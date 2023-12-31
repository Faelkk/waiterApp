import styled from "styled-components/native";

export const Image = styled.ImageBackground`
    width: 100%;
    height: 200px;
`;

export const CloseButton = styled.TouchableOpacity`
    width: 32px;
    height: 32px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 24px;
    top: 24px;
    padding: 15px;
`;

export const ModalBody = styled.View`
    background: red;
    flex: 1;
    background: #fafafa;
    padding: 32px 24px;
`;

export const Header = styled.View``;

export const IngredientsContainer = styled.View`
    margin-top: 32px;
    flex: 1;
`;

export const Ingredient = styled.View`
    margin-top: 14px;
    border-radius: 8px;
    flex-direction: row;
    padding: 16px;
    border: 1px solid rgba(204, 204, 204, 0, 3);
    align-items: center;
`;

export const Footer = styled.View`
    min-height: 110px;
    background: #fff;
    padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;
export const PriceContainer = styled.View``;
