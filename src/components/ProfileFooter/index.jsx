import styles from './ProfileFooter.module.scss';




export default function ProfileFooter(){
    return(
        <>
        <div className={styles.container}>
        <div className={styles.footerGridContainer}>
        <ul className={styles.firstColumn}>
            <li>Common information</li>
            <li>Policy for the professional community</li>
            <li>Confidentional and conditions</li>
            <li>Sales solution</li>
            <li>Security Hub</li>
        </ul>
        <ul className={styles.secondColumn}>
            <li>Availability</li>
            <li>Career</li>
            <li>Advertising settings</li>
            <li>Mobile Phone</li>
        </ul>
        <ul className={styles.thirdColumn}>
            <li>Hiring decision</li>
            <li>Marketing solutions</li>
            <li>Advertising solutions</li>
            <li>Small business</li>
        </ul>
        <ul className={styles.fourthColumn}>
            <li>Questions?
                <span>Visit our help center</span>
            </li>
            <li>Account management and privacy
                <span>Go to settings</span>
            </li>
            <li>Transparency of recommendations
                <span>Learn more about recommended content</span>
            </li>
        </ul>
        </div>
        <p className='highlight '>
            <a href="/registration">Реєстрація профіля</a>
        </p>
        <p>LinkedIn Corporation © 2024</p>
        </div>
        </>
        
    )
}