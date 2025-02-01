import { db } from "@/configs/firebase";
import { IProduct } from "@/interfaces/Product";
import { collection, getDocs, query, where } from "firebase/firestore";

interface IGetProdutosParams {
  search?: string;
}

export const getProdutos = async ({ search }: IGetProdutosParams) => {
  let q = query(collection(db, "produtos"));

  if (search) {
    const normalizedSearch = search
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");

    q = query(
      collection(db, "produtos"),
      where("nomeNormalizado", ">=", normalizedSearch),
      where("nomeNormalizado", "<=", normalizedSearch + "\uf8ff")
    );
  }

  const { docs } = await getDocs(q);

  const produtos = docs.map(
    (doc): IProduct => ({
      id: doc.id,
      nome: doc.data().nome,
      imagem: doc.data().imagem,
      prateleira: doc.data().prateleira,
      preco: doc.data().preco,
      unidadeMedida: doc.data().unidadeMedida,
      coordX: doc.data().coordX,
      coordY: doc.data().coordY,
      coordZ: doc.data().coordZ,
    })
  );

  return produtos;
};
