import React from 'react';
import classes from './DeleteBtn.module.css'

const DeleteBtn = (props) => {

    let users = props.users;
    let setUsers = props.setUsers;
    let CountIsTrue = 0;

    const deleteSelected = () => {
        let removeArr = users.filter(user => user.isChecked === false)
        setUsers(removeArr)
    }

    function isTrue() {
        users.map(user => {
            if (user.isChecked) {
                CountIsTrue += 1;
            }
        })
    }

    isTrue();



    return (
        <div className={classes.DeleteBtnWrapper}>
            <button onClick={deleteSelected} disabled={!CountIsTrue} className={classes.DeleteBtn}>Удалить выбранные</button>
        </div>
    );
};

export default DeleteBtn;