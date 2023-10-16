import Header from "../components/Header/Header";
import Button from "../../src/components/Button/Button";
import Categories from "../components/Categories/Categories";

import {
    Container,
    CategoriesContainer,
    MenuContainer,
    Footer,
    FooterContainer,
    CenteredContainer,
} from "./styles";
import Menu from "../components/Menu/Menu";
import TableModal from "../components/TableModal/TableModal";
import { useState } from "react";
import { CartItem, Product } from "../Types/Type";

import { ActivityIndicator } from "react-native";
import Cart from "../components/Cart/Cart";
import { products as ProductMock } from "../mocks/products";
import { Empty } from "../components/Icons/Empty";
import { Text } from "../utils/Text";

export default function Main() {
    const [isLoading] = useState(false);
    const [tableSelected, setTableSelected] = useState("");
    const [isTableModaLVisible, setisTableModaLVisible] = useState(false);
    const [cartItens, setcartItens] = useState<CartItem[]>([
        { quantity: 1, product: ProductMock[0] },
        { quantity: 2, product: ProductMock[1] },
    ]);
    const [product] = useState([]);

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
                            <Categories />
                        </CategoriesContainer>

                        {product.length > 0 ? (
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
