import { localize } from 'Components/i18next';
import { isMobile } from '@deriv/shared';

/**
 * Function to get the message to be displayed in the blocked users modal
 * @function getMessage
 * @param {number} user_blocked_count // the numbers of users who have blocked the current user
 * @return { string }
 * */

export const getMessage = (user_blocked_count: number): string => {
    switch (user_blocked_count) {
        case 0:
            return localize('Nobody has blocked you. Yay!');
        case 1:
            return localize('{{user_blocked_count}} person has blocked you', {
                user_blocked_count,
            });
        default:
            return localize('{{user_blocked_count}} people have blocked you', {
                user_blocked_count,
            });
    }
};

/**
 * Function to get the label size based on the screen size
 * @function getLabelSize
 * @returns {string} label size
 */
export const getLabelSize = (): string => (isMobile() ? 'xxxs' : 'xs');
