import { Helmet } from 'react-helmet'
import Footer from './Footer'
import Header from './Header'

const Layout = ({children,description,keywords,author,title}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description}/>        
        <meta name="keywords" content={keywords}/>        
        <meta name="author" content={author}/>
        <title>{title}</title>        
      </Helmet>
      <Header/>
      <main style={{}}>
          {children}
      </main>
      <Footer/>
    </div>
  )
}

Layout.defaultProps = {
    title: "Moive Tickets- loot lo",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author:"Neeraj"
  }

export default Layout
