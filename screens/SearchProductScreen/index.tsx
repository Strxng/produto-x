import { useState } from "react";
import { Input, ProductCard } from "@/components";
import { ITheme } from "@/configs/theme";
import { produtos } from "@/mocks/produtos";
import { useTheme } from "styled-components";
import { Modal, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useProductContext } from "@/contexts/ProductContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as S from "./styles";

interface ISearchProductScreenProps {
  visible: boolean;
}

export const SearchProductScreen = ({ visible }: ISearchProductScreenProps) => {
  const [searchText, setSearchText] = useState<string>("");

  const { setSelectedProduct } = useProductContext();
  const { top } = useSafeAreaInsets();

  const { data = [] } = useQuery({
    queryKey: ["produtos"],
    queryFn: () => produtos,
  });

  const theme = useTheme() as ITheme;

  return (
    <Modal
      visible={visible}
      presentationStyle="fullScreen"
      style={{ backgroundColor: theme.colors.background }}
    >
      <ScrollView
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: theme.colors.background,
          paddingTop: top,
        }}
        contentContainerStyle={{
          padding: theme.spacing.paddings.large,
          gap: theme.spacing.gaps.large,
        }}
      >
        <Input
          icon="search"
          placeholder="Nome do produto"
          value={searchText}
          onChangeText={setSearchText}
        />

        <S.Grid>
          {data.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => setSelectedProduct(product)}
            />
          ))}
        </S.Grid>
      </ScrollView>
    </Modal>
  );
};
