import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { ReduxProvider } from '../../state/ReduxProvider';
import { reducer, initialState } from '../../state/reducer';

describe('App component', () => {
  it('renders the App component ', () => {
    render(
      <ReduxProvider reducer={reducer} initialState={initialState} >
        <App />
      </ReduxProvider>);

    const display = screen.getByTestId('display');
    expect(display).toHaveStyle({ backgroundColor: '#00ff00' });

    const input = screen.getByTestId('bg-color');
    fireEvent.change(input, { target: { value: '#ff0000' } });
    expect(display).toHaveStyle({ backgroundColor: '#ff0000' });

    const undo = screen.getByTestId('undo');
    userEvent.click(undo);
    expect(display).toHaveStyle({ backgroundColor: '#00ff00' });

    const redo = screen.getByTestId('redo');
    userEvent.click(redo);
    expect(display).toHaveStyle({ backgroundColor: '#ff0000' });
  });
});