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
/*
test("25x5 grid renders 125 squares", () => {
    render(<Grid
        row_length={25}
        column_length={5}
        />);
    expect(screen.getAllByRole('button', {name: 'square'}))
        .toHaveLength(125);
});
*/

/*
test("Clicking a middle box turns that square into an X", () => {
    // expect grid data to be: ["", "", "", "", "", "", "", "", ""]
    // after click, expect data to be:
    // ["", "", "", "", X, "", "", "", ""]
});
*/