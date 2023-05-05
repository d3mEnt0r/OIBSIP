import { useState } from "react";

import './list.css';

const TodoList = () => {

    const [inputValue, setInputValue] = useState("");
    const [itemList, setItemList] = useState([]);
    const [itemDates, setItemDates] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);

    function handleChange(e) {
        setInputValue(e.target.value);
    }

    const handleAddItem = () => {
        if (inputValue.trim() !== "") {
            setItemList([...itemList, inputValue]);
            setItemDates([...itemDates, new Date()]);
            setInputValue(""); // clear the input field
        }
    };

    const handleCheck = (index) => {
        const newItemList = [...itemList];
        const checkedItem = newItemList.splice(index, 1)[0];
        setItemList(newItemList);
        setCheckedItems([...checkedItems, checkedItem]);
        const checkboxes = document.querySelectorAll('.list input[type="checkbox"]');
        checkboxes.forEach((checkbox) => (checkbox.checked = false));
    };

    const handleDeleteCheckedItems = () => {
        const newItemList = itemList.filter((item) => !checkedItems.includes(item));
        setItemList(newItemList);
        setCheckedItems([]);
    };

    return (
        <div>
            <h1 className="heading">To~Do List</h1>
            <div className="add-input">
                <input type="text" onChange={handleChange} value={inputValue} placeholder="Add Item" autoFocus />
                <button className="add-btn" onClick={handleAddItem}>+</button>
            </div>

            <div className="list">
                {itemList.map((item, index) => {
                    const now = itemDates[index];
                    const date = now.toLocaleDateString();
                    const time = now.toLocaleTimeString();

                    return (
                        <div className="item" key={index}>
                            <input type="checkbox" onChange={() => handleCheck(index)} />
                            <p className="item-detail">{item}</p>
                            <p className="date-time">{`${date} -  ${time}`}</p>
                        </div>
                    )
                })}
            </div>

            {checkedItems.length > 0 && (
                <div className="completed-tasks">
                    <h2>Completed Tasks: <button className="delete-btn" onClick={handleDeleteCheckedItems}>Delete</button></h2>
                    
                    <ul>
                        {checkedItems.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    
                </div>
            )}
        </div>
    )
}

export default TodoList;
