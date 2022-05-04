import Head from "next/head";
import Image from "next/image";
import { getReports } from "../lib/puppeteer";
import Report from "../components/report";

export async function getStaticProps() {
  const mobileReports = await getReports();
  const desktopReports = await getReports(true);

  return {
    props: { desktopReports, mobileReports },
    revalidate: 60 * 10,
  };
}

export default function Home({ desktopReports, mobileReports }) {
  return (
    <div className=" max-w-full mx-auto sm:px-6 lg:px-8">
      <Head>
        <title>Performance measurements with Lighthouse</title>
        <meta
          name="description"
          content="Performance measurements with Lighthouse"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="flex h-screen justify-center items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <Report reports={desktopReports} />
            <Report reports={mobileReports} mobile={true} />
          </div>
        </div>
      </main>

      <footer className="text-center">
        <a
          href="https://github.com/GoogleChrome/lighthouse/blob/master/docs/readme.md#using-programmatically"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <Image
              src="https://raw.githubusercontent.com/GoogleChrome/lighthouse/8b3d7f052b2e64dd857e741d7395647f487697e7/assets/lighthouse-logo.png"
              alt="Vercel Logo"
              width={100}
              height={50}
            />
          </span>
        </a>
      </footer>
    </div>
  );
}
