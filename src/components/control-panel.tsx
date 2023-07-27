import * as React from 'react'

function ControlPanel(props: any) {
  return (
    <div className="control-panel">
      <h3>Geocoder</h3>
      <div className="source-link">
        <a
          href="https://github.com/visgl/react-map-gl/tree/7.1-release/examples/geocoder"
          target="_new"
        >
          View Code ↗
        </a>
      </div>
    </div>
  )
}

export default React.memo(ControlPanel)
