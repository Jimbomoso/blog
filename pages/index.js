import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'

import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Adventures in coding</title>
      </Head>
      <section className={utilStyles.headingMd}>
      <img
          src="/images/beach.jpg"
          className={utilStyles.hero}
        />
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1> About this page </h1>
        <p> A few years ago I fell in love with coding. I launched this page to document my journey in web development and to gain some experience maintaining my own blog. I wish I had done this from the very beginning, but better now than never as they say. My intent is for it to serve as a quick reference for me, while also serving as a showcase of some of my adventures as a web developer. I plan to keep the site basic to serve these purposes. The site itself was built using Next.js and deployed via Vercel. </p>
        <h2 className={utilStyles.headingLg}>quests</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}