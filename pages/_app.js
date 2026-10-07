import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "../components/CartContext";
import { SessionProvider } from "next-auth/react"
import Footer from "../components/Footer";

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #fff;
    color: #111;
  }
`;

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <div style={{flex: 1}}>
              <Component {...pageProps} />
            </div>
            <Footer />
          </div>
        </CartContextProvider>
      </SessionProvider>
      
    </>
  );
}