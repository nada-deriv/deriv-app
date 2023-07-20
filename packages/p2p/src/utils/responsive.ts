import { isMobile } from '@deriv/shared';

/**
 * Function to get the label size based on the screen size
 * @function getFieldValueSize
 * @returns {string} label size
 */
export const getFieldValueSize = (mobile_size: string, desktop_size: string) =>
    isMobile() ? mobile_size : desktop_size;
