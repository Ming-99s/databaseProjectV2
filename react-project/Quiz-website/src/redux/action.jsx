import {
    Change_category,
    Change_difficulty,
    Change_type,
    Change_amount,
    Change_score,
    Change_username,
    Change_email,
    Change_password,
    RESET_ALL
} from './actionType';

export const handleCategoryChange = (payload) => ({
    type: Change_category,
    payload,
});
export const handleDifficultyChange = (payload) => ({
    type: Change_difficulty,
    payload,
});
export const handleTypeChange = (payload) => ({
    type: Change_type,
    payload,
});
export const handleScoreChange = (payload) => ({
    type: Change_score,
    payload,
});
export const handleAmountChange = (payload) => ({
    type: Change_amount,
    payload,
});
export const handleNameChange = (payload) => ({
    type: Change_username,
    payload,
});
export const handleEmailChange = (payload) => ({
    type: Change_email,
    payload,
});
export const handlePasswordChange = (payload) => ({
    type: Change_password,
    payload,
});

// Reset Action
export const handleReset = (payload) => ({
    type: RESET_ALL,
    payload
});
