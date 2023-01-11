import React, { useEffect, useState } from 'react';
import './Salaries.css';
import SalariesAPI from '../../api/salaries';

const Salary = ({ salaries, Add }) => {
  const [salary, setSalary] = useState([salaries.amount ? salaries.amount : 0]);
  const [value, setValue] = useState([]);

  const onChangeSalary = (e) => {
    e.preventDefault();
    setSalary(e.target.value);
  };

  useEffect(() => {
    const getSalary = async () => {
      try {
        const res = await SalariesAPI.fetch();
        setSalary(res.data.amount);
      } catch (err) {
        console.log(err);
      }
    };
    getSalary();
  }, [value]);

  return (
    <div key={salary} className="salary">
      <p>Change your salary here : </p>

      <form className="salary-form" onSubmit={Add}>
        <input
          type="number"
          placeholder="Enter salary here"
          value={salary ? salary : 0}
          onChange={onChangeSalary}
        ></input>
        <p>$</p>
        <button type="submit" className="btn-form">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Salary;
