import { FlatList } from "react-native";

import { Text } from "../../utils/Text";
import { CategoryContainer, Icon } from "./style";
import { useState } from "react";
import { Category } from "../../Types/Type";

interface CategoryProps {
    categories: Category[];
    onSelectCategory: (categoryId: string) => Promise<void>;
}

export default function Categories({
    categories,
    onSelectCategory,
}: CategoryProps) {
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleSelectCategory = (categoryId: string) => {
        const category = selectedCategory === categoryId ? "" : categoryId;
        onSelectCategory(category);
        setSelectedCategory(category);
    };

    return (
        <>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 24 }}
                data={categories}
                keyExtractor={(category) => category._id}
                renderItem={({ item: category }) => {
                    const isSelected = selectedCategory === category._id;
                    return (
                        <CategoryContainer
                            onPress={() => handleSelectCategory(category._id)}
                        >
                            <Icon>
                                <Text opacity={isSelected ? 1 : 0.5}>
                                    {category.icon}
                                </Text>
                            </Icon>
                            <Text
                                size={14}
                                weight="600"
                                opacity={isSelected ? 1 : 0.5}
                            >
                                {category.name}
                            </Text>
                        </CategoryContainer>
                    );
                }}
            />
        </>
    );
}
