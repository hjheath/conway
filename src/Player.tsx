import React from 'react';
import './Player.css';

const Pause = (props: {onClick: () => void}) => {
  return (
    <svg className="button" viewBox="0 0 60 60" onClick={props.onClick}>
      <polygon points="0,0 15,0 15,60 0,60" />
      <polygon points="25,0 40,0 40,60 25,60" />
    </svg>
  )
}

const Play = (props: {onClick: () => void}) => {
  return (
    <svg className="button" viewBox="0 0 60 60" onClick={props.onClick}>
      <polygon points="0,0 50,30 0,60" />
    </svg>
  )
}

interface PlayerProps { playing: boolean; togglePlay: () => void }

const Player = (props: PlayerProps) => {
  return (
    <div>
      { props.playing ? <Pause onClick={props.togglePlay}/> : <Play onClick={props.togglePlay}/> }
    </div>
  )
}

export default Player
