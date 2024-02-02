import React from 'react';
import { APIProvider } from '@deriv/api';
import { render, screen } from '@testing-library/react';
import AdStatus from '../AdStatus';

const wrapper = ({ children }: { children: JSX.Element }) => <APIProvider>{children}</APIProvider>;

describe('AdStatus', () => {
    it('should render the component as expected with Inactive as default', () => {
        render(<AdStatus />, { wrapper });
        expect(screen.getByText('Inactive')).toBeInTheDocument();
    });
    it('should render active when isActive is true', () => {
        render(<AdStatus isActive={true} />, { wrapper });
        expect(screen.getByText('Active')).toBeInTheDocument();
    });
});
