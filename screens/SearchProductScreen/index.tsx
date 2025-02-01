import { useState } from "react";
import { ITheme } from "@/configs/theme";
import { useTheme } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { Modal, ScrollView } from "react-native";
import { Input, ProductCard } from "@/components";
import { getProdutos } from "@/services/getProdutos";
import { useProductContext } from "@/contexts/ProductContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as S from "./styles";
import { useDebounce } from "@/hooks/useDebounce";

interface ISearchProductScreenProps {
  visible: boolean;
}

export const SearchProductScreen = ({ visible }: ISearchProductScreenProps) => {
  const [searchText, setSearchText] = useState<string>("");

  const { setSelectedProduct } = useProductContext();
  const { top } = useSafeAreaInsets();

  const search = useDebounce({
    value: searchText,
    debounceTime: 500,
  });

  const { data = [] } = useQuery({
    queryKey: ["produtos", search],
    queryFn: () => getProdutos({ search }),
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
