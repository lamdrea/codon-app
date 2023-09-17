import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import '@testing-library/user-event'
import HelpBox from './HelpBox';

describe ('HelpBox', () => {
    test('if help box is loaded', () => {
        render(<HelpBox show={true} />);
        const headingElement = screen.getByText("How do I use this tool?");
        expect(headingElement).toBeInTheDocument();
    })

    test('if accordion expands and closes content on click', () => {
        render(<HelpBox show={true} />);
        const accordionButtons = screen.getAllByRole("button", { expanded: false });

        expect(accordionButtons[1].ariaExpanded).toBeFalsy;

        fireEvent.click(accordionButtons[1]);
        expect(accordionButtons[1].ariaExpanded).toBeTruthy;

        fireEvent.click(accordionButtons[1]);
        expect(accordionButtons[1].ariaExpanded).toBeFalsy;

    })

    test('if only one item is expanded at a time', () => {
        render(<HelpBox show={true} />);
        const accordionButtons = screen.getAllByRole("button", { expanded: false });

        fireEvent.click(accordionButtons[0]);
        fireEvent.click(accordionButtons[3]);

        expect(accordionButtons[3].ariaExpanded).toBeTruthy;
        expect(accordionButtons[1].ariaExpanded).toBeFalsy;
        expect(accordionButtons[2].ariaExpanded).toBeFalsy;
        expect(accordionButtons[0].ariaExpanded).toBeFalsy;
    })
})