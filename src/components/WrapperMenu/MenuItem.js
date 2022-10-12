import { memo } from 'react';
import { useDispatch } from 'react-redux';
import discoverSlice from '~/modules/Discover/discoverSlice';

function MenuItem({ data, className }) {
    const dispatch = useDispatch();

    const handleChooseFilter = (tagname) => {
        dispatch(discoverSlice.actions.categoryFilterChange(tagname));
    };
    return (
        <span className={className} onClick={() => handleChooseFilter(data.name)}>
            {data.name}
        </span>
    );
}

export default memo(MenuItem);
