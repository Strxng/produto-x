import { useState } from "react";
import { Input } from "@/components";
import { ITheme } from "@/configs/theme";
import { ScrollView } from "react-native";
import { produtos } from "@/mocks/produtos";
import { useTheme } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { ProdutoCard } from "@/components/ProdutoCard";
import { SafeAreaView } from "react-native-safe-area-context";

import * as S from "./styles";

export const HomeScreen = () => {
  const [searchText, setSearchText] = useState<string>("");

  const { data = [] } = useQuery({
    queryKey: ["produtos"],
    queryFn: () => produtos,
  });

  const theme = useTheme() as ITheme;

  return (
    <SafeAreaView>
      <ScrollView
        style={{ height: "100%", width: "100%" }}
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
              onPress={() => {}}
            />
          ))}
        </S.Grid>
      </ScrollView>
    </SafeAreaView>
  );
};
