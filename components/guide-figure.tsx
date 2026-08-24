import Image from 'next/image';
import styles from './guide-figure.module.css';

export function GuideFigure({src, alt, caption, width, height}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}) {
  return (
    <figure className={styles.figure}>
      <Image
        className={styles.image}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 860px) calc(100vw - 28px), 820px"
        unoptimized
      />
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}
