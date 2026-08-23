import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {MistfallLanding} from '@/components/pages/mistfall-landing';
import {ClassesPage} from '@/components/pages/classes-page';
import {GuidePage} from '@/components/pages/guide-page';
import {WeaponsPage} from '@/components/pages/weapons-page';

describe('Mistfall Hunter page templates', () => {
  it('renders the approved landing sections in order', () => {
    render(<MistfallLanding locale="en" />);
    expect(screen.getAllByTestId('landing-section').map((node) => node.id)).toEqual([
      'hero', 'stats', 'overview', 'classes', 'guides', 'builds',
      'featured-guides', 'faq', 'bottom-cta', 'footer'
    ]);
  });

  it('renders the classes article shell and localized footer', () => {
    render(<ClassesPage locale="en" content={<h2>The six classes</h2>} />);
    expect(screen.getByRole('heading', {level: 1, name: /Mistfall Hunter Classes/})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'The six classes'})).toBeInTheDocument();
    expect(screen.getByText('Choose your path through the Gyldenmist.')).toBeInTheDocument();
  });

  it('renders the weapons article shell and localized footer', () => {
    render(<WeaponsPage locale="en" content={<h2>Weapon types by class</h2>} />);
    expect(screen.getByRole('heading', {level: 1, name: /Mistfall Hunter Weapons/})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Weapon types by class'})).toBeInTheDocument();
    expect(screen.getByText('Choose your path through the Gyldenmist.')).toBeInTheDocument();
  });

  it('renders guide metadata, contents, recommendation and related content', () => {
    render(<GuidePage locale="en" content={<h2>Final recommendation</h2>} />);
    expect(screen.getByText('Updated August 12, 2026')).toBeInTheDocument();
    expect(screen.getByRole('navigation', {name: 'Table of contents'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Final recommendation'})).toBeInTheDocument();
    expect(screen.getByText('Related content')).toBeInTheDocument();
  });
});
