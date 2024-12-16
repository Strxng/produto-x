import { IProduto } from "@/interfaces/Produto";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

interface IProdutoProviderProps {
  children?: JSX.Element | JSX.Element[];
}

interface IProdutoContextData {
  selectedProduto: IProduto | null;
  setSelectedProduto: Dispatch<SetStateAction<IProduto | null>>;
}

const ProdutoContext = createContext<IProdutoContextData>(
  {} as IProdutoContextData
);

export function ProdutoProvider({
  children,
}: IProdutoProviderProps): JSX.Element {
  const [selectedProduto, setSelectedProduto] = useState<IProduto | null>(null);

  const contextValue: IProdutoContextData = useMemo(
    () => ({
      selectedProduto,
      setSelectedProduto,
    }),
    [selectedProduto, setSelectedProduto]
  );

  return (
    <ProdutoContext.Provider value={contextValue}>
      {children}
    </ProdutoContext.Provider>
  );
}

export const useProdutoContext = (): IProdutoContextData =>
  useContext(ProdutoContext);
