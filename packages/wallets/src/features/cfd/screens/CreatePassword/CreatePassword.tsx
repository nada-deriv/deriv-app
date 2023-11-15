import React from 'react';
import { WalletButton, WalletPasswordField } from '../../../../components/Base';
import { passwordChecker } from '../../../../components/Base/WalletPasswordField/PasswordFieldUtils';
import useDevice from '../../../../hooks/useDevice';
import { TPlatforms } from '../../../../types';
import { PlatformDetails } from '../../constants';
import './CreatePassword.scss';

type TProps = {
    icon: React.ReactNode;
    isLoading?: boolean;
    onPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPrimaryClick: () => void;
    password: string;
    platform: TPlatforms.All;
};

const CreatePassword: React.FC<TProps> = ({
    icon,
    isLoading,
    onPasswordChange,
    onPrimaryClick,
    password,
    platform,
}) => {
    const { isMobile } = useDevice();

    const title = PlatformDetails[platform].title;
    const { score } = passwordChecker(password);
    return (
        <div className='wallets-create-password'>
            {!isMobile && icon}
            <div className='wallets-create-password-title'>Create a {title} password</div>
            <span className='wallets-create-password-subtitle'>
                You can use this password for all your {title} accounts.
            </span>
            <WalletPasswordField label={`${title} password`} onChange={onPasswordChange} password={password} />
            {!isMobile && (
                <WalletButton
                    disabled={!password || isLoading || score <= 2}
                    isLoading={isLoading}
                    onClick={onPrimaryClick}
                    size='lg'
                    text={`Create ${title} password`}
                />
            )}
        </div>
    );
};

export default CreatePassword;
