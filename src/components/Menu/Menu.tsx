import React, { useState } from "react";
import { Text } from "../../utils/Text";
import {
    AddToCartBtn,
    ProductContainer,
    ProductDetails,
    ProductImage,
    Separator,
} from "./style";

import { FlatList } from "react-native";
import { formatCurrency } from "../../utils/FormatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import ProductModal from "../ProductModal/ProductModal";
import { Product } from "../../Types/Type";

interface MenuProps {
    onAddToCart: (product: Product) => void;
    product: Product[];
}

export default function Menu({ onAddToCart, product }: MenuProps) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );

    function handleOpenModal(item: Product) {
        setIsModalVisible(true);
        setSelectedProduct;
        setSelectedProduct(item);
    }

    return (
        <>
            <ProductModal
                product={selectedProduct}
                visible={isModalVisible}
                onAddToCart={onAddToCart}
                onClose={() => setIsModalVisible(false)}
            />
            <FlatList
                data={product}
                style={{ marginTop: 32 }}
                contentContainerStyle={{ paddingHorizontal: 24 }}
                keyExtractor={(product) => product._id}
                ItemSeparatorComponent={Separator}
                renderItem={({ item }) => {
                    return (
                        <ProductContainer onPress={() => handleOpenModal(item)}>
                            <ProductImage
                                source={{
                                    uri: `http://10.0.0.110:5001/uploads/${item.imagePath}`,
                                }}
                            />
                            <ProductDetails>
                                <Text weight="600">{item.name}</Text>
                                <Text
                                    size={14}
                                    color="#666666"
                                    style={{ marginVertical: 8 }}
                                >
                                    {item.description}
                                </Text>
                                <Text size={14} weight="600">
                                    {formatCurrency(item.price)}
                                </Text>
                            </ProductDetails>

                            <AddToCartBtn onPress={() => onAddToCart(item)}>
                                <PlusCircle />
                            </AddToCartBtn>
                        </ProductContainer>
                    );
                }}
            />
        </>
    );
}
