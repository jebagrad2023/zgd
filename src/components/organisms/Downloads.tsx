import React from 'react'

import { ZoomableImage } from '@zgd/components/organisms/ZoomableImage'

import kernelRotate from '@zgd/images/gifts/3dp_kernel.gif'
import kernelPrinting from '@zgd/images/gifts/3dp_kernel_printing.jpg'

type ItemProps = {
  title: string
  path: string
  downloadName?: string
  children: React.ReactNode
}

const DownloadItem = ({
  title,
  downloadName,
  path,
  children,
}: ItemProps): JSX.Element => (
  <div className="downloadItem">
    <div className="downloadItemTitle">{title}</div>
    {children}
    <div className="downloadItemLink">
      <a href={path} target="_blank" rel="noopener noreferrer">
        {downloadName || 'Download'}
      </a>
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
      <DownloadItem
        title="3D Printable Kernel"
        downloadName="Download kernel-3d.20220221.stl"
        path="https://doramanjyu.com/download/kernel-3d.20220221.stl"
      >
        <ZoomableImage
          src={kernelPrinting}
          className="right"
          style={{
            width: '400px',
            maxWidth: '40%',
          }}
        />
        <p>Print a Kernel on your 3D printer!</p>
        <p>
          This model is designed to be printed without raft/support if adhesion
          of the printer bed is good enough. Otherwise, slice with raft and/or
          support materials like the image on the right.
        </p>
        <img
          src={kernelRotate}
          className="left"
          style={{
            maxWidth: '30%',
          }}
        />
        <p>Polish and paint as your own!</p>
        <hr />
        <p>
          "Kernel" is a fan mascot of ZEA Cornelia and designed by her. This STL
          data is modeled by doramanjyu.
        </p>
        <p>
          It is allowed to modify and redistribute this 3D printable kernel
          data. (You need to follow the ANYCOLOR's Guidelines for Secondary
          Creation when redistribute.)
        </p>
        <p>
          Originally posted on{' '}
          <a
            href="https://twitter.com/doramanjyu/status/1495777883792580614"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          .
        </p>
      </DownloadItem>
    </div>
    <div id="downloadsFooter" />
  </>
)
