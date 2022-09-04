import { useState } from 'react';
import styles from './Image.module.scss';
import images from '~/assets/images';
import classNames from 'classnames';

function Image({ src, alt, className, fallback: customFallback = images.noImage, ...props }) {
    const [fallback, setFallback] = useState();

    const handleError = () => {
        setFallback(customFallback);
    };

    return (
        <img
            className={classNames(styles.wrapper, className)}
            {...props}
            src={fallback || src}
            alt={alt}
            onError={handleError}
        />
    );
}

export default Image;
