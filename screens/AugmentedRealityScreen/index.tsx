import React from "react";
import { useEffect, useState } from "react";
import { Button, FullContainer } from "@/components";
import { useModalState } from "@/hooks/useModalState";
import { SearchProductScreen } from "../SearchProductScreen";
import { useProductContext } from "@/contexts/ProductContext";
import { useFullLoadingContext } from "@/contexts/FullLoadingContext";

import {
  ViroText,
  ViroARScene,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroAmbientLight,
  ViroBox,
  ViroMaterials,
} from "@reactvision/react-viro";

import * as S from "./styles";

ViroMaterials.createMaterials({
  box: {
    diffuseColor: "red",
  },
});

interface ARProductSceneProps {
  onReady: () => void;
}

const ARProductScene = ({ onReady }: ARProductSceneProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const { selectedProduct } = useProductContext();

  const onInitialized = (state: number) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setReady(true);
      onReady();
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroAmbientLight color="#FFFFFF" intensity={250} />

      {ready && selectedProduct && (
        <>
          <ViroText
            text={selectedProduct.nome}
            scale={[0.5, 0.5, 0.5]}
            position={[
              selectedProduct.coordX,
              selectedProduct.coordZ + 0.1,
              selectedProduct.coordY,
            ]}
            style={{ color: "red", textAlign: "center" }}
          />
          <ViroBox
            position={[
              selectedProduct.coordX,
              selectedProduct.coordZ,
              selectedProduct.coordY,
            ]}
            height={0.2}
            width={0.2}
            length={0.2}
            scale={[0.5, 0.5, 0.5]}
            materials={["box"]}
          />
        </>
      )}
    </ViroARScene>
  );
};

export const AugmentedRealityScreen = () => {
  const { stopLoading, isLoading } = useFullLoadingContext();
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const searchProductModal = useModalState();

  const onReadyCallback = () => stopLoading();

  useEffect(() => {
    if (!selectedProduct && !isLoading) {
      searchProductModal.open();
    } else if (selectedProduct) {
      searchProductModal.close();
    }
  }, [selectedProduct, isLoading]);

  return (
    <FullContainer>
      <ViroARSceneNavigator
        initialScene={{
          scene: () => ARProductScene({ onReady: onReadyCallback }),
        }}
        style={{ flex: 1 }}
      />

      <S.ButtonsContainer>
        <Button
          text={"Cancelar Busca"}
          color={"cancel"}
          onPress={() => {
            setSelectedProduct(null);
          }}
        />
      </S.ButtonsContainer>

      <SearchProductScreen visible={searchProductModal.visible} />
    </FullContainer>
  );
};
