import { Html, Head, Main, NextScript, type DocumentProps } from 'next/document'
import {
  DocumentHeadTags,
  type DocumentHeadTagsProps,
  documentGetInitialProps
} from '@mui/material-nextjs/v14-pagesRouter'

export default function MyDocument(
  props: DocumentProps & DocumentHeadTagsProps
) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = documentGetInitialProps
