import React from "react";
import { Text } from "../../utils/Text";
import { Container, OrderContent, OrderHeader, Table } from "./style";
import { TouchableOpacity } from "react-native";

interface HeaderProps {
    selectedTable: string;
    onCancelOrder: () => void;
}

export default function Header({ selectedTable, onCancelOrder }: HeaderProps) {
    return (
        <Container>
            {!selectedTable && (
                <>
                    <Text size={14} opacity={0.9}>
                        Bem vindo(a) ao
                    </Text>
                    <Text size={24} weight="700">
                        WAITER<Text size={24}>APP </Text>
                    </Text>
                </>
            )}
            {selectedTable && (
                <OrderContent>
                    <OrderHeader>
                        <Text size={24} weight="600">
                            Pedido
                        </Text>
                        <TouchableOpacity onPress={onCancelOrder}>
                            <Text color="#D73035" weight="600" size={14}>
                                cancelar pedido
                            </Text>
                        </TouchableOpacity>
                    </OrderHeader>

                    <Table>
                        <Text color="#666">Mesa {selectedTable}</Text>
                    </Table>
                </OrderContent>
            )}
        </Container>
    );
}
