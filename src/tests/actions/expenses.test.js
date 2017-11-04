import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
  addExpense, 
  startAddExpense, 
  editExpense,
  startEditExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  });
  database.ref('expenses').set(expensesData).then(() => done());
});

test('should generate remove expense action object', () => {
  const action = removeExpense({ id: '123abc'});
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should remove expense from database', (done) => {
  const store = createMockStore({});
  const id = expenses[0].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
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

test('should update expense in database', (done) => {
  const store = createMockStore({});
  const id = expenses[1].id;
  const updates = {
    amount: 3345345,
    note: 'This the updated note'
  };
  store.dispatch(startEditExpense(id, updates)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual({
      description: expenses[1].description,
      createdAt: expenses[1].createdAt,
      ...updates
    });
    done();
  });  
});

test('should generate add expense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: { ...expenses[2] }
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Meat',
    amount: 400,
    createdAt: 10000,
    note: 'Awesome meat'
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const defaultExpenseData = { 
    description: '', 
    note: '', 
    amount: 0, 
    createdAt: 0 
  };

  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...defaultExpenseData
      }
    });
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(defaultExpenseData);
    done();
  });
});

test('should generate set expenses action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  })
});

test('should fetch expenses from database', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});