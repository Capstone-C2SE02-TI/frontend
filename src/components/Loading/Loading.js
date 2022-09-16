import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import LoadingGif from 'assets/images/loading.gif';

// import { ListPost } from "";
const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />;


function Loading ({ align = 'center', cover = 'inline', style }) {
    return (
        <div
            style={{
                ...style,
            }}
            className={`loading text-${align} cover-${cover ? cover : 'content'}`}
        >
            <img
                src={LoadingGif}
                alt={'loading'}
                style={{ borderRadius: '50%', width: '150px', objectFit: 'cover' }}
            ></img>
        </div>
    );
};

export default Loading;
