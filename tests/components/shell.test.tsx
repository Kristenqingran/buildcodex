import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {SiteHeader} from '@/components/site-header';
import {SiteFooter} from '@/components/site-footer';

describe('localized site shell', () => {
  it('renders two navigation tiers without dead category routes', () => {
    render(<SiteHeader locale="en" pathname="/mistfall-hunter/classes/" />);
    expect(screen.getAllByRole('navigation')).toHaveLength(2);
    expect(screen.getByRole('link', {name: 'Best Class'})).toHaveAttribute(
      'href', '/mistfall-hunter/guides/best-class/'
    );
    expect(screen.getByRole('link', {name: 'Builds'})).toHaveAttribute(
      'href', '/mistfall-hunter/builds/'
    );
  });

  it('switches locale while preserving the semantic path', () => {
    render(<SiteHeader locale="en" pathname="/mistfall-hunter/classes/" />);
    expect(screen.getByRole('link', {name: '简体中文'})).toHaveAttribute(
      'href', '/zh-CN/mistfall-hunter/classes/'
    );
  });

  it('localizes the footer and keeps valid destinations', () => {
    render(<SiteFooter locale="zh-CN" />);
    expect(screen.getByText('在金雾中选择你的道路。')).toBeInTheDocument();
    expect(screen.getByRole('link', {name: '职业'})).toHaveAttribute(
      'href', '/zh-CN/mistfall-hunter/classes/'
    );
  });
});
