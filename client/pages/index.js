import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import logoStyles from "../styles/Logo.module.css"

export default function Home() {
	const googleAuth = async () => { 
		window.location.href="http://localhost:8080/api/auth/google/authenticate"
	}

  return (
    <div>
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <header>
            <nav className={`${logoStyles.navbar_bg_color} navbar`}>
                <div className="container-fluid">
                    <h1 className={`${logoStyles.font}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="5%" height="5%" fill="currentColor" className="bi bi-collection-play-fill m-3" viewBox="0 0 16 16">
                            <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437"/>
                        </svg>
                        Echo Lounge
                    </h1>
                </div>
            </nav>
        </header>

        <div className="container">
            <div className="row pt-5">

                <div className="col-md-6">
                    <div className="pt-5">
                        <h1 className="pt-3">Stream, watch, and chat with friends</h1>
                        <p className="pt-5">
                            Echo Lounge is the place to watch, share, and vibe with friends to your favorite YouTube videos—from music, comedy, learning, and much more the fun never ends! 
                        </p>
                        <div className="pt-3">
                            <button type="submit" className="btn btn-primary" onClick={googleAuth}>
                                Lets Begin
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <Image 
                        src="/images/home_page_image.jpeg" 
                        alt="Video Streaming Image with Friends"
                        layout="responsive"
                        width="150"
                        height="150"
                        className="rounded-3"
                    />
                </div>

            </div>   
        </div>

    </div>


  )
}
