import React        from 'react';
import { localize } from '@deriv/translations';
import { flatten }  from 'Modules/Account/Helpers/flatten';

export const unsupported_contract_types_list = [
    // TODO: uncomment before merge
    // 'run_high_low',
    // 'reset',
    // 'asian',
    // 'tick_high_low',
    // 'end',
    // 'stay',
    // 'lb_call',
    // 'lb_put',
    // 'lb_high_low',
    // 'multiplier',
];

export const contract_category_icon = {
    [localize('Ups & Downs')]      : 'IcUpsDowns',
    [localize('Highs & Lows')]     : 'IcHighsLows',
    [localize('Ins & Outs')]       : 'IcInsOuts',
    [localize('Look Backs')]       : 'IcLookbacks',
    [localize('Digits')]           : 'IcDigits',
    [localize('Multiplier option')]: 'IcMultiplier',
};

export const getAvailableContractTypes = (contract_types_list, unsupported_list) => {
    const list = Object.keys(contract_types_list)
        .map(key => {
            const contract_types = contract_types_list[key];
            const available_contract_types =
            contract_types.filter(type => type.value &&
                    // TODO: remove this check once all contracts are supported
                    !unsupported_list.includes(type.value) ? type : undefined
            );

            if (available_contract_types.length) {
                return {
                    label         : key,
                    contract_types: available_contract_types,
                    icon          : contract_category_icon[key],
                    component     : key === localize('Multiplier option') ?
                        <span className='vertical-tab__header--new'>{localize('NEW!')}</span>
                        :
                        null,
                };
            }
            return undefined;
        })
        .filter(key => !!key);

    return list;
};

/**
 * Returns a filtered list
 * @param {object} contract_types_list  - list of all contracts
 * @param {array}  filtered_items_array - list of filtered contract category names and/or contract types names
 */
export const getFilteredList = (contract_types_list, filtered_items_array) => {
    const filtered_list = Object.keys(contract_types_list)
        .map(key => {
            const {
                label,
                contract_types,
                icon,
            } = contract_types_list[key];

            const filtered_by_contract_types = contract_types
                .filter(c => filtered_items_array.includes(c.text.toLowerCase()));

            const filtered_by_contract_category = filtered_items_array.includes(label.toLowerCase());

            if (filtered_by_contract_types.length) {
                return {
                    label,
                    contract_types: filtered_by_contract_types,
                    icon,
                };
            } else if (filtered_by_contract_category) {
                return {
                    label,
                    contract_types,
                    icon,
                };
            }
            return undefined;
        })
        .filter(key => !!key);

    return filtered_list;
};

/**
 * Flatten an object into an array of contract category label and contract types names
 * @param {object} list
 */
export const getContractsList = (list) => flatten(
    Object.keys(list)
        .map(k => [
            list[k].label.toLowerCase(),                              // contract category names
            ...list[k].contract_types.map(c => c.text.toLowerCase())] // contract types names
        )
);

const findContractCategory = (list, item) => Object.keys(list).map(key =>
    list[key].contract_types.find(i => i.value === item.value) ? list[key] : null)
    .filter(i => !!i)[0];

export const getContractCategoryLabel = (list, item) => findContractCategory(list, item).label;

export const getContractTypes = (list, item) => findContractCategory(list, item).contract_types;
