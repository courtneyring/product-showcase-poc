'use client';

import { useState } from "react";
import styles from './Overlay.module.scss';
// import { imagePath } from "@/utils/imagePrefix";

const Overlay = ({ children, closeFn, hideClose, background }) => {
    const [fadeOut, setFadeOut] = useState(false)

    const close = () => {
        setFadeOut(true)
        setTimeout(() => {
            closeFn()
        }, 500)
    }

    return (
        <div className={styles.overlay}>
            <div className={styles['overlay-container']}>
            </div>
            <div className={`${styles['overlay-dialog']} ${fadeOut ? styles.fadeOut : styles.fadeIn}`}>
                {!hideClose && <div className={styles['overlay-button']} onClick={close} >
                    <img className={styles.Overlay__close} src='/close-icon.svg' />
                </div>}
                {children}
            </div>

        </div>

    )
}

export default Overlay;