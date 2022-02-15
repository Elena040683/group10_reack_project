import categories from '../../json/category.json';
import types from '../../json/incomes.json';
import React, { useState } from 'react';
import s from './Selector.module.css';
import Select from 'react-select';
// import styled from 'styled-components';

const customStyles = {
  control: () => ({
    // backgroundColor: '#f5f6fb',
    // // display: 'block',
    // width: 282,
    // height: 44,
  }),
  dropdownIndicator: () => ({
    display: 'none',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),
  placeholder: () => ({
    color: ' #c7ccdc',
    display: 'flex',
    alignItems: 'center',
  }),
};

const expensesOptions = categories.map(e => ({
  value: e.id,
  label: e.category,
}));

const incomesOptions = types.map(e => ({
  value: e.id,
  label: e.category,
}));

export const OutcomesSelector = () => {
  const [selected, setSelected] = useState([]);

  const optionId = selected.value;
  const optionCategory = selected.label;
  console.log(optionId, optionCategory);
  return (
    <>
      <input
        className={s.input}
        id="js-keyword-input"
        type="text"
        name="name"
        placeholder="Описание товара"
        required
      />
      <Select
        classNamePrefix="react-select"
        className={s.control}
        onChange={setSelected}
        styles={customStyles}
        placeholder="Категория товара"
        options={expensesOptions}
      />
    </>
  );
};

export const IncomesSelector = () => {
  const [selected, setSelected] = useState([]);

  const optionId = selected.value;
  const optionCategory = selected.label;
  console.log(optionId, optionCategory);
  return (
    <>
      <input
        className={s.input}
        id="js-keyword-input"
        type="text"
        name="name"
        placeholder="Описание дохода"
        required
      />

      <Select
        classNamePrefix="react-select"
        className={s.control}
        onChange={setSelected}
        styles={customStyles}
        placeholder="Категория дохода"
        options={incomesOptions}
      />
    </>
  );
};
