import React, { Component, useEffect, useState } from 'react'
import '../styles/App.css'

const App = () => {
  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorking, setIsWorking] = useState(true)
  const [timeLeft, setTimeLeft] = useState(workDuration * 60)

  useEffect(() => {
    let timer
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsWorking((prev) => !prev)
      if (isWorking) {
        setTimeLeft(breakDuration * 60)
        alert('Break time is over!')
      } else {
        setTimeLeft(workDuration * 60)
        alert('Time to work!')
      }
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isRunning, timeLeft, isWorking, workDuration, breakDuration])
  const startTimer = () => {
    setIsRunning(true)
  }
  const stopTimer = () => {
    setIsRunning(false)
  }
  const resetTimer = () => {
    setIsRunning(false)
    setIsWorking(true)
    setTimeLeft(workDuration * 60)
    setWorkDuration(25)
    setBreakDuration(5)
  }
  const handleWorkDuration = (e) => {
    const value = parseInt(e.target.value)
    setWorkDuration(value > 0 ? value : 1)
  }
  const handleBreakDuration = (e) => {
    const value = parseInt(e.target.value)
    setBreakDuration(value > 0 ? value : 1)
  }
  const handleSetDuration = () => {
    if (workDuration === 0 && breakDuration === 0) {
      setWorkDuration(25)
      setBreakDuration(5)
      setTimeLeft(25 * 60)
      alert('Work duration and break duration cannot be 0 simultaneously')
    } else {
      setTimeLeft(isWorking ? workDuration * 60 : breakDuration * 60)
    }
  }
  return (
    <div id="main">
      {isWorking ? (
        <h2>
          Work-Time: {Math.floor(timeLeft / 60)}:
          {('0' + (timeLeft % 60)).slice(-2)}
        </h2>
      ) : (
        <h2>
          Break-Time: {Math.floor(timeLeft / 60)}:
          {('0' + (timeLeft % 60)).slice(-2)}
        </h2>
      )}

      <button data-testid="start-btn" onClick={startTimer} disabled={isRunning}>
        Start
      </button>
      <button data-testid="stop-btn" onClick={stopTimer} disabled={!isRunning}>
        Stop
      </button>
      <button data-testid="reset-btn" onClick={resetTimer}>
        Reset
      </button>
      <br />
      <label for="work">Work:</label>
      <input
        type="number"
        data-testid="work-duration"
        id="work"
        min={0}
        value={workDuration}
        onChange={handleWorkDuration}
      />
      <label for="break">Break:</label>
      <input
        type="number"
        data-testid="break-duration"
        id="break"
        min={0}
        value={breakDuration}
        onChange={handleBreakDuration}
      />
      <br />
      <button data-testid="set-btn" onClick={handleSetDuration}>
        Set
      </button>
    </div>
  )
}

export default App
