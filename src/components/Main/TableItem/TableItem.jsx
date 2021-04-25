import React from 'react';
import axios from "axios";
import classes from '../TableItem/TableItem.module.css'
import '../TableItem/TableItem.css'
import { ImBin, ImPencil } from 'react-icons/im'
import TableExample from "../TableExample/TableExample";
import DeleteBtn from "../DeleteBtn/DeleteBtn";

const TableItem = (props) => {

    const users = props.users;
    const setUsers = props.setUsers;
    const currency = props.currency;
    const setCurrency = props.setCurrency;
    window.currency = currency;

    const getUsersData = () => {
        axios.get('https://api.npoint.io/324f4ca2cdd639760638').then(resolve => {
            setUsers(resolve.data)
        })
    }

    const getCurrencyData = () => {
        axios.get('https://api.ratesapi.io/api/latest').then(resolve => {
            setCurrency(resolve.data.rates.USD)
        })
    }



    React.useEffect(() => {
        getUsersData();
        getCurrencyData();
    }, [])


    function timeConverter(UNIX_timestamp) {
        let personDate = new Date(UNIX_timestamp * 1000);
        let personYear = personDate.getFullYear();
        let today = new Date();
        let todayYear = today.getFullYear();
        return todayYear - personYear;
    }

    function FeetConverter(userHeight) {
        let split = userHeight.split("'")
        let feet = split[0];
        let inches = split[1].replace(/['"]+/g, '');
        let totalCentimeters = Math.floor(30.48 * feet + inches * 2.54)
        let centimeters = totalCentimeters % 100 + ' см ';
        let meters = Math.floor(totalCentimeters / 100) + ' м '
        return meters + centimeters;
    }

    function WeightConverter(userWeight) {
        return Math.floor(userWeight / 2.205) + ' кг';
    }

    function removeUser(userName) {
        const removeArr = users.filter(user => user.first_name !== userName)

        setUsers(removeArr)
    }

    function setSalary(userSalary) {
        return Math.floor(userSalary * currency)
    }

    function handleCheckChildElement(event) {
        users.map(user => {
            if (user.first_name === event.target.value) {
                user.isChecked = !user.isChecked;
            }
        })
        setUsers([...users])
    }

    users.map(user => {
        user.isChecked = !user.isChecked;
    })



    return (
        <div>
            <TableExample
                setChecked={props.setChecked}
                users={users}
                setUsers={setUsers}
            />
            {users.map(user => {
                return(
                    <div className={`${classes.user} ${user.isChecked ? 'TableItem_user__spec' : ''}`}>
                        <label className={classes.label}>
                            <input type='checkbox' className={classes.user_checkbox} checked={user.isChecked} value={user.first_name} onChange={handleCheckChildElement}/>
                            <span className={classes.fake}>

                            </span>
                        </label>
                        <div className={classes.user_id}>{users.indexOf(user) + 1}</div>
                        <div className={classes.user__name}>{user.first_name} {user.last_name}</div>
                        <div className={classes.user__birth}>{timeConverter(user.date_of_birth)}</div>
                        <div className={classes.user__height}>{FeetConverter(user.height)}</div>
                        <div className={classes.user__weight}>{WeightConverter(user.weight)}</div>
                        <div className={classes.user__salary}>{setSalary(user.salary)} $</div>
                        <div>
                            <button className={classes.editBtn}>
                                <ImPencil className={classes.edit}/>
                            </button>
                            <button onClick={() => removeUser(user.first_name)} className={classes.removeBtn}>
                                <ImBin className={classes.bin}/>
                            </button>
                        </div>
                    </div>
                )
            })}
            <DeleteBtn
                users={users}
                setUsers={setUsers}
            />
        </div>
    );
};

export default TableItem;