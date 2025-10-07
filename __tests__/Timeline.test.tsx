import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Timeline, TimelineItem, TimelineContent } from '@/components/ui/Timeline';

describe('Timeline', () => {
  test('renders items with correct roles', () => {
    render(
      <Timeline>
        <TimelineItem title="Started" date="2024-01-01" />
        <TimelineItem title="In Progress" date="2024-03-01" />
        <TimelineItem title="Completed" date="2024-06-01" />
      </Timeline>
    );

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  test('marks current item with aria-current', () => {
    render(
      <Timeline>
        <TimelineItem title="Started" date="2024-01-01" />
        <TimelineItem title="In Progress" date="2024-03-01" current />
        <TimelineItem title="Completed" date="2024-06-01" />
      </Timeline>
    );

    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
  });

  test('keyboard navigation moves focus between items', async () => {
    const user = userEvent.setup();
    render(
      <Timeline>
        <TimelineItem title="A" />
        <TimelineItem title="B" />
        <TimelineItem title="C" />
      </Timeline>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);

    buttons[0].focus();
    expect(buttons[0]).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(buttons[1]).toHaveFocus();
    await user.keyboard('{ArrowDown}');
    expect(buttons[2]).toHaveFocus();
    await user.keyboard('{ArrowUp}');
    expect(buttons[1]).toHaveFocus();
    await user.keyboard('{Home}');
    expect(buttons[0]).toHaveFocus();
    await user.keyboard('{End}');
    expect(buttons[2]).toHaveFocus();
  });

  test('renders custom content', () => {
    render(
      <Timeline>
        <TimelineItem>
          <TimelineContent>
            <h3>Phase 1</h3>
            <p>Setup and groundwork</p>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    );

    expect(screen.getByText('Phase 1')).toBeInTheDocument();
    expect(screen.getByText('Setup and groundwork')).toBeInTheDocument();
  });
});

