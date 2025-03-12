'use client'
import Header from "../components/header";
import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/dashboard.css';

export default function Home() {

    return (
      <html>
        <body>
          <Header />
          <main>
          <br/>
          <br/>
          <div className="row">
            <div className="col">
            <h1>Recent List</h1>
                
            </div>
          </div>
        
          </main>
        </body>
      </html>
    );
  }
  