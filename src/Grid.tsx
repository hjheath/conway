import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss'
import tick from './game-of-life'
import './Grid.css';

type CellProps = {
  alive: boolean;
  size: number;
  toggle: () => void;
};

const useCellStyles = createUseStyles({
  Cell: (props: CellProps) => ({
    outline: "solid 1px black",
    height: `${props.size}vw`,
  })
});

const Cell = (props: CellProps) => {
  const classes = useCellStyles(props)
  const aliveClass = props.alive ? "Alive" : "Dead"
  return (
    <div className={`${classes.Cell} ${aliveClass}`} onClick={() => props.toggle()}></div>
  )
}

function populateGrid (
  columnCount: number,
  rowCount: number,
  cellSize: number,
  aliveCells: Set<string>,
  toggle: (coordinates: string) => void) {

    const cells = [];

    for(let y = 0; y < rowCount; y++) {
      for(let x = 0; x < columnCount; x++) {
        const coordinates = `${x},${y}`
        const alive = aliveCells.has(coordinates)
        const toggleCallback = () => toggle(coordinates)
        cells.push(<Cell key={`${x},${y}`} size={cellSize} alive={alive} toggle={toggleCallback}/>);
      }
    }
    return cells;
  }

const useGridStyles = createUseStyles({
  Grid: (params: {rowCount: number; columnCount: number; gridScale: number}) => {
    const padding = 100 * (1 - params.gridScale) / 2
    const styles = {
      display: "grid",
      margin: "auto",
      padding: `2vw ${padding}vw`,
      gridTemplateColumns: `repeat(${params.columnCount}, 1fr)`,
      gridTemplateRows: `repeat(${params.rowCount}, 1fr)`,
    }
    return styles
  }
});

const useCellState = (initAliveCells: Set<string>, playing: boolean): [Set<string>, (coordinates: string) => void, () => void] => {
  const [aliveCells, setAliveCells] = useState(initAliveCells);

  const toggle = (coordinates: string) => {
    if(playing) return
    const newCells = new Set(aliveCells)
    newCells.has(coordinates) ? newCells.delete(coordinates) : newCells.add(coordinates)
    setAliveCells(newCells)
  }

  const play = () => {
    const newCells = tick(aliveCells)
    setAliveCells(newCells)
  }

  return [aliveCells, toggle, play];
}


interface GridProps {initialAliveCells: Set<string>; playing: boolean}

const Grid = (props: GridProps) => {
  const gridScale = 0.8;
  const cellScale = 25;

  const rowCount = Math.floor(window.innerHeight * (gridScale - 0.1) / cellScale);
  const columnCount = Math.floor(window.innerWidth * gridScale / cellScale);
  const cellSize = gridScale * 100 / columnCount;

  const [aliveCells, toggle, play] = useCellState(props.initialAliveCells, props.playing)

  useEffect(() => {
    if (props.playing) {
      const timer = setTimeout(play, 200);
      return () => clearTimeout(timer);
    }
  });

  const classes = useGridStyles({rowCount, columnCount, gridScale});

  return (
    <div className={classes.Grid}>
      {populateGrid(columnCount, rowCount, cellSize, aliveCells, toggle)}
    </div>
  );
}

export default Grid;
