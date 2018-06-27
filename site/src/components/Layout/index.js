import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql, StaticQuery } from "gatsby"

import Header from '../Header'
import Navigation from '../Navigation'
import './styles.css'
import styles from './styles.js'

const Layout = ({ children, data }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <div style={styles.container} >
          <Header siteTitle={data.site.siteMetadata.title} />
          <div style={styles.body}>
            <Navigation></Navigation>
            <div style={styles.content} >
              {children}
            </div>
          </div>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Layout