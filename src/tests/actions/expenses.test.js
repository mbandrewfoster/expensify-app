import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should generate remove expense action object', () => {
  const action = removeExpense({ id: '123abc'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should generate edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New Note Value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New Note Value'
    }
  })
});

test('should generate add expense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'This was last months rent'
  };
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...expenseData
    }
  });
});

test('should generate add expense action object with default values', () => {
  const defaultExpenseData = {
    description: '', 
    note: '', 
    amount: 0, 
    createdAt: 0 
  };
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      ...defaultExpenseData
    }
  })
});

