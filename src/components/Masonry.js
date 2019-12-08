import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { motion, useInvertedScale, useMotionValue } from 'framer-motion';

const MasonryLayout = props => {
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
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`,
          flex: 1,
        }}
      >
        {columnWrapper[`column${i}`]}
      </div>,
    );
  }

  return <div style={{ display: 'flex' }}>{result}</div>;
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
