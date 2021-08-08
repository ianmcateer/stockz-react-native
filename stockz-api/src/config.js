// Configuration object for financial modelling prep
const fmpConfig = {
    baseUrl: process.env.FINANICAL_MODELLING_PREP_BASE_URL,
    apiKeys:
        process.env.FINANCIAL_MODELLING_PREP_API_KEYS &&
        process.env.FINANCIAL_MODELLING_PREP_API_KEYS.split(" "),
};

module.exports = {
    fmpConfig,
};
