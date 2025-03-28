import { Image as RNImage } from "react-native";
import React, { useCallback, useRef } from "react";
import { useEffect, useMemo, useState } from "react";
import { useModalState } from "@/hooks/useModalState";
import { predictImage } from "@/services/predictImage";
import { Alert, Dimensions, Platform } from "react-native";
import { SearchProductScreen } from "../SearchProductScreen";
import { useProductContext } from "@/contexts/ProductContext";
import { useFullLoadingContext } from "@/contexts/FullLoadingContext";
import { Canvas, Image, Rect, Skia } from "@shopify/react-native-skia";
import { useUserPositionContext } from "@/contexts/UserPositionContext";
import {
  Button,
  FullContainer,
  IconButton,
  ProductArCard,
  Text,
} from "@/components";

import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroTrackingStateConstants,
  ViroAmbientLight,
} from "@reactvision/react-viro";

import * as S from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { calculateDistance3D } from "@/utils/calculateDistance3D";
import { StepOneView } from "./StepOneView";
import { StepTwoView } from "./StepTwoView";

interface ARProductSceneProps {
  onReady: () => void;
}

const screen = Dimensions.get("screen");

const ARProductScene = React.memo(({ onReady }: ARProductSceneProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const { selectedProduct } = useProductContext();
  const { setUserPosition } = useUserPositionContext();
  const { userPosition } = useUserPositionContext();

  const sceneRef = useRef<ViroARScene | null>(null);

  const distance = useMemo(() => {
    return calculateDistance3D(userPosition, {
      x: selectedProduct?.coordX ?? 0,
      y: selectedProduct?.coordY ?? 0,
      z: selectedProduct?.coordZ ?? 0,
    });
  }, [userPosition]);

  const onInitialized = (state: number) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setReady(true);
      onReady();
    }
  };

  return (
    <ViroARScene
      ref={sceneRef}
      onTrackingUpdated={onInitialized}
      onCameraTransformUpdate={(camera) => {
        setUserPosition({
          x: camera.position[0],
          y: camera.position[1],
          z: camera.position[2],
        });
      }}
    >
      <ViroAmbientLight color="#FFFFFF" intensity={250} />

      {ready && selectedProduct && <ProductArCard product={selectedProduct!} />}
    </ViroARScene>
  );
});

export const AugmentedRealityScreen = () => {
  const [screenshot, setScreenshot] = useState<string>("");
  const [canvasImage, setCanvasImage] = useState<any>(null);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [lines, setLines] = useState<any[]>([]);

  const { top } = useSafeAreaInsets();
  const { stopLoading, isLoading, startLoading } = useFullLoadingContext();
  const { selectedProduct, setSelectedProduct } = useProductContext();
  const searchProductModal = useModalState();

  const { userPosition } = useUserPositionContext();

  const ref = useRef<ViroARSceneNavigator>(null);

  const distance = useMemo(() => {
    return calculateDistance3D(userPosition, {
      x: selectedProduct?.coordX ?? 0,
      y: selectedProduct?.coordY ?? 0,
      z: selectedProduct?.coordZ ?? 0,
    });
  }, [userPosition]);

  const onReady = useCallback(() => {
    stopLoading();
  }, [stopLoading]);

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
      setScreenshot("");
      setLines([]);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  const squareSizes = useMemo(() => {
    if (!selectedProduct || !lines.length) return null;

    const reversedLines = lines.reverse();

    const arr = reversedLines.slice(
      selectedProduct.prateleira - 1,
      selectedProduct.prateleira + 1
    );

    // caso identifique menos linhas que o número da prateleira
    if (!arr.length) {
      Alert.alert(
        "Erro",
        "Não foi possível identificar a prateleira do produto"
      );
      return null;
    }

    // caso seja o ultimo andar
    if (arr.length < 2) {
      const [line1] = arr;

      const x = line1[0];
      const y = line1[1];
      const width = line1[2] - line1[0];
      const height = Math.abs(screen.height - line1[1]);

      return { x, y, width, height };
    }

    const [line1, line2] = arr;

    const x = line1[0];
    const y = Math.min(line1[1], line2[1]);
    const width = line1[2] - line1[0];
    const height = Math.abs(line2[1] - line1[1]);

    return { x, y, width, height };
  }, [lines, selectedProduct]);

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
          scene: () => <ARProductScene onReady={onReady} />,
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

            {Boolean(squareSizes) && (
              <Rect
                x={squareSizes!.x / screen.scale}
                y={squareSizes!.y / screen.scale}
                width={squareSizes!.width / screen.scale}
                height={squareSizes!.height / screen.scale}
                color="rgba(0, 255, 0, 0.4)"
              />
            )}
          </Canvas>

          <S.ButtonsContainer>
            <Button
              text={"Encontrei"}
              color={"confirm"}
              onPress={() => {
                setScreenshot("");
                setLines([]);
              }}
            />
          </S.ButtonsContainer>
        </>
      )}

      {Boolean(selectedProduct && distance > 3) && <StepOneView />}

      {Boolean(selectedProduct && distance <= 3) && (
        <StepTwoView onReady={handlePredictImage} />
      )}

      <SearchProductScreen visible={searchProductModal.visible} />
    </FullContainer>
  );
};
