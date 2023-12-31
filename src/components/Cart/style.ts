import styled from "styled-components/native";

export const Item = styled.View`
    padding: 8px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`;

export const ProductContainer = styled.View`
    flex-direction: row;
`;

export const Action = styled.View`
    flex-direction: row;
`;
export const Image = styled.Image`
    width: 58px;
    height: 50px;
    border-radius: 6px;
`;
export const QuantityContainer = styled.View`
    min-width: 20px;
    margin-left: 12px;
`;
export const ProductDetails = styled.View``;

export const Sumary = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 20px;
`;
export const TotalContainer = styled.View`
    margin-right: 32px;
    flex: 1;
`;
