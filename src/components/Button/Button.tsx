import React from "react";

import { Container } from "./style";

import { Text } from "../../utils/Text";
import { ActivityIndicator } from "react-native";

interface ButtonProps {
    children: string;
    onPress: () => void;
    disabled?: boolean;
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onPress,
    disabled,
    loading,
}) => {
    return (
        <Container onPress={onPress} disabled={disabled || loading}>
            {!loading && (
                <Text size={18} weight="600" color="#fff">
                    {children}
                </Text>
            )}
            {loading && <ActivityIndicator color="#fff" />}
        </Container>
    );
};

export default Button;
