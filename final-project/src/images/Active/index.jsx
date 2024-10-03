import styles from './Active.module.scss';

export default function Active() {
  return (
    <div className={styles.wrapper}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.76074 4.91309C5.9464 4.91309 4.47559 6.3839 4.47559 8.19824C4.47559 10.0126 5.9464 11.4834 7.76074 11.4834C9.57508 11.4834 11.0459 10.0126 11.0459 8.19824C11.0459 6.3839 9.57508 4.91309 7.76074 4.91309ZM0.475586 8.19824C0.475586 4.17476 3.73726 0.913086 7.76074 0.913086C11.7842 0.913086 15.0459 4.17476 15.0459 8.19824C15.0459 12.2217 11.7842 15.4834 7.76074 15.4834C3.73726 15.4834 0.475586 12.2217 0.475586 8.19824Z"
          fill="#CC1016"
        />
      </svg>
    </div>
  );
}
