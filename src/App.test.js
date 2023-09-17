import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import '@testing-library/user-event'
import App from './App';
import userEvent from '@testing-library/user-event';

describe ('App', () => {
    test('if the heading is correct', () => {
        render(<App />);
        const headingElement = screen.getByText(/Codon Translation/i);
        expect(headingElement).toBeInTheDocument();
    })

    test('if all cards are displayed initially', () => {
        render(<App />);
        const cardElements = screen.queryAllByTestId("card");
        expect(cardElements.length).toBe(21);
    })

    test('if input is reflected in the search box state', () => {
        render(<App />);
        const inputElements = screen.getAllByRole("textbox");
        fireEvent.keyDown(inputElements[0], {key: "A"});
        expect(inputElements[0].value).toBe("A");
    })

    test('case sensitivity', () => {
        render(<App />);
        const inputElements = screen.getAllByRole("textbox");
        fireEvent.keyDown(inputElements[0], {key: "a"});
        fireEvent.keyDown(inputElements[1], {key: "u"});
        fireEvent.keyDown(inputElements[2], {key: "c"});
        expect(inputElements[0].value).toBe("A");
        expect(inputElements[1].value).toBe("U");
        expect(inputElements[2].value).toBe("C");
        fireEvent.keyDown(inputElements[2], {key: "g"});
        expect(inputElements[2].value).toBe("G");
    })

    test('if a completed, valid nucleotide search updates to display the correct card only', () => {
        render(<App />);
        const inputElements = screen.getAllByRole("textbox");
        fireEvent.keyDown(inputElements[0], {key: "A"});
        fireEvent.keyDown(inputElements[1], {key: "C"});
        fireEvent.keyDown(inputElements[2], {key: "U"});
        
        const cardElements = screen.queryAllByTestId("card");
        expect(cardElements.length).toBe(1);

        const threonineCard = screen.getByText('Threonine');
        expect(threonineCard).toBeInTheDocument;
    })

    test('if an incomplete search displays all cards', () => {
        render(<App />);
        const inputElements = screen.getAllByRole("textbox");
        fireEvent.keyDown(inputElements[0], {key: "G"});
        fireEvent.keyDown(inputElements[1], {key: "G"});
        fireEvent.keyDown(inputElements[2], {key: "G"});
        
        var cardElements = screen.queryAllByTestId("card");
        expect(cardElements.length).toBe(1);

        fireEvent.keyDown(inputElements[2], {key: "Backspace"});
        expect(inputElements[2].value).toBe("");

        cardElements = screen.queryAllByTestId("card");
        expect(cardElements.length).toBe(21);
    })

    test('if inputting non-valid nucleotide letters does not change display', () => {
        render(<App />);
        const inputElements = screen.getAllByRole("textbox");
        fireEvent.keyDown(inputElements[0], {key: "!"});
        fireEvent.keyDown(inputElements[1], {key: "K"});
        fireEvent.keyDown(inputElements[2], {key: "4"});
        expect(inputElements[0].value).toBe("");
        expect(inputElements[1].value).toBe("");
        expect(inputElements[2].value).toBe("");

        var cardElements = screen.queryAllByTestId("card");
        expect(cardElements.length).toBe(21);
    })
    

    //test the help module



})

