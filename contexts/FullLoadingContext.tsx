import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface IFullLoadingProviderProps {
  children?: JSX.Element | JSX.Element[];
}

interface IFullLoadingContextData {
  isLoading: boolean;
  message: string;
  startLoading: (message: string) => void;
  stopLoading: () => void;
}

const FullLoadingContext = createContext<IFullLoadingContextData>(
  {} as IFullLoadingContextData
);

export function FullLoadingProvider({
  children,
}: IFullLoadingProviderProps): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const startLoading = useCallback((message: string) => {
    setIsLoading(true);
    setMessage(message);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setMessage("");
  }, []);

  const contextValue: IFullLoadingContextData = useMemo(
    () => ({
      isLoading,
      message,
      startLoading,
      stopLoading,
    }),
    [startLoading, stopLoading, isLoading, message]
  );

  return (
    <FullLoadingContext.Provider value={contextValue}>
      {children}
    </FullLoadingContext.Provider>
  );
}

export const useFullLoadingContext = (): IFullLoadingContextData =>
  useContext(FullLoadingContext);
