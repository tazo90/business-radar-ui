import React, { forwardRef, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FixedSizeList as List } from 'react-window';
import styled from 'styled-components';

import StoreListRow from './store-list-row';

const ListWrapper = styled(List)`
  border-top: 1px solid #4a4a4a;
`;

const NoResults = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
`;

const RowWrapper = styled.div`
  pointer-events: auto;
  margin-top: 10px;
`;

function StoreList({ selectedStoreId, stores }, ref) {
  if (!stores) return null;
  if (stores.length === 0) {
    return <NoResults>No results</NoResults>;
  }

  // const navigate = useNavigate();

  const onLocationClick = useCallback((location) => {
    const { id, name } = location.properties;
    const slugName = name.toLowerCase().split(' ').join('-');

    const locationLink = `/stores/${id}/${slugName}`;
    // navigate(locationLink)
  }, []);

  const Row = useCallback(({ data, index, style }) => {
    const item = stores[index];
    const isActive = data.selectedStoreId === item.properties.id;

    return (
      <RowWrapper
        key={index}
        onClick={() => onLocationClick(item)}
        style={style}
      >
        <StoreListRow 
          key={index} 
          store={item.properties} 
          isActive={isActive} 
        />
      </RowWrapper>
    );
  }, [stores]);

  return (
    <List 
      className="border-solid border-2 border-indigo-600"
      ref={ref}
      itemCount={stores.length}
      itemSize={183}
      width="50%"
      height={760}
      itemData={{ selectedStoreId }}
    >
      {Row}
    </List>
  );
};

export default forwardRef(StoreList);
