import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import Header from "../components/Header/Header";
import Button from "../../src/components/Button/Button";
import Categories from "../components/Categories/Categories";
import Menu from "../components/Menu/Menu";
import TableModal from "../components/TableModal/TableModal";
import Cart from "../components/Cart/Cart";

import {
    Container,
    CategoriesContainer,
    MenuContainer,
    Footer,
    FooterContainer,
    CenteredContainer,
} from "./styles";

import { CartItem, Category, Product } from "../Types/Type";
import { Empty } from "../components/Icons/Empty";
import { Text } from "../utils/Text";

import { api } from "../utils/api";

export default function Main() {
    const [isLoading, setIsloading] = useState(true);
    const [tableSelected, setTableSelected] = useState("");
    const [isTableModaLVisible, setisTableModaLVisible] = useState(false);
    const [cartItens, setcartItens] = useState<CartItem[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [product, setProduct] = useState<Product[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    useEffect(() => {
        Promise.all([api.get("/categories"), api.get("/products")]).then(
            ([categoriesResponse, productResponse]) => {
                setCategories(categoriesResponse.data);
                setProduct(productResponse.data);
                setIsloading(false);
            }
        );
    }, []);

    async function handleSelectCategory(categoryId: string) {
        const route = !categoryId
            ? "/products"
            : `/categories/${categoryId}/products`;
        setIsLoadingProducts(true);

        const { data } = await api.get(route);
        setProduct(data);
        setIsLoadingProducts(false);
    }

    function handleResetOrder() {
        setTableSelected("");
        setcartItens([]);
    }

    function handleSaveTable(table: string) {
        setTableSelected(table);
    }

    function handleAddToCart(product: Product) {
        if (!tableSelected) {
            setisTableModaLVisible(true);
        }
        setcartItens((prevState) => {
            const itemIndex = prevState.findIndex(
                (cartItem) => cartItem.product._id === product._id
            );

            if (itemIndex < 0) {
                return prevState.concat({
                    quantity: 1,
                    product,
                });
            }

            const newCartItens = [...prevState];
            const item = newCartItens[itemIndex];

            newCartItens[itemIndex] = {
                ...item,
                quantity: newCartItens[itemIndex].quantity + 1,
            };

            return newCartItens;
        });
    }

    function handleDrecementCartItem(product: Product) {
        setcartItens((prevState) => {
            const itemIndex = prevState.findIndex(
                (cartItem) => cartItem.product._id === product._id
            );

            const item = prevState[itemIndex];
            const newCartItens = [...prevState];

            if (item.quantity === 1) {
                newCartItens.splice(itemIndex, 1);

                return newCartItens;
            }

            newCartItens[itemIndex] = {
                ...item,
                quantity: newCartItens[itemIndex].quantity - 1,
            };

            return newCartItens;
        });
    }

    return (
        <>
            <Container>
                <Header
                    selectedTable={tableSelected}
                    onCancelOrder={handleResetOrder}
                />

                {isLoading && (
                    <CenteredContainer>
                        <ActivityIndicator color="#D73035" size="large" />
                    </CenteredContainer>
                )}

                {!isLoading && (
                    <>
                        <CategoriesContainer>
                            <Categories
                                categories={categories}
                                onSelectCategory={handleSelectCategory}
                            />
                        </CategoriesContainer>

                        {isLoadingProducts ? (
                            <CenteredContainer>
                                <ActivityIndicator
                                    color="#D73035"
                                    size="large"
                                />
                            </CenteredContainer>
                        ) : product.length > 0 ? (
                            <MenuContainer>
                                <Menu
                                    onAddToCart={handleAddToCart}
                                    product={product}
                                />
                            </MenuContainer>
                        ) : (
                            <CenteredContainer>
                                <Empty />
                                <Text color="#666" style={{ marginTop: 24 }}>
                                    Nenhum produto foi encontrado
                                </Text>
                            </CenteredContainer>
                        )}
                    </>
                )}
            </Container>

            <Footer>
                <FooterContainer>
                    {!tableSelected && (
                        <Button
                            // eslint-disable-next-line react/no-children-prop
                            children="Novo pedido"
                            onPress={() => setisTableModaLVisible(true)}
                            disabled={isLoading}
                        />
                    )}

                    {tableSelected && (
                        <Cart
                            cartItems={cartItens}
                            onAdd={handleAddToCart}
                            onDecrement={handleDrecementCartItem}
                            onConfirmOrder={handleResetOrder}
                            tableSelected={tableSelected}
                        />
                    )}
                </FooterContainer>
            </Footer>

            <TableModal
                onSave={handleSaveTable}
                visible={isTableModaLVisible}
                onClose={() => setisTableModaLVisible(false)}
            />
        </>
    );
}
