import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  constructor(private transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(title: string, type: string, value: number): Transaction {
    if (value < 1) {
      throw new Error('O valor da transação não pode ser menor que 1 real');
    }

    if (type !== 'income' && type !== 'outcome') {
      throw new Error('Transação deve ser de entrada ou saída');
    }

    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance().total;
      if (value > balance) {
        throw new Error('Valor de saída não pode ser maior que valor disponível');
      }
    }

    return this.transactionsRepository.create(title, type, value);
  }
}

export default CreateTransactionService;
