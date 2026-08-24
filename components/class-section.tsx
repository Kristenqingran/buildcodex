import type {ReactNode} from 'react';
import styles from './class-section.module.css';

type ClassSectionProps = {
  name: string;
  weapons: string;
  children: ReactNode;
};

function sectionId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function ClassSection({name, weapons, children}: ClassSectionProps) {
  return (
    <section className={styles.section} aria-labelledby={sectionId(name)}>
      <header className={styles.header}>
        <h3 className={styles.title} id={sectionId(name)}>{name}</h3>
        <p className={styles.weapons}>{weapons}</p>
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
