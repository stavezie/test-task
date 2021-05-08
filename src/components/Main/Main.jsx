import React from 'react';
import TableItem from "./TableItem/TableItem";
import DeleteBtn from "./DeleteBtn/DeleteBtn";
import TableHead from "./TableExample/TableHead";

const Main = (props) => {

    const users = props.users;
    const setUsers = props.setUsers;

    return (
        <div>
            <TableHead
                setChecked={props.setChecked}
                users={users}
                setUsers={setUsers}
            />
            <TableItem
            users={props.users}
            setUsers={props.setUsers}
            currency={props.currency}
            setCurrency={props.setCurrency}
            />
            <DeleteBtn
                users={users}
                setUsers={setUsers}
            />
        </div>
    );
};

export default Main;