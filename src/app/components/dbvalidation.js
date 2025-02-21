import { fetchAccounts } from "../lib/db.js";

export const fetchAccountsClient = async () => {
    const response = await fetch('/api/accounts');
    if (!response.ok) {
        throw new Error('Failed to fetch accounts');
    }
    return await response.json();
};

const checkData = async (username, password) => {
    const account = await fetchAccountsClient();
    let errors = {};
    if (username !== account.Account_Username) {
        errors.username = 'username invalid';
    }
    if (password !== account.Account_Password) {
        errors.password = 'password invalid';
    }
    return errors;
};
export default checkData;