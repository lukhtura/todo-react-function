//Core
import React, { useState, useEffect } from 'react';
//Parts
import NewForm from "../Components/NewForm";
import Item from '../Components/Item';

const Wrapper = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(
            JSON.parse(localStorage.getItem('items')) || []
        )
    }, []);

    const addItem = ({ id, description }) => {
        const newItems = [...items, { id, description }];
        setItems(newItems);
        localStorage.setItem('items', JSON.stringify(newItems));
    };

    const saveItem = ({id}, description) => {
        const updatedItems = items.map(function (item) {
            if (item.id === id) {
                item.description = description;
            }
            return item;
        });

        setItems(updatedItems);
        localStorage.setItem('items', JSON.stringify(updatedItems));
    };

    const updateItem = ({ id, checked }) => {
        const updateItems = items.map(item => {
            if (item.id === id) {
                item.checked = checked;
            }
            return item;
        });
        setItems(updateItems);
        localStorage.setItem('items', JSON.stringify(updateItems));
    };

    const deleteItem = (id) => {
        const updateItems = items.filter(item => item.id !== id);
        localStorage.setItem('items', JSON.stringify(updateItems));
        setItems(updateItems);
    }

    return (
        <div className="container">
            <h1>TODO</h1>
            <NewForm onAdd={addItem} />
            <br />
            <h2>TODOS</h2>
            <br />
            <hr />
            <div className="todo-wrapper">
                {items.map(item =>
                    <Item
                        key={item.id}
                        id={item.id}
                        description={item.description}
                        checked={item.checked}
                        onDelete={deleteItem}
                        onUpdate={updateItem} 
                        onSave={saveItem}/>)}
            </div>
        </div>
    )
}

export default Wrapper;