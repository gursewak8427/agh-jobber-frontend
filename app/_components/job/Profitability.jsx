const Profitability = ({ job }) => {
    // Helper functions to calculate different parts
    const calculateTotal = (key) => {
        return job?.service?.reduce((total, service) => {
            return total + (service?.items?.reduce((itemTotal, item) => {
                return itemTotal + (parseFloat(item?.[key]) || 0); // Dynamic key for labour, material, markup, etc.
            }, 0) || 0);
        }, 0);
    };

    const totalMarkup = calculateTotal('markupamount')?.toFixed(2);
    const totalLabour = calculateTotal('labour')?.toFixed(2);
    const totalMaterial = calculateTotal('material')?.toFixed(2);
    const totalExpense = job?.expense?.reduce((total, expense) => total + parseFloat(expense?.total), 0);

    const profit = totalMarkup - totalExpense;
    const profitMargin = totalMarkup ? ((profit / totalMarkup) * 100).toFixed(2) : 0;

    return (
        <div className="flex items-center justify-between p-4">
            {/* Left Side: Profit margin percentage */}
            <div className="flex flex-col items-start">
                <p className={`text-lg font-semibold ${profit < 0 ? 'text-red-500' : 'text-green-500'} dark:text-dark-text`}>
                    {profitMargin}%
                </p>
                <p className="text-sm text-gray-500 dark:text-dark-text">Profit margin</p>
            </div>

            <div className="flex items-center space-x-4">
                {/* Middle: Price breakdown */}
                <div className="flex items-center space-x-4">
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-dark-text">Total price</p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-dark-text">${job?.totalprice}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-dark-text">Total cost</p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-dark-text">${job?.totalcost}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-blue-500 dark:text-blue-300">Labour</p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">${totalLabour}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-blue-500 dark:text-blue-300">Material</p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">${totalMaterial}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-blue-500 dark:text-blue-300">Markup</p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">${totalMarkup}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-blue-500 dark:text-blue-300">Expenses</p>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-400">${totalExpense}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-green-500 dark:text-dark-second-text">Profit</p>
                        <p className={`text-sm font-semibold ${profit < 0 ? 'text-red-500' : 'text-gray-700'} dark:text-gray-400`}>
                            ${profit.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profitability;
