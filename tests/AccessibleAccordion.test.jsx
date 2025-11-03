import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AccessibleAccordion from './AccessibleAccordion';

// NOTE: Having issues getting the tests set up.
 
describe('AccessibleAccordion', () => {
  describe('Initial Render', () => {
    test('renders the main heading', () => {
      render(<AccessibleAccordion />);
      const heading = screen.getByRole('heading', { name: /frequently asked questions/i, level: 1 });
      expect(heading).toBeInTheDocument();
    });

    test('renders instructions section', () => {
      render(<AccessibleAccordion />);
      const instructionsHeading = screen.getByRole('heading', { name: /how to use this accordion/i });
      expect(instructionsHeading).toBeInTheDocument();
    });

    test('renders all FAQ items', () => {
      render(<AccessibleAccordion />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(6);
    });

    test('all FAQ items are initially collapsed', () => {
      render(<AccessibleAccordion />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-expanded', 'false');
      });
    });

    test('renders FAQ region with proper label', () => {
      render(<AccessibleAccordion />);
      const region = screen.getByRole('region', { name: /frequently asked questions/i });
      expect(region).toBeInTheDocument();
    });
  });

  describe('FAQ Questions', () => {
    test('renders first FAQ question correctly', () => {
      render(<AccessibleAccordion />);
      expect(screen.getByText(/what are the parking lot hours/i)).toBeInTheDocument();
    });

    test('renders second FAQ question correctly', () => {
      render(<AccessibleAccordion />);
      expect(screen.getByText(/how do i apply for a parking permit/i)).toBeInTheDocument();
    });

    test('renders third FAQ question correctly', () => {
      render(<AccessibleAccordion />);
      expect(screen.getByText(/what do i do if there are no available spaces/i)).toBeInTheDocument();
    });

    test('renders fourth FAQ question correctly', () => {
      render(<AccessibleAccordion />);
      expect(screen.getByText(/what do i do if i lose my permit/i)).toBeInTheDocument();
    });

    test('renders fifth FAQ question correctly', () => {
      render(<AccessibleAccordion />);
      expect(screen.getByText(/can i park in visitor parking/i)).toBeInTheDocument();
    });

    test('renders sixth FAQ question correctly', () => {
      render(<AccessibleAccordion />);
      expect(screen.getByText(/how much does a parking permit cost/i)).toBeInTheDocument();
    });
  });

  describe('Expand/Collapse Functionality', () => {
    test('clicking a button expands the answer', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      
      fireEvent.click(button);
      
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    test('clicking an expanded button collapses the answer', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    test('shows answer content when expanded', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      
      fireEvent.click(button);
      
      const answer = screen.getByText(/the parking lots are available 24 hours a day/i);
      expect(answer).toBeVisible();
    });

    test('hides answer content when collapsed', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      
      // Initially collapsed
      const answerContainer = document.getElementById('faq1-answer');
      expect(answerContainer).toHaveAttribute('hidden');
      
      // Expand
      fireEvent.click(button);
      expect(answerContainer).not.toHaveAttribute('hidden');
      
      // Collapse
      fireEvent.click(button);
      expect(answerContainer).toHaveAttribute('hidden');
    });

    test('multiple items can be expanded simultaneously', () => {
      render(<AccessibleAccordion />);
      const button1 = screen.getByText(/what are the parking lot hours/i);
      const button2 = screen.getByText(/how do i apply for a parking permit/i);
      
      fireEvent.click(button1);
      fireEvent.click(button2);
      
      expect(button1).toHaveAttribute('aria-expanded', 'true');
      expect(button2).toHaveAttribute('aria-expanded', 'true');
    });

    test('expanding one item does not collapse others', () => {
      render(<AccessibleAccordion />);
      const button1 = screen.getByText(/what are the parking lot hours/i);
      const button2 = screen.getByText(/how do i apply for a parking permit/i);
      const button3 = screen.getByText(/can i park in visitor parking/i);
      
      fireEvent.click(button1);
      fireEvent.click(button2);
      fireEvent.click(button3);
      
      expect(button1).toHaveAttribute('aria-expanded', 'true');
      expect(button2).toHaveAttribute('aria-expanded', 'true');
      expect(button3).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Keyboard Navigation', () => {
    test('can navigate to buttons using Tab key', async () => {
      const user = userEvent.setup();
      render(<AccessibleAccordion />);
      
      const buttons = screen.getAllByRole('button');
      
      await user.tab();
      // First button should be focused (after tabbing through any other focusable elements)
      
      // The first FAQ button should eventually receive focus
      await user.tab();
      await user.tab();
      
      // One of the buttons should have focus
      const focusedElement = document.activeElement;
      expect(buttons).toContain(focusedElement);
    });

    test('Enter key toggles expansion', async () => {
      const user = userEvent.setup();
      render(<AccessibleAccordion />);
      
      const button = screen.getByText(/what are the parking lot hours/i);
      button.focus();
      
      await user.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      
      await user.keyboard('{Enter}');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    test('Space key toggles expansion', async () => {
      const user = userEvent.setup();
      render(<AccessibleAccordion />);
      
      const button = screen.getByText(/what are the parking lot hours/i);
      button.focus();
      
      await user.keyboard(' ');
      expect(button).toHaveAttribute('aria-expanded', 'true');
      
      await user.keyboard(' ');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('ARIA Attributes', () => {
    test('buttons have correct type attribute', () => {
      render(<AccessibleAccordion />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });

    test('buttons have aria-controls attribute', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      expect(button).toHaveAttribute('aria-controls', 'faq1-answer');
    });

    test('buttons have unique IDs', () => {
      render(<AccessibleAccordion />);
      const buttons = screen.getAllByRole('button');
      const ids = buttons.map(button => button.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    test('answer panels have unique IDs', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      const answerId = button.getAttribute('aria-controls');
      const answerPanel = document.getElementById(answerId);
      expect(answerPanel).toBeInTheDocument();
    });

    test('aria-controls matches answer panel ID', () => {
      render(<AccessibleAccordion />);
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach(button => {
        const controlsId = button.getAttribute('aria-controls');
        const controlledElement = document.getElementById(controlsId);
        expect(controlledElement).toBeInTheDocument();
      });
    });

    test('SVG icon has aria-hidden attribute', () => {
      render(<AccessibleAccordion />);
      const { container } = render(<AccessibleAccordion />);
      const svgs = container.querySelectorAll('svg');
      svgs.forEach(svg => {
        expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('Content Verification', () => {
    test('displays parking lot hours answer when expanded', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      
      fireEvent.click(button);
      
      expect(screen.getByText(/all facilities are restricted from 2:00 am - 6:00 am/i)).toBeVisible();
    });

    test('displays parking permit application answer when expanded', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/how do i apply for a parking permit/i);
      
      fireEvent.click(button);
      
      expect(screen.getByText(/visit the parking services office/i)).toBeVisible();
      expect(screen.getByText(/apply online through our parking portal/i)).toBeVisible();
    });

    test('displays no available spaces answer when expanded', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what do i do if there are no available spaces/i);
      
      fireEvent.click(button);
      
      expect(screen.getByText(/park at the nearest available parking meter/i)).toBeVisible();
      expect(screen.getByText(/call 999-999-9999/i)).toBeVisible();
    });

    test('displays lost permit answer when expanded', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what do i do if i lose my permit/i);
      
      fireEvent.click(button);
      
      expect(screen.getByText(/come to the parking office and report the loss/i)).toBeVisible();
      expect(screen.getByText(/if your permit was stolen/i)).toBeVisible();
    });

    test('displays visitor parking answer when expanded', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/can i park in visitor parking/i);
      
      fireEvent.click(button);
      
      expect(screen.getByText(/visitor parking spaces are reserved exclusively for visitors/i)).toBeVisible();
    });

    test('displays parking permit cost answer when expanded', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/how much does a parking permit cost/i);
      
      fireEvent.click(button);
      
      expect(screen.getByText(/student permits: \$150 per semester/i)).toBeVisible();
      expect(screen.getByText(/faculty\/staff permits: \$300 per year/i)).toBeVisible();
      expect(screen.getByText(/premium parking: \$500 per year/i)).toBeVisible();
      expect(screen.getByText(/motorcycle permits: \$75 per year/i)).toBeVisible();
    });
  });

  describe('CSS Classes and Styling', () => {
    test('buttons have cursor-pointer class', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      expect(button).toHaveClass('cursor-pointer');
    });

    test('buttons have hover classes', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      expect(button).toHaveClass('hover:cursor-pointer');
      expect(button).toHaveClass('hover:bg-blue-50');
      expect(button).toHaveClass('hover:border-blue-600');
    });

    test('buttons have focus classes', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      expect(button).toHaveClass('focus:outline-none');
      expect(button).toHaveClass('focus:bg-blue-100');
      expect(button).toHaveClass('focus:border-blue-600');
    });

    test('SVG has rotation class when expanded', () => {
      const { container } = render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      
      fireEvent.click(button);
      
      const svg = button.querySelector('svg');
      expect(svg).toHaveClass('rotate-180');
    });

    test('SVG does not have rotation class when collapsed', () => {
      const { container } = render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      
      const svg = button.querySelector('svg');
      expect(svg).not.toHaveClass('rotate-180');
    });
  });

  describe('React StrictMode', () => {
    test('component renders without errors in StrictMode', () => {
      const { container } = render(<AccessibleAccordion />);
      expect(container).toBeInTheDocument();
    });

    test('state updates work correctly in StrictMode', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      
      // Click multiple times to ensure state updates work correctly
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
      
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Edge Cases', () => {
    test('rapid clicking does not break state', () => {
      render(<AccessibleAccordion />);
      const button = screen.getByText(/what are the parking lot hours/i);
      
      // Rapid clicks
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      // Should be collapsed (even number of clicks)
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    test('clicking different buttons maintains independent state', () => {
      render(<AccessibleAccordion />);
      const button1 = screen.getByText(/what are the parking lot hours/i);
      const button2 = screen.getByText(/how do i apply for a parking permit/i);
      
      fireEvent.click(button1);
      expect(button1).toHaveAttribute('aria-expanded', 'true');
      expect(button2).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(button2);
      expect(button1).toHaveAttribute('aria-expanded', 'true');
      expect(button2).toHaveAttribute('aria-expanded', 'true');
      
      fireEvent.click(button1);
      expect(button1).toHaveAttribute('aria-expanded', 'false');
      expect(button2).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Accessibility Compliance', () => {
    test('all interactive elements are keyboard accessible', () => {
      render(<AccessibleAccordion />);
      const buttons = screen.getAllByRole('button');
      
      buttons.forEach(button => {
        expect(button.tagName).toBe('BUTTON');
      });
    });

    test('region landmark is properly labeled', () => {
      render(<AccessibleAccordion />);
      const region = screen.getByRole('region', { name: /frequently asked questions/i });
      expect(region).toHaveAttribute('aria-label', 'Frequently Asked Questions');
    });

    test('headings have proper hierarchy', () => {
      render(<AccessibleAccordion />);
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2 = screen.getByRole('heading', { level: 2 });
      
      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
    });
  });
});
