import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '集約',
    imageSrc: require('@site/static/img/computer_switching_hub.png').default,
    description: (
      <>
        ローカルLLMに関する知識を集約します
      </>
    ),
  },
  {
    title: '共有',
    imageSrc: require('@site/static/img/business_jouhou_koukan.png').default,
    description: (
      <>
        得た知見はコミュニティに共有します
      </>
    ),
  },
  {
    title: '頑張る',
    imageSrc: require('@site/static/img/pose_gutspose_couple.png').default,
    description: (
      <>
        頑張ります
      </>
    ),
  },
];

function Feature({imageSrc, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={imageSrc} className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}