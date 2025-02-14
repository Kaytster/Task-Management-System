import Image from "next/image";
import Header from "../header";
import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/account.css';

export default function Home() {
  return (
    <html>
      <head>
      </head>
      <body>
        <Header />
        <main>
          <br/>
          <br/>
          <div className="row"> 
              <div className="col">
                <div id="user">
                    <Image
                        src="/user.png"
                        width={500}
                        height={500}
                    />
                    <h2>Name</h2>
                    <h2>User ID</h2>
                </div>
              </div>
              <div className="col">

              </div>
            </div>
        </main>
      </body>
    </html>
  );
}
