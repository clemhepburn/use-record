import React, { useReducer } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { ReduxProvider } from '../../state/ReduxProvider';
import { reducer, initialState } from '../../state/reducer';

describe('App component', () => {
  it('renders App', () => {
    render(
      <ReduxProvider reducer={reducer} initialState={initialState}>
        <App />
      </ReduxProvider>
    );

    const display = screen.getByTestId('display');
    expect(display).toHaveStyle({ backgroundColor: '#ff0000' });

    const bgColorInput = screen.getByTestId('bg-color');
    fireEvent.change(bgColorInput, { target: { value: '#090909' } });
    expect(display).toHaveStyle({ backgroundColor: '#090909' });

    const undoButton = screen.getByTestId('undo');
    fireEvent.click(undoButton);
    expect(display).toHaveStyle({ backgroundColor: '#ff0000' });

    const redoButton = screen.getByTestId('redo');
    fireEvent.click(redoButton);
    expect(display).toHaveStyle({ backgroundColor: '#090909' });


  });
});
