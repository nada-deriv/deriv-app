import { ERROR_CODES } from '@/constants';
import { countDecimalPlaces, decimalValidator } from './string';

/**
 * Determines whether to show a tooltip icon based on the visibility status.
 * A tooltip icon should be shown if:
 * - There is only one visibility status and it is not equal to `ERROR_CODES.ADVERT_INACTIVE`
 *   or `ERROR_CODES.ADVERTISER_ADS_PAUSED`.
 * - There are multiple visibility statuses.
 *
 * @param {string[]} visibilityStatus - The array of visibility statuses.
 * @returns {boolean} Returns `true` if a tooltip icon should be shown, otherwise `false`.
 */
export const shouldShowTooltipIcon = (visibilityStatus: string[]) =>
    (visibilityStatus?.length === 1 &&
        visibilityStatus[0] !== ERROR_CODES.ADVERT_INACTIVE &&
        visibilityStatus[0] !== ERROR_CODES.ADVERTISER_ADS_PAUSED) ||
    visibilityStatus.length > 1;

/**
 * Determines the visibility error codes based on the provided parameters.
 *
 * @param {string[]} visibilityStatus - The array of existing visibility status codes.
 * @param {boolean} enableActionPoint - A boolean indicating whether the action point is enabled.
 * @param {boolean} isAdvertListed - A boolean indicating whether the advert is listed.
 * @returns {string[]} Returns an updated array of visibility status codes.
 */
export const getVisibilityErrorCodes = (
    visibilityStatus: string[],
    enableActionPoint: boolean,
    isAdvertListed: boolean
) => {
    let updatedVisibilityStatus = [...visibilityStatus];
    if (!isAdvertListed && !updatedVisibilityStatus.includes(ERROR_CODES.ADVERTISER_ADS_PAUSED))
        updatedVisibilityStatus = [...updatedVisibilityStatus, ERROR_CODES.ADVERTISER_ADS_PAUSED];
    if (!enableActionPoint && updatedVisibilityStatus.includes(ERROR_CODES.ADVERT_INACTIVE))
        updatedVisibilityStatus = updatedVisibilityStatus.filter(status => status !== ERROR_CODES.ADVERT_INACTIVE);
    if (enableActionPoint && !updatedVisibilityStatus.includes(ERROR_CODES.ADVERT_INACTIVE))
        updatedVisibilityStatus = [...updatedVisibilityStatus, ERROR_CODES.ADVERT_INACTIVE];
    return updatedVisibilityStatus;
};

type ValidationRules = {
    [key: string]: (value: string) => boolean | string;
};

const requiredValidation = (value: string, field: string) => !!value || `${field} is required`;
const decimalPointValidation = (value: string) =>
    (Number(value) > 0 && decimalValidator(value) && countDecimalPlaces(value) <= 2) ||
    'Only up to 2 decimals are allowed.';
export const getValidationRules = (
    fieldName: string,
    getValues: (fieldName: string) => number | string
): ValidationRules => {
    switch (fieldName) {
        case 'amount':
            return {
                validation_1: value => requiredValidation(value, 'Amount'),
                validation_2: value => !isNaN(Number(value)) || 'Enter a valid amount',
                validation_3: value => decimalPointValidation(value),
                validation_4: value =>
                    getValues('min-order')
                        ? Number(value) >= Number(getValues('min-order')) || 'Amount should not be below Min limit'
                        : '',
                validation_5: value =>
                    getValues('max-order')
                        ? Number(value) <= Number(getValues('max-order')) || 'Amount should not exceed Max limit'
                        : '',
            };
        case 'rate-type':
            //TODO: validations to be changed considering float as well
            return {
                validation_1: value => requiredValidation(value, 'Fixed rate'),
                validation_2: value => !isNaN(Number(value)) || 'Enter a valid amount',
                validation_3: value => decimalPointValidation(value),
                validation_4: value =>
                    (Number(value) >= 0 && Number(value) <= 100) || 'Rate should be between 0 and 100',
            };
        case 'min-order':
            return {
                validation_1: value => requiredValidation(value, 'Min limit'),
                validation_2: value => !isNaN(Number(value)) || 'Only numbers are allowed',
                validation_3: value => decimalPointValidation(value),
                validation_4: value =>
                    getValues('amount')
                        ? Number(value) <= Number(getValues('amount')) || 'Min limit should not exceed Amount'
                        : '',
                validation_5: value =>
                    getValues('max-order')
                        ? Number(value) <= Number(getValues('max-order')) || 'Min limit should not exceed Max limit'
                        : '',
            };
        case 'max-order':
            return {
                validation_1: value => requiredValidation(value, 'Max limit'),
                validation_2: value => !isNaN(Number(value)) || 'Only numbers are allowed',
                validation_3: value => decimalPointValidation(value),
                validation_4: value =>
                    getValues('amount')
                        ? Number(value) <= Number(getValues('amount')) || 'Max limit should not exceed Amount'
                        : '',
                validation_5: value =>
                    getValues('min-order')
                        ? Number(value) >= Number(getValues('min-order')) || 'Max limit should not be below Min limit'
                        : '',
            };
        default:
            return {};
    }
};

export const restrictLength = (e, handleChange, maxCharacters = 15) => {
    // typing more than 15 characters will break the layout
    // max doesn't disable typing, so we will use this to restrict length
    if (e.target.value.length > maxCharacters) {
        e.target.value = e.target.value.slice(0, maxCharacters);
        return;
    }
    handleChange(e);
};
