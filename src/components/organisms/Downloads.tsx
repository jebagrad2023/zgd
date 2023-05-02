import React from 'react'

import { ZoomableImage } from '@zgd/components/organisms/ZoomableImage'

import kernelRotate from '@zgd/images/gifts/3dp_kernel.gif'
import kernelPrinting from '@zgd/images/gifts/3dp_kernel_printing.jpg'
import papercraft from '@zgd/images/gifts/papercraft.jpg'

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
      <DownloadItem
        title="ZEA Cornelia Papercraft"
        downloadName="To Be Added"
        path="#"
      >
        <ZoomableImage
          src={papercraft}
          className="right"
          style={{
            width: '340px',
            maxWidth: '40%',
          }}
        />
        <p>Build your own ZEA Cornelia paper figure!</p>
        <p>
          We might never had chance to get actual official ZEA figure anymore,
          but at least you can get something close to it! Inspired from ZEA
          figure featured in certain NIJISORE episode, this papercraft was
          originally made for ZEA's birthday present, now it is available as a
          public download. Get yours now!
        </p>
        <hr />
        <p>
          This download package includes the PDO files of the papercraft
          template that you can open with Pepakura app for assembly guide
          reference, and the PDF files for easy printing. The default print size
          is A4 paper, although you can resize the print to a larger paper if
          you want to build the figure on bigger size. It is recommended to
          print on thick paper (above 100gsm) for sturdy yet flexible build
          material.
        </p>
        <p>
          3D model by Pirangunter
          <br />
          Papercraft by Enlima29
        </p>
        <p>
          This is a fan-created content published for free. Modification and
          redistribution of the contents are allowed following ANYCOLOR's
          Guidelines for Secondary Creation. All credits belong to the
          respective creators.
        </p>
        <p>Originally posted on Twitter: TBA</p>
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
