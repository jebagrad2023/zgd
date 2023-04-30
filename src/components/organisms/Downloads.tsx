import React from 'react'

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
      <DownloadItem title="Item name" path="gifts/test.zip">
        Description and images
        <br />
        Dummy text
      </DownloadItem>
    </div>
    <div id="downloadsFooter" />
  </>
)
