const formatAmount = (amount) => {
  return amount.toLocaleString('en-US', { minimumFractionDigits: 2 })
}

module.exports = { formatAmount }

