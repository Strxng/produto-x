import { IProduct } from "@/interfaces/Product";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface IProductProviderProps {
  children?: JSX.Element | JSX.Element[];
}

interface IProductContextData {
  selectedProduct: IProduct | null;
  setSelectedProduct: Dispatch<SetStateAction<IProduct | null>>;
}

const ProductContext = createContext<IProductContextData>(
  {} as IProductContextData
);

export function ProductProvider({
  children,
}: IProductProviderProps): JSX.Element {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const contextValue: IProductContextData = useMemo(
    () => ({
      selectedProduct,
      setSelectedProduct,
    }),
    [selectedProduct, setSelectedProduct]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProductContext = (): IProductContextData =>
  useContext(ProductContext);
