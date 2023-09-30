import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import '@testing-library/user-event'
import App from './App';


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

    test('if an incomplete search displays matching cards', () => {
        render(<App />);
        const inputElements = screen.getAllByRole("textbox");
        fireEvent.keyDown(inputElements[0], {key: "C"});
        fireEvent.keyDown(inputElements[1], {key: "A"});
        fireEvent.keyDown(inputElements[2], {key: "G"});
        
        const glutamicAcidCard = screen.getByText('Glutamic acid');
        var cardElements = screen.queryAllByTestId("card");
        expect(glutamicAcidCard).toBeInTheDocument;
        expect(cardElements.length).toBe(1);
        
        fireEvent.keyDown(inputElements[2], {key: "Backspace"});
        cardElements = screen.queryAllByTestId("card");
        const histidineCard = screen.getByText('Histidine');
        expect(glutamicAcidCard).toBeInTheDocument;
        expect(histidineCard).toBeInTheDocument;
        expect(cardElements.length).toBe(2);

        fireEvent.keyDown(inputElements[1], {key: "Backspace"});
        cardElements = screen.queryAllByTestId("card");
        const prolineCard = screen.getByText('Proline');
        const arginineCard = screen.getByText('Arginine');
        const leucineCard = screen.getByText('Leucine');
        expect(glutamicAcidCard).toBeInTheDocument;
        expect(histidineCard).toBeInTheDocument;
        expect(prolineCard).toBeInTheDocument;
        expect(arginineCard).toBeInTheDocument;
        expect(leucineCard).toBeInTheDocument;
        expect(cardElements.length).toBe(5);
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
})

describe('Help module', () => {
    test('if help module is hidden upon load', () => {
        const helpModule = screen.queryByTitle("help-module");
        expect(helpModule).toBeFalsy;
    })

    test('if help module is opened upon clicking icon', () => {
        render(<App />);
        const helpIcon = screen.getByTitle("help-icon");
        fireEvent.click(helpIcon);
        const helpModule = screen.getByTitle("help-module");

        expect(helpModule).toBeTruthy;
    })

    test('if help module can be closed via the button', () => {
        render(<App />);
        const helpIcon = screen.getByTitle("help-icon");
        fireEvent.click(helpIcon);

        var helpModule = screen.getByTitle("help-module");
        expect(helpModule).toBeTruthy;

        const closeButton = screen.getByRole("button", { name: "Close" });
        fireEvent.click(closeButton);
        helpModule = screen.queryByTitle("help-module");
        expect(helpModule).toBeFalsy;
    })

    test('if help module can be closed by clicking outside the module', () => {
        render(<App />);
        const helpIcon = screen.getByTitle("help-icon");
        fireEvent.click(helpIcon);
        var helpModule = screen.queryByTitle("help-module");
        expect(helpModule).toBeTruthy;

        fireEvent.click(document.body);
        expect(helpModule).toBeFalsy;
    })
})

