// import { Html, useProgress } from '@react-three/drei'
import styles from './Loading.module.scss';

const Loader = () => {
    // const { progress } = useProgress()
    // console.log('progress', progress)
    return (<div className={styles.Loader}  >
        {/* {progress} % loaded */}
        Loading...
        </div>
    )
}

export default Loader;