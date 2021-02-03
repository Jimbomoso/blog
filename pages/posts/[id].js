import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { Share } from 'react-twitter-widgets'

import { getAllPostIds, getPostData } from '../../lib/posts'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.pageTitle}</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jimbomoso" />
        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:description" content={postData.description} />
        <meta name="twitter:image" content="https://jimbomoso.com/images/beach.jpg" />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <Share url={postData.getStaticPaths} />
      </article>
    </Layout>
  )
}