import { FlatList, TouchableOpacity } from "react-native";
import { CartItem, Product } from "../../Types/Type";
import React, { useState } from "react";
import {
    Item,
    Action,
    ProductContainer,
    Image,
    QuantityContainer,
    ProductDetails,
    Sumary,
    TotalContainer,
} from "./style";
import { Text } from "../../utils/Text";
import { formatCurrency } from "../../utils/FormatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import Button from "../Button/Button";
import OrderConfirmedModal from "../OrderConfirmedModal/OrderConfirmedModal";

interface CartProps {
    cartItems: CartItem[];
    onAdd: (product: Product) => void;
    onDecrement: (product: Product) => void;
    onConfirmOrder: () => void;
}

export default function Cart({
    cartItems,
    onAdd,
    onDecrement,
    onConfirmOrder,
}: CartProps) {
    const [visibleModalConfirm, setVisibleModalConfirm] = useState(false);
    const [isLoading] = useState(false);

    const Total = cartItems.reduce((acc, cartItem) => {
        return acc + cartItem.quantity * cartItem.product.price;
    }, 0);

    function handleOK() {
        setVisibleModalConfirm(false);
        onConfirmOrder();
    }

    return (
        <>
            <OrderConfirmedModal
                visible={visibleModalConfirm}
                onOk={handleOK}
            />

            {cartItems.length > 0 && (
                <FlatList
                    data={cartItems}
                    style={{ marginBottom: 20, maxHeight: 200 }}
                    keyExtractor={(cartItens) => cartItens.product._id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Item>
                            <ProductContainer>
                                <Image
                                    source={{
                                        uri: `http://10.0.0.110:5001/uploads/${item.product.imagePath}`,
                                    }}
                                />
                                <QuantityContainer>
                                    <Text size={14} color="#666">
                                        {item.quantity}x
                                    </Text>
                                </QuantityContainer>

                                <ProductDetails>
                                    <Text size={14} weight="600">
                                        {item.product.name}
                                    </Text>
                                    <Text
                                        size={14}
                                        color="#666"
                                        style={{ marginTop: 4 }}
                                    >
                                        {formatCurrency(item.product.price)}
                                    </Text>
                                </ProductDetails>
                            </ProductContainer>
                            <Action>
                                <TouchableOpacity
                                    style={{ marginRight: 24 }}
                                    onPress={() => onAdd(item.product)}
                                >
                                    <PlusCircle />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => onDecrement(item.product)}
                                >
                                    <MinusCircle />
                                </TouchableOpacity>
                            </Action>
                        </Item>
                    )}
                />
            )}
            <Sumary>
                <TotalContainer>
                    {cartItems.length > 0 ? (
                        <>
                            <Text color="#666">Total</Text>
                            <Text size={20} weight="600">
                                {formatCurrency(Total)}
                            </Text>
                        </>
                    ) : (
                        <Text color="#999">seu carrinho esta vazio</Text>
                    )}
                </TotalContainer>
                <Button
                    onPress={() => setVisibleModalConfirm(true)}
                    disabled={cartItems.length === 0}
                    loading={isLoading}
                >
                    Confirmar pedido
                </Button>
            </Sumary>
        </>
    );
}
