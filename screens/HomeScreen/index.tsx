import { useState } from "react";
import { Input } from "@/components";
import { ITheme } from "@/configs/theme";
import { produtos } from "@/mocks/produtos";
import { useTheme } from "styled-components";
import { Modal, ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { ProdutoCard } from "@/components/ProdutoCard";
import { useProdutoContext } from "@/contexts/ProdutoContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as S from "./styles";

interface IHomeScreenProps {
  visible: boolean;
  onRequestClose: () => void;
}

export const HomeScreen = ({ visible, onRequestClose }: IHomeScreenProps) => {
  const [searchText, setSearchText] = useState<string>("");

  const { setSelectedProduto } = useProdutoContext();
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
      onRequestClose={onRequestClose}
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
          {data.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              onPress={() => setSelectedProduto(produto)}
            />
          ))}
        </S.Grid>
      </ScrollView>
    </Modal>
  );
};
