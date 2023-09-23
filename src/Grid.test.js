import {screen, render} from '@testing-library/react';
import Grid from './Grid';

test("3x3 grid renders 9 squares", () => {
    render(<Grid
        row_length={3}
        column_length={3}
        />);
    expect(screen.getAllByRole('button'))
        .toHaveLength(9);
});
