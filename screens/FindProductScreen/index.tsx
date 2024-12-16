import { StepOne } from "./StepOne";
import { HomeScreen } from "../HomeScreen";
import { useModalState } from "@/hooks/useModalState";
import { useCallback, useEffect, useState } from "react";
import { useProdutoContext } from "@/contexts/ProdutoContext";

import * as S from "./styles";

export const FindProductScreen = () => {
  const [step, setStep] = useState<number>(1);

  const { selectedProduto } = useProdutoContext();
  const homeModal = useModalState();

  const renderStep = useCallback(() => {
    switch (step) {
      case 1:
        return <StepOne />;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    if (!selectedProduto) {
      homeModal.open();
    } else {
      homeModal.close();
    }
  }, [selectedProduto]);

  return (
    <S.FullContainer>
      <S.Camera>{renderStep()}</S.Camera>

      <HomeScreen
        visible={homeModal.visible}
        onRequestClose={homeModal.close}
      />
    </S.FullContainer>
  );
};
