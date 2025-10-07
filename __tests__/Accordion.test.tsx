import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';

describe('Accordion', () => {
  test('renders items closed by default and toggles on click', () => {
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Section B</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.queryByText('Content A')).not.toBeVisible();
    expect(screen.queryByText('Content B')).not.toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Section A' }));
    expect(screen.getByText('Content A')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Section A' }));
    expect(screen.queryByText('Content A')).not.toBeVisible();
  });

  test('single mode: opening one closes another', () => {
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Section B</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Section A' }));
    expect(screen.getByText('Content A')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Section B' }));
    expect(screen.getByText('Content B')).toBeVisible();
    expect(screen.queryByText('Content A')).not.toBeVisible();
  });

  test('multiple mode: supports multiple sections open', () => {
    render(
      <Accordion multiple>
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Section B</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const a = screen.getByRole('button', { name: 'Section A' });
    const b = screen.getByRole('button', { name: 'Section B' });
    fireEvent.click(a);
    fireEvent.click(b);
    expect(screen.getByText('Content A')).toBeVisible();
    expect(screen.getByText('Content B')).toBeVisible();
  });

  test('keyboard navigation and activation', async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Section B</AccordionTrigger>
          <AccordionContent>Content B</AccordionContent>
        </AccordionItem>
        <AccordionItem value="c">
          <AccordionTrigger>Section C</AccordionTrigger>
          <AccordionContent>Content C</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const a = screen.getByRole('button', { name: 'Section A' });
    const b = screen.getByRole('button', { name: 'Section B' });
    const c = screen.getByRole('button', { name: 'Section C' });

    a.focus();
    expect(a).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(b).toHaveFocus();
    await user.keyboard('{End}');
    expect(c).toHaveFocus();
    await user.keyboard('{Home}');
    expect(a).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Content A')).toBeVisible();
    await user.keyboard(' ');
    expect(screen.queryByText('Content A')).not.toBeVisible();
  });

  test('aria attributes are set correctly', () => {
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Content A</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByRole('button', { name: 'Section A' });
    const region = screen.getByRole('region', { hidden: true });
    expect(trigger).toHaveAttribute('aria-controls');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(region).toHaveAttribute('aria-labelledby');
  });
});
