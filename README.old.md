react-35-module-2
class extends Component render()
import { Component } from 'react'

state = {}
this.state - Object

this.setState({})

this.setState((prevState)=>{ return {prop: prevState.prop + 1} }) || this.setState((prevState)=>({prop: prevState.prop + 1}))

state = {prop: this.props.value}
static defaultProps = {prop: 0}

lesson 2
поднятие состояния -
передача методов ребенку через props,
при вызове этих ментодов в ребенке,
состояние будет изменяться в родителе
Где использовать? Например при сабмите формы, чтобы передать родителю готовый объект с данными

Структура компонента формы:

стейт с полями для значений из инпутов
метод обработки ввода данных в инпуты с записью значений в стейт
для чекбокса лучше сделать отдельный метод или прописать условие с проверкой типа на checkbox
handleCheck = ({ target }) => {
const { name, value, type, checked } = target;
// Если тип элемента checkbox, берем значение checked,
// в противном случае value
this.setState({ [name]: type === 'checkbox' ? checked : value });
};
методы обработки сабмита формы, где вызываем метод родителя, полученный через this.props
метод очистки формы через стейт, потому что поля инпутов (value) связаны с их полями в стейте
рендер JSX-разметки с формой и инпутами: 5.1 label через htmlFor привязываем к input по id. Идентификатор лучше генерировать перед рендером разметки в публичном свойстве и по ссылке присваивать в атрибуты 5.2 input должен иметь:
name со значением, по которому будем хранить его в стейте и обращаться к нему из формы
const { name, value } = target;
this.setState({ [name]: value });
value, сообщающийся с соответствующим полем в стейте
onChange - проп события, в него передаем метод - обработчик события 5.3 для input:radio также нужно:
checked={поле из стейта для чекбокса} 5.4 чтобы деактивировать кнопку по нечекнутому инпуту
disabled={!поле из стейта для чекбокса}

react-35-module-3
ProductList.js
создаем компонент ProductList ({produsts, onDeleteProduct}) принимаем массив и в переборе создаем элементы продуктов
импортируем компонент RemoveItem и используем в качестве кнопки, которая принимает проп onDeleteProduct и id продукта, и передает их ребенку GadgetWindow для кнопки виджета Delete;
App.js
создаем публичный метод удаления продукта;
deleteProduct = id =>
this.setState(prev => ({
allProducts: prev.allProducts.filter(prod => prod.id !== id),
}));
импортируем и рендерим компонент ProductList, передаем ему список продуктов и метод удаления продукта через пропсы;
RemoveItem.js
в компоненте DeleteButton создаем публичный метод handleDelete, в котором вызываем полученный через пропс onDelete и передаем ему полученный id продукта;
в рендер GadgetWindow деструктуризируем и передаем метод handleDelete;
WindowElem.js
в компоненте GadgetWindow получаем handleDelete через пропс и отдаем в onClick для deleteBtn
Modal.js
создаем классовый компонент модального окна:
в index.html добавим портал для модалки
<div id="modal-root"></div>
в App.js добавляем свойство стейта для контроля модального окна - showModal и публичный метод открытия/закрытия модального окна
toggleModal = () => {
this.setState(({ showModal }) => ({
showModal: !showModal,
}));
};
рендерим модальное окно

импортируем import { createPortal } from 'react-dom'
создаем компонент модального окна с рендером разметки:
return createPortal(
<div className={s.backDrop} onClick={handleClose}>
<div className={s.content}>{children}</div>
</div>,
document.getElementById('modal-root'),
)
прописываем метод закрытия по Escape - handleEscape;
в CDM вешаем слушателя на window по keydown;
в CWU снимаем слушателя на window по keydown;
прописываем метод handleClose для onClick в div className="backdrop"
import { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.module.scss';

export class Modal extends Component {
componentDidMount() {
window.addEventListener('keydown', this.handleEscape);
}

componentWillUnmount() {
window.removeEventListener('keydown', this.handleEscape);
}

handleEscape = e => {
if (e.code === 'Escape') {
this.props.onClose();
}
};

handleClose = e => {
if (e.currentTarget === e.target) {
this.props.onClose();
}
};

render() {
return createPortal(
<div className="backdrop" onClick={this.handleClose}>
<div className="content">{this.props.children}</div>
</div>,
document.querySelector('#modal-root'),
);
}
}
