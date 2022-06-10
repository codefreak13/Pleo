import {platformUtils} from '../utils';

const port = '3000';
export const BASEURL = platformUtils.isAndroid()
  ? `http://10.0.2.2:${port}`
  : `http://localhost:${port}`;

export async function getExpenses(offset: number, limit: number = 15) {
  const res = await fetch(
    `${BASEURL}/expenses?limit=${limit}&offset=${offset}`,
  );
  return await res.json();
}

// created to avoid duplicate code in the future.
async function updateExpense(expenseId: string, data: {comment: string}) {
  const res = await fetch(`${BASEURL}/expenses/${expenseId}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
}

export async function addCommentToExpense(expenseId: string, comment: string) {
  const res = await updateExpense(expenseId, {comment});
  return res;
}
/** 
 @expenseId the id of the expense
 @data is a base64 encoded
 * */
export async function addReceiptToExpense(expenseId: string, data: any) {
  const formData = new FormData();
  formData.append('receipt', data);

  const res = await fetch(`${BASEURL}/expenses/${expenseId}/receipts`, {
    method: 'POST',
    body: formData,
  });
  return await res.json();
}

const api = {getExpenses, addReceiptToExpense, addCommentToExpense};

export default api;
