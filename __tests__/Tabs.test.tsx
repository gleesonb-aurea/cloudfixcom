import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';

describe('Tabs', () => {
  test('renders tabs and shows default content', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab One</TabsTrigger>
          <TabsTrigger value="tab2">Tab Two</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content One</TabsContent>
        <TabsContent value="tab2">Content Two</TabsContent>
      </Tabs>
    );

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    const tab1 = screen.getByRole('tab', { name: 'Tab One' });
    const panel1 = screen.getByRole('tabpanel', { name: 'Tab One' });
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(panel1).toBeVisible();
    expect(screen.queryByText('Content Two')).not.toBeVisible();
  });

  test('clicking a tab activates its panel', async () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab One</TabsTrigger>
          <TabsTrigger value="tab2">Tab Two</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content One</TabsContent>
        <TabsContent value="tab2">Content Two</TabsContent>
      </Tabs>
    );

    const tab2 = screen.getByRole('tab', { name: 'Tab Two' });
    fireEvent.click(tab2);
    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Tab Two' })).toBeVisible();
  });

  test('keyboard navigation moves focus and activates on Enter/Space', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab One</TabsTrigger>
          <TabsTrigger value="tab2">Tab Two</TabsTrigger>
          <TabsTrigger value="tab3">Tab Three</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content One</TabsContent>
        <TabsContent value="tab2">Content Two</TabsContent>
        <TabsContent value="tab3">Content Three</TabsContent>
      </Tabs>
    );

    const tab1 = screen.getByRole('tab', { name: 'Tab One' });
    const tab2 = screen.getByRole('tab', { name: 'Tab Two' });
    const tab3 = screen.getByRole('tab', { name: 'Tab Three' });

    tab1.focus();
    expect(tab1).toHaveFocus();

    // ArrowRight moves focus to tab2
    await user.keyboard('{ArrowRight}');
    expect(tab2).toHaveFocus();

    // Enter activates tab2
    await user.keyboard('{Enter}');
    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Tab Two' })).toBeVisible();

    // ArrowRight to tab3 then Space activates
    await user.keyboard('{ArrowRight}');
    expect(tab3).toHaveFocus();
    await user.keyboard(' ');
    expect(tab3).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Tab Three' })).toBeVisible();

    // Home key focuses first, End focuses last
    await user.keyboard('{Home}');
    expect(tab1).toHaveFocus();
    await user.keyboard('{End}');
    expect(tab3).toHaveFocus();
  });

  test('controlled value works with onValueChange', () => {
    function Wrapper() {
      const [value, setValue] = React.useState('tab1');
      return (
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="tab1">Tab One</TabsTrigger>
            <TabsTrigger value="tab2">Tab Two</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content One</TabsContent>
          <TabsContent value="tab2">Content Two</TabsContent>
        </Tabs>
      );
    }

    render(<Wrapper />);
    const tab2 = screen.getByRole('tab', { name: 'Tab Two' });
    fireEvent.click(tab2);
    expect(tab2).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Tab Two' })).toBeVisible();
  });
});
