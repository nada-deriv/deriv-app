import React from 'react';
import { render, screen } from '@testing-library/react';
import OnlineStatusAvatar from '../online-status-avatar';

const props = {
    is_online: 0,
    nickname: 'test',
    size: 40,
    text_size: 'xs',
};
describe('<OnlineStatusAvatar/>', () => {
    it('renders component with passed title and children', () => {
        render(<OnlineStatusAvatar {...props} />);

        expect(screen.getByText('TE')).toBeInTheDocument();
    });
});
