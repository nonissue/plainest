import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { motion, useInvertedScale, useMotionValue } from 'framer-motion';

const StyledMasonryLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  .item {
    position: relative;
    padding: 25px;
    box-sizing: border-box;
    flex: 0 0 40%;
    max-width: 40%;
    box-sizing: border-box;
  }

  .item:nth-child(4n + 1),
  .item:nth-child(4n + 4) {
    flex: 0 0 60%;
    max-width: 60%;
  }

  .item:nth-child(4n + 1),
  .item:nth-child(4n + 4) {
    flex: 0 0 60%;
    max-width: 60%;
  }

  .item:nth-child(odd) {
    padding-left: 0;
  }

  .item:nth-child(even) {
    padding-right: 0;
  }
`;

export const MasonryLayout = props => {
  const columnWrapper = {};
  const result = [];

  // create columns
  for (let i = 0; i < props.columns; i += 1) {
    columnWrapper[`column${i}`] = [];
  }

  // divide children into columns
  for (let i = 0; i < props.children.length; i += 1) {
    const columnIndex = i % props.columns;
    columnWrapper[`column${columnIndex}`].push(
      <div style={{ marginBottom: `${props.gap}px` }}>{props.children[i]}</div>,
    );
  }

  // wrap children in each column with a div
  for (let i = 0; i < props.columns; i += 1) {
    result.push(
      <div
        className="item"
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`,
          flex: 1,
        }}
      >
        {columnWrapper[`column${i}`]}
      </div>,
    );
  }

  return <StyledMasonryLayout>{result}</StyledMasonryLayout>;
};

MasonryLayout.propTypes = {
  columns: PropTypes.number,
  gap: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

MasonryLayout.defaultProps = {
  columns: 2,
  gap: 20,
};

export default MasonryLayout;
