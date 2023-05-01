import React from 'react'

import kernelRotate from '@zgd/images/gifts/3dp_kernel.gif'

type ItemProps = {
  title: string
  path: string
  children: React.ReactNode
}

const DownloadItem = ({ title, path, children }: ItemProps): JSX.Element => (
  <div className="downloadItem">
    <div className="downloadItemTitle">{title}</div>
    {children}
    <div className="downloadItemLink">
      <a href={path}>Download</a>
    </div>
  </div>
)

export const Downloads = (): JSX.Element => (
  <>
    <div id="downloads">
      <DownloadItem title="Item name" path="#">
        <p>Description and images</p>
        <p>Dummy text</p>
      </DownloadItem>
      <DownloadItem title="3D Printable Kernel" path="#">
        <p>Description and images</p>
        <img src={kernelRotate} className="left" />
      </DownloadItem>
    </div>
    <div id="downloadsFooter" />
  </>
)
