import { Dimensions, Platform } from "react-native";
import { Image as RNImage } from "react-native";
import { useEffect, useState } from "react";
import React, { useCallback, useRef } from "react";
import { Button, FullContainer } from "@/components";
import { useModalState } from "@/hooks/useModalState";
import { predictImage } from "@/services/predictImage";
import { SearchProductScreen } from "../SearchProductScreen";
import { useProductContext } from "@/contexts/ProductContext";
import { useFullLoadingContext } from "@/contexts/FullLoadingContext";
import { Canvas, Image, Line, Skia } from "@shopify/react-native-skia";

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

const screen = Dimensions.get("screen");

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
  const [screenshot, setScreenshot] = useState<string>("");
  const [canvasImage, setCanvasImage] = useState<any>(null);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [lines, setLines] = useState<any[]>([]);

  const { stopLoading, isLoading, startLoading } = useFullLoadingContext();
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const searchProductModal = useModalState();

  const ref = useRef<ViroARSceneNavigator>(null);

  const onReadyCallback = () => stopLoading();

  const handlePredictImage = useCallback(async () => {
    try {
      startLoading("Analizando imagem");

      const { success, url } = await ref.current?._takeScreenshot(
        "teste_viro_react",
        false
      );

      if (!success) return;

      const imageUri = Platform.OS === "ios" ? `file://${url}` : url;

      setScreenshot(imageUri);

      RNImage.getSize(imageUri, (w, h) => {
        setHeight(h);
        setWidth(w);
      });

      const res = await predictImage(imageUri);
      const imageData = await Skia.Data.fromURI(imageUri);
      const cvImage = Skia.Image.MakeImageFromEncoded(imageData);

      setCanvasImage(cvImage);
      setLines(res.lines);
    } catch (error) {
      console.log(error);
      setScreenshot("");
      setLines([]);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

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
        ref={ref}
        initialScene={{
          scene: () => ARProductScene({ onReady: onReadyCallback }),
        }}
        style={{ flex: 1 }}
      />

      {Boolean(screenshot) && Boolean(!lines.length) && (
        <S.Screenshot
          source={{ uri: screenshot }}
          contentFit="fill"
          cachePolicy="none"
        />
      )}

      {Boolean(canvasImage) && Boolean(lines.length) && (
        <>
          <Canvas
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
            }}
          >
            <Image
              image={canvasImage}
              x={0}
              y={0}
              width={width / screen.scale}
              height={height / screen.scale}
              fit={"contain"}
            />

            {lines.map((line, index) => {
              const y1 = line[0] / screen.scale;
              const x1 = line[1] / screen.scale;

              const y2 = line[2] / screen.scale;
              const x2 = line[3] / screen.scale;

              return (
                <Line
                  key={index}
                  p1={{
                    x: x1,
                    y: y1,
                  }}
                  p2={{
                    x: x2,
                    y: y2,
                  }}
                  color="red"
                  strokeWidth={3}
                />
              );
            })}
          </Canvas>

          <S.ButtonsContainer>
            <Button
              text={"OK"}
              color={"confirm"}
              onPress={() => {
                setScreenshot("");
                setLines([]);
              }}
            />
          </S.ButtonsContainer>
        </>
      )}

      {Boolean(selectedProduct) && Boolean(!screenshot) && (
        <S.ButtonsContainer>
          <Button
            text={"Cancelar Busca"}
            color={"cancel"}
            onPress={() => {
              setSelectedProduct(null);
            }}
          />

          <Button
            text={"Pronto"}
            color={"confirm"}
            onPress={handlePredictImage}
          />
        </S.ButtonsContainer>
      )}

      <SearchProductScreen visible={searchProductModal.visible} />
    </FullContainer>
  );
};
