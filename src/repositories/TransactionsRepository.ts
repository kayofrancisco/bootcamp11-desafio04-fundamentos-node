import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = { income: 0, outcome: 0, total: 0 };

    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        balance.income += transaction.value;
        balance.total += transaction.value;
      } else {
        balance.outcome += transaction.value;
        balance.total -= transaction.value;
      }
    });

    return balance;
  }

  public create(title: string, type: ('income' | 'outcome'), value: number): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
