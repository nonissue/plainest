import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const LoadingBarTest = styled.div`
  .toggle-buttons {
    margin: 2em;
    color: #ccc;
    padding: 2em;
    button {
      /* background: #ff0000; */
    }
  }
`;

const StyledLoadingBar = styled.div`
  height: 10px;
  background: transparent;
  position: relative;
  top: 0;
  left: 0;

  transition: width 0.3s ease-in;

  .toggle-buttons {
    margin: 2em;
    color: #ccc;
    padding: 2em;
    button {
      background: #ff0000;
    }
  }
`;

export function LoadingBar({ demo }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function fakeLoad() {
      //   while (progress < 100) {
      setTimeout(() => {
        setProgress(30);
      }, 1000);
      setTimeout(() => {
        setProgress(70);
      }, 1500);
      setTimeout(() => {
        setProgress(99);
      }, 2000);
      setTimeout(() => {
        setProgress(100);
      }, 2200);
    }
    // }

    fakeLoad();
  }, []);

  // function finished() {
  //     setProgress(100);
  // }

  return (
    <LoadingBarTest>
      <StyledLoadingBar
        style={{
          width: `${progress}%`,
          //   visibility: `${progress >= 100 ? 'block' : 'block'}`,
          background: `${progress < 100 && '#ff0000'}`,
        }}
      ></StyledLoadingBar>
      <div className="toggle-buttons">
        {/* call setProgress func on button click and bind the callback*/}
        {/* depending on the percentageRange condition to decrease /*/}
        {/* increase in 20% range and reset the progress bar status*/}
        <button type="button" onClick={() => setProgress(progress > 0 ? progress - 20 : 0)}>
          Decrease
        </button>
        <button type="button" onClick={() => setProgress(progress < 100 ? progress + 20 : 100)}>
          Increase
        </button>
        <button type="button" onClick={() => setProgress(0)}>
          Reset
        </button>
      </div>
    </LoadingBarTest>
  );
}

export default LoadingBar;
