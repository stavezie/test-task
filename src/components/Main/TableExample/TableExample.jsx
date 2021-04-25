import React from 'react';
import classes from "./TableExample.module.css";

const TableExample = (props) => {

    function handleAllChecked(event) {
        props.users.map(user => {
            return user.isChecked = event.target.checked
        })
        props.setUsers([...props.users])
    }


    return (
            <div className={classes.topItem}>
                <label className={classes.label}>
                    <input type="checkbox" className={classes.input} onChange={handleAllChecked} />
                    <span className={classes.fake}>

                    </span>
                </label>
                <span className={classes.number}>№</span>
                <span className={classes.family}>ФИО</span>
                <span className={classes.age}>Возраст (лет)</span>
                <span className={classes.height}>Рост</span>
                <span className={classes.weight}>Вес</span>
                <span className={classes.salary}>Зарплата</span>
            </div>
    );
};

export default TableExample;