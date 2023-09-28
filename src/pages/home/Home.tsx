import AddTransaction from '../../components/add-transaction/AddTransaction';
import Balance from '../../components/balance/Balance';
import TransactionCard from '../../components/transaction-card/TransactionCard';
import { Account } from '../../interfaces/Account';

import './Home.css'

import { useEffect, useState } from "react"


const Home = () => {
	const [account, setAccount] = useState<Account>({
		name: '',
		startBalance: 0,
		balance: 0,
		transactions: [{
			amount: '0',
			date: '',
			name: '',
			type: 'Received',
		}]
	})

	const [addTransaction, setAddTransaction] = useState(false);


	useEffect(() => {

		fetch('http://localhost:5000/account', {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				setAccount(data);
			})
			.catch((err) => console.log(err));
	}, [])


	function closeAddTransaction() {
		setAddTransaction(false);
	}

	return (
		<div className="home">
			<div className='home-content'>
				{addTransaction && (
					<div>
						<AddTransaction onClose={closeAddTransaction} accountData={account} closeAddTransaction={closeAddTransaction} />
					</div>
				)}
				<div className='home-header'>
					<h1>Transactions</h1>
					<button onClick={() => setAddTransaction(true)}>+</button>
				</div>
				<Balance balance={account.balance} />
				<div className='transactions-cards'>
					{account.transactions.map(transaction => (
						<TransactionCard transaction={transaction} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Home