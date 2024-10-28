import styles from './HotspotDetail.module.scss';

const HotspotDetail = ({hotspot}) => {
    return (
        <div className={styles.HotspotDetail}>
            <div className={styles.HotspotDetail__content}>
                <h1>{hotspot.title}</h1>
                <p dangerouslySetInnerHTML={{__html: hotspot.body}}></p>
            </div>
            
            <img className={styles.HotspotDetail__image} src={hotspot.image}/>
        </div>
    );
}

export default HotspotDetail;