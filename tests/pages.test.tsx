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
      'hero', 'overview', 'classes', 'guides', 'builds',
      'featured-guides', 'faq', 'bottom-cta', 'footer'
    ]);
  });

  it('renders a dedicated image with accurate alt text for all six class cards', () => {
    render(<MistfallLanding locale="en" />);
    const expectedImages = [
      ['Mistfall Hunter Mercenary class', 'mercenary.webp'],
      ['Mistfall Hunter Sorcerer class', 'sorcerer.webp'],
      ['Mistfall Hunter Blackarrow class', 'blackarrow.webp'],
      ['Mistfall Hunter Shadowstrix class', 'shadowstrix.webp'],
      ['Mistfall Hunter Seer class', 'seer.webp'],
      ['Mistfall Hunter Withered Knight class', 'withered-knight.webp']
    ] as const;

    for (const [alt, filename] of expectedImages) {
      expect(screen.getByRole('img', {name: alt})).toHaveAttribute('src', expect.stringContaining(filename));
    }
  });

  it('links every class card to its localized class section', () => {
    const classes = [
      ['Mercenary', 'mercenary'],
      ['Sorcerer', 'sorcerer'],
      ['Blackarrow', 'blackarrow'],
      ['Shadowstrix', 'shadowstrix'],
      ['Seer', 'seer'],
      ['Withered Knight', 'withered-knight']
    ] as const;
    const {unmount} = render(<MistfallLanding locale="en" />);

    for (const [name, anchor] of classes) {
      expect(screen.getByRole('img', {name: `Mistfall Hunter ${name} class`}).closest('a'))
        .toHaveAttribute('href', `/mistfall-hunter/classes#${anchor}`);
    }

    unmount();
    render(<MistfallLanding locale="zh-CN" />);

    for (const [name, anchor] of classes) {
      expect(screen.getByRole('img', {name: `Mistfall Hunter ${name} class`}).closest('a'))
        .toHaveAttribute('href', `/zh-CN/mistfall-hunter/classes#${anchor}`);
    }
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
    render(<GuidePage locale="en" slug="best-class" title="Mistfall Hunter Best Class" description="Class guide" updated="2026-08-12" content={<h2>Final recommendation</h2>} />);
    expect(screen.getByText('Updated August 12, 2026')).toBeInTheDocument();
    expect(screen.getByRole('navigation', {name: 'Table of contents'})).toBeInTheDocument();
    expect(screen.getByRole('heading', {name: 'Final recommendation'})).toBeInTheDocument();
    expect(screen.getByText('Related content')).toBeInTheDocument();
  });

  it('renders the beginner guide shell without best-class copy', () => {
    render(<GuidePage locale="en" slug="beginner-guide" title="SEO title" description="SEO description" updated="2026-08-24" content={<h2>What Is Mistfall Hunter?</h2>} />);
    expect(screen.getByRole('heading', {level: 1, name: 'Mistfall Hunter Beginner Guide: Survive Your First Runs'})).toBeInTheDocument();
    expect(screen.getByText('Updated August 24, 2026')).toBeInTheDocument();
    expect(screen.queryByText('Mistfall Hunter Best Class')).not.toBeInTheDocument();
  });
});
