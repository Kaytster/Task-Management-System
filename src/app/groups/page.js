import Image from "next/image";
import Header from "../header";
import 'bootstrap/dist/css/bootstrap.css'
import '../globals.css';
import '../styles/groups.css'


export default function Groups() {
    return (
      <html>
        <head>
        </head>
        <body>
          <Header />
        {/* <div> Icons made by <a href="https://www.flaticon.com/authors/kmg-design" title="kmg design"> kmg design </a> 
        from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div> */}
          <main>
            <br/>
            <br/>
            <div className="row"> 
              <div className="col">
                <h1>My Group</h1>
                <div id="user">
                    <Image
                        src="/user.png"
                        width={50}
                        height={50}
                    />
                    <p>You</p>
                </div>
                <br/>
                <div id="user">
                    <Image
                        src="/user1.png"
                        width={50}
                        height={50}
                    />
                    <p>User 1</p>
                </div>
                <br/>
                <div id="user">
                    <Image
                        src="/user2.png"
                        width={50}
                        height={50}
                    />
                    <p>User 2</p>
                </div>
                <br/>
                <div id="user">
                    <Image
                        src="/user3.png"
                        width={50}
                        height={50}
                    />
                    <p>User 4</p>
                </div>
                <br/>
                <div id="user">
                    <Image
                        src="/user4.png"
                        width={50}
                        height={50}
                    />
                    <p>User 4</p>
                </div>
              </div>
              <div className="col">
                <h1>My Group</h1>
                <div id="user">
                    <Image
                        src="/user.png"
                        width={50}
                        height={50}
                    />
                    <p>You</p>
                </div>
                <br/>
                <div id="user">
                    <Image
                        src="/user5.png"
                        width={50}
                        height={50}
                    />
                    <p>User 5</p>
                </div>
                <br/>
                <div id="user">
                    <Image
                        src="/user6.png"
                        width={50}
                        height={50}
                    />
                    <p>User 6</p>
                </div>
                <br/>
                <div id="user">
                    <Image
                        src="/user7.png"
                        width={50}
                        height={50}
                    />
                    <p>User 7</p>
                </div>
                <br/>
                <div id="user">
                    <Image
                        src="/user8.png"
                        width={50}
                        height={50}
                    />
                    <p>User 8</p>
                </div>
                <br/>
                <div id="user">
                    <Image
                        src="/user9.png"
                        width={50}
                        height={50}
                    />
                    <p>User 9</p>
                </div>
                <br/>
                <div id="user">
                    <Image
                        src="/user10.png"
                        width={50}
                        height={50}
                    />
                    <p>User 10</p>
                </div>
              </div>
            </div>
          </main>
        </body>
      </html>
    );
  }