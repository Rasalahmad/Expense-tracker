import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {
  const { isLoading, isError, transactions } = useSelector(
    (state) => state.transaction
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  let content = null;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && isError) content = <p>There is an error occur</p>;
  if (!isLoading && !isError && transactions.length === 0)
    content = <p>No transaction found</p>;

  if (!isLoading && !isError && transactions.length > 0)
    content = transactions.map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  return (
    <>
      <p className="second_heading">Your Transactions:</p>

      <div className="conatiner_of_list_of_transactions">
        <ul>{content}</ul>
      </div>
    </>
  );
}
