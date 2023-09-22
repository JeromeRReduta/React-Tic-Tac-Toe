import {render} from '@testing-library/react';
import Square from "./Square";

test("1 square with value X is rendered", () => {
    const { getByRole } = render(<Square value = "X"/>);
    const xSquare = getByRole('button');
    expect(xSquare).toHaveTextContent("X");
});

test("1 square with value O is rendered", () => {
    const { getByRole } = render(<Square value = "O"/>);
    const oSquare = getByRole('button');
    expect(oSquare).toHaveTextContent("O");
});