import { IProduct } from "@/interfaces/Product";
import { ViroFlexView, ViroImage, ViroText } from "@reactvision/react-viro";

interface IProductArCardProps {
  product: IProduct;
}

export const ProductArCard = ({ product }: IProductArCardProps) => {
  return (
    <ViroFlexView
      position={[product.coordX, product.coordZ, product.coordY]}
      height={0.35}
      width={0.25}
      transformBehaviors={"billboard"}
      style={{
        backgroundColor: "white",
        borderRadius: 0.2,
        padding: 0.02,
        gap: 0.1,
      }}
    >
      <ViroImage source={{ uri: product.imagem }} style={{ flex: 1 }} />

      <ViroFlexView
        height={0.1}
        style={{
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <ViroText
          text={product.nome}
          textClipMode="None"
          textLineBreakMode="None"
          scale={[0.1, 0.1, 0.1]}
          style={{
            fontFamily: "bold",
            fontWeight: "bold",
            fontSize: 25,
            color: "black",
          }}
        />
        <ViroText
          text={`€ ${product.preco}`}
          textClipMode="None"
          textLineBreakMode="None"
          scale={[0.1, 0.1, 0.1]}
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#808080",
          }}
        />
      </ViroFlexView>
    </ViroFlexView>
  );
};
