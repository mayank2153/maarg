import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Node from './Node';

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  grid-area: pageLayout;
`;

const GridNodes = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

function GridLayout({ gridStore, nodeRefs, handleMouseDown, handleMouseEnter, handleMouseUp }) {
  return (
    <GridContainer>
      <GridNodes rows={gridStore.rows} columns={gridStore.columns}>
        {gridStore.grid.flat().map((cell, index) => {
          const row = Math.floor(index / gridStore.columns);
          const col = index % gridStore.columns;
          return (
            <Node
              key={`${row}-${col}`}
              ref={(node) => (nodeRefs.current[row][col] = node)}
              cell={cell}
              handleMouseDown={handleMouseDown}
              handleMouseEnter={handleMouseEnter}
              handleMouseUp={handleMouseUp}
              colIndex={col}
              rowIndex={row}
              isAnimating={gridStore.isAnimating}
            />
          );
        })}
      </GridNodes>
    </GridContainer>
  );
}

export default observer(GridLayout);
