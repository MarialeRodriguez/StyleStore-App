export const amountFormatter = (amount) => {
    const dollars = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    return dollars;
};