import { FlatList, Modal } from "react-native";
import { Text } from "../../utils/Text";

import { Product } from "../../Types/Type";
import {
    CloseButton,
    Footer,
    FooterContainer,
    Header,
    Image,
    Ingredient,
    IngredientsContainer,
    ModalBody,
    PriceContainer,
} from "./style";
import { Close } from "../Icons/Close";
import React from "react";
import { formatCurrency } from "../../utils/FormatCurrency";
import Button from "../Button/Button";

interface ProductModalProps {
    visible: boolean;
    onClose: () => void;
    product: Product | null;
    onAddToCart: (product: Product) => void;
}

export default function ProductModal({
    visible,
    product,
    onClose,
    onAddToCart,
}: ProductModalProps) {
    if (!product) return null;

    function handleAddCart() {
        onAddToCart(product!);

        onClose();
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <Image
                source={{
                    uri: `http://10.0.0.110:5001/uploads/${product?.imagePath}`,
                }}
            >
                <CloseButton onPress={onClose}>
                    <Close />
                </CloseButton>
            </Image>
            <ModalBody>
                <Header>
                    <Text size={24} weight="600">
                        {product.name}
                    </Text>
                    <Text size={16} color="#666" style={{ marginTop: 8 }}>
                        {product.description}
                    </Text>
                </Header>

                {product.ingredients.length > 0 && (
                    <IngredientsContainer>
                        <Text weight="600" color="#666" size={16}>
                            Ingredients
                        </Text>
                        <FlatList
                            data={product.ingredients}
                            keyExtractor={(ingredient) => ingredient._id}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return (
                                    <Ingredient>
                                        <Text>{item.icon}</Text>
                                        <Text
                                            style={{ marginLeft: 20 }}
                                            size={14}
                                            color="#666"
                                        >
                                            {item.name}
                                        </Text>
                                    </Ingredient>
                                );
                            }}
                        />
                    </IngredientsContainer>
                )}
            </ModalBody>
            <Footer>
                <FooterContainer>
                    <PriceContainer>
                        <Text color="#666">Preço</Text>
                        <Text size={20} weight="600">
                            {formatCurrency(product.price)}
                        </Text>
                    </PriceContainer>
                    <Button onPress={handleAddCart}>Adicionar ao pedido</Button>
                </FooterContainer>
            </Footer>
        </Modal>
    );
}
