// импортируем компонент окна с подтверждением удаления DeleteButton
import { DeleteButton } from "../Widgets/RemoveItem";
import s from "./Products.module.css";
import { SolidTitle } from "../Titles/SolidTitle";
// создаем компонент списка продуктов
export function ProductList({ products, onDeleteProduct }) {
  return (
    <>
      <SolidTitle titleText="Product List" />
      {/* <h2>Product List</h2> */}
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id} className={s.productItem}>
              <h3 className={s.productTitle}>{product.title}</h3>
              <p className={s.productDesc}>{product.description}</p>
              <DeleteButton onDelete={onDeleteProduct} id={product.id} />
              {/* рендерим  компонент окна с подтверждением удаления DeleteButton */}
              {/* передаем через пропс метод удаления продукта и его id */}
            </li>
          );
        })}
      </ul>
    </>
  );
}
