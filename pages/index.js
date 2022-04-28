import Head from "next/head";
import Image from "next/image";
import { getReports } from "../lib/lighthouse";
import Report from "../components/report";

const urls = [
  "https://www.example.com",
  // "https://www.arteriorshome.com/",
  // "https://www.madegoods.com/",
  // "https://www.phillipscollection.com",
  // "https://www.globalviews.com/",
  // "http://www.palecek.com/palecek/",
  // "https://fourhands.com/",
  // "https://cyan.design/",
];

export async function getStaticProps() {
  const reports = await getReports(urls);

  return {
    props: { reports },
    revalidate: 60 * 10,
  };
}

export default function Home({ reports }) {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Head>
        <title>Performance measurements with Lighthouse</title>
        <meta
          name="description"
          content="Performance measurements with Lighthouse"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen justify-center items-center">
        <Report reports={reports} />
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
