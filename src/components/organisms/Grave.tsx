import React from 'react'

import MemorialFrame from '@zgd/images/zeaframewiggle1.gif'

export const Grave = (): JSX.Element => (
  <>
    <div className="graveBG">
      <div className="graveContents">
        <div className="topMemorialTitle">
          IN LOVING MEMORY OF <br />
          ZEA CORNELIA <br />
        </div>
        <img src={MemorialFrame} className="frame" /> <br />
        <div className="bottomMemorialTitle">2019 - 2023</div>
      </div>
    </div>
  </>
)
