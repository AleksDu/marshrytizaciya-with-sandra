import { useMemo, useState, useCallback } from "react";
import { ProductList } from "../../Components/Products/ProductList";
import { Modal } from "../../Components/Modal/Modal";
import { Form } from "../../Components/Forms/Form";
import { useToggle } from "../../Hooks/useToggle";
import { useLS } from "../../Hooks/useLS";

export default function ProductsPage() {
  const [filter, setFilter] = useState("");

  const [allProducts, setAllProducts] = useLS("products", []);
  const filteredProducts = useMemo(() => {
    let normFilter = filter.toLowerCase();
    return allProducts.filter((prod) =>
      prod.title.toLowerCase().includes(normFilter)
    );
  }, [filter, allProducts]);
  const [showModal, setShowModal] = useToggle(false);

  const addNewProduct = (obj) => setAllProducts((zuzuzu) => [...zuzuzu, obj]);
  const deleteProduct = (id) =>
    setAllProducts((zuzuzu) => zuzuzu.filter((prod) => prod.id !== id));

  const handleChangeFilter = useCallback((e) => setFilter(e.target.value), []);
  return (
    <>
      <h1>Products</h1>
      {showModal && (
        <Modal toggleModal={setShowModal}>
          <Form addNewProduct={addNewProduct} />
        </Modal>
      )}
      <h1>FE-35 Product</h1>
      {/* <SolidTitle titleText="FE-35 Product" /> */}
      <button type="button" onClick={setShowModal}>
        Add Product
      </button>
      {/* === FILTER СПИСКА ПРОДУКТОВ === */}
      <br />
      <label htmlFor="filter">Filter</label>
      <br />
      <input
        type="text"
        id="filter"
        value={filter}
        onChange={handleChangeFilter}
      />
      <br />
      {/* === РЕНДЕР КОМПОНЕНТА СПИСКА ПРОДУКТОВ === */}
      <ProductList
        products={filteredProducts}
        onDeleteProduct={deleteProduct}
      />
    </>
  );
}
