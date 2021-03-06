import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { Follow } from 'react-twitter-widgets'
import Prism from 'prismjs'
import { useEffect } from 'react'

const name = 'James Morrison'

export const siteTitle = 'Adventures in Coding'

export default function Layout({ children, home, description, pageTitle }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <>
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={description}
        />
        <title>{pageTitle}</title>
        <meta property="og:site_name" content={siteTitle} key="ogsitename" />
        <meta property="og:title" content={pageTitle} key="ogtitle" />
        
      </Head>
      <header className={styles.header}>
        
        {home ? (
          <>
            <img
              src="/images/selfie_edit.jpg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <Follow username='jimbomoso' url='https://twitter.com/jimbomoso'/>
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/selfie_edit.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <Follow username='jimbomoso' url='https://twitter.com/jimbomoso'/>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
    </>
  )
}