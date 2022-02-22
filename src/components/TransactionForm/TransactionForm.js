import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import categories from '../../json/category.json';
import transactionsAPI from '../../services/transactions-api';
import Table from '../Table/Table';
import Summary from '../Summary/Summary';
import { useSelector } from 'react-redux';
import { getAllTransactions } from '../../redux/transactions/selectors';
// import "./styles.css";

export default function TransactionsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues: { subcategory: '', category: '', sum: 0 } });

  let transactions = useSelector(getAllTransactions);
  console.log('transactions', transactions);
  // let sixMonthsReport = useSelector()
  // нужно дописать селектор и вытягивать из стейта данные, чтобы потом прокинуть их в summary
  let sixMonthsReport = null;

  const onSubmit = async ({ category, subcategory, sum }, e) => {
    // console.log('data', data)
    // console.log('e', e)
    const transactionToAdd = {
      category,
      subcategory,
      sum,
    };
    console.log('transactionToAdd', transactionToAdd);
    const status = await transactionsAPI.addTransaction(transactionToAdd);
    console.log('status', status);
    if (status === 201) {
      const updatedTransactions = await transactionsAPI.getApiTransactions();
      console.log('updatedTransactions', updatedTransactions);
      transactions = updatedTransactions;
      const tempSixMonthsReport = await transactionsAPI.getApiSixMonthsReport(
        'loss',
      );
      sixMonthsReport = tempSixMonthsReport.data.result;
      console.log('sixMonthsReport', sixMonthsReport);
    }
  };

  //to reset values after successful submit
  useEffect(() => {
    if (isSubmitSuccessful) {
      console.log('inside isSubmitSuccessful');
      reset({ subcategory: '', category: '', sum: 0 });
    }
  }, [isSubmitSuccessful, reset]);

  console.log(errors);

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.category,
  }));
  // console.log('categoryOptions', categoryOptions)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label style={{ display: 'block', marginTop: 20, marginBottom: 20 }}>
          Description
        </label>
        <input
          type="text"
          placeholder=""
          {...register('subcategory', { required: true })}
        />
        <select {...register('category', { required: true })}>
          {categoryOptions.map(option => (
            <option value={option.label} id={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <input type="number" {...register('sum', { required: true })} />

        <input type="submit" />
        <input
          style={{ display: 'block', marginTop: 20 }}
          type="reset"
          value="Standard Reset Field Values"
        />
      </form>
      <Table transactions={transactions} />
      <Summary sixMonthsReport={sixMonthsReport} />
    </>
  );
}