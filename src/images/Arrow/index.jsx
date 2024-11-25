import styles from './Arrow.module.scss';

export default function index() {
  return (
    <div className={styles.wrapper}>
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.367015 1.30089L4.78265 5.71696C4.86075 5.79507 4.98739 5.79508 5.0655 5.71697L9.48158 1.30089C9.60757 1.1749 9.51834 0.959473 9.34016 0.959473H0.508444C0.330268 0.959473 0.241032 1.17489 0.367015 1.30089Z"
          fill="#666666"
        />
      </svg>
    </div>
  );
}
