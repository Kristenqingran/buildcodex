import {render, screen, within} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {NotFoundPage, notFoundMetadata} from '@/components/not-found-page';

describe('branded 404', () => {
  it('is noindex and links Chinese users only to valid routes or anchors', () => {
    expect(notFoundMetadata.robots).toEqual({index: false, follow: false});
    render(<NotFoundPage locale="zh-CN" />);
    expect(screen.getByRole('heading', {name: '迷雾中没有这条路。'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: '返回游戏首页'})).toHaveAttribute(
      'href', '/zh-CN/mistfall-hunter/'
    );
    const related = screen.getByRole('navigation', {name: '相关入口'});
    expect(within(related).getByRole('link', {name: /^配装/})).toHaveAttribute(
      'href', '/zh-CN/mistfall-hunter/builds/'
    );
  });
});
