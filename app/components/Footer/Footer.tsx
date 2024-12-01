import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-footer w-full mt-12 mb-4 flex  justify-around items-center flex-col p-4  md:w-full lg:flex-row ">
      <div className="mx-auto w-full max-w-screen-xl ">
        <div className="flex justify-between items-center flex-col   md:w-full lg:flex-row  ">
          <div className="  flex justify-between items-center   flex-col ">
            <span className=" w-[300px] h-[66px] lg:h-36 mb-3 lg:w-[500px] ">
              <img src="/image/rafed-network.svg" />
            </span>
            <div className="flex justify-between gap-5 items-center flex-row w-[300px] h-32  ">
              <Link  href="https://www.facebook.com/ar.rafednetwork">
                <img className="w-10 h-10" src="/image/facebook.svg" />
              </Link>
              <Link href="https://instagram.com/rafednetwork/">
                <img className="w-10 h-10" src="/image/instagram.svg" />
              </Link>
              <Link href="https://www.tiktok.com/@rafednetwork">
                <img className="w-10 h-10" src="/image/tiktok.svg" />
              </Link>
              <Link href="https://twitter.com/rafednetwork">
                <img className="w-10 h-10" src="/image/twitter.svg" />
              </Link>
              <Link href="https://www.youtube.com/@KeysToHappiness">
                <img className="w-10 h-10" src="/image/youtube.svg" />
              </Link>
            </div>
            <div className="flex justify-between font-almarai font-bold text-[22px] gap-5 items-center flex-row w-[300px] h-32 text-white ">
              
                <Link href="https://rafed.net/ar/contact-us">اتصل بنا</Link>
              
              
                <Link href="https://rafed.net/ar/about-us">من نحن</Link>
              
              
                <Link href="">عربي</Link>
            
            </div>
          </div>
          <div className="h-full hidden justify-between flex-col lg:flex  lg:w-1/2 lg:gap-5 lg:flex-row">
            <div className="h-full flex justify-between font-bold flex-col gap-5">
              <h2 className="mb-6 text-sm font-semibold text-white  uppercase dark:text-white sm:text-xl ">
                {" "}
                المکتبة الإسلامية
              </h2>
              <ul className="text-white dark:text-gray-400 flex flex-col gap-4 font-bold">
                <li className="mb-4">
                  <Link
                    href="https://books.rafed.net/view.php?type=c_blist&cid=1"
                    className=" hover:underline sm:text-lg"
                  >
                    القرآن وعلومه
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="https://books.rafed.net/view.php?type=c_blist&cid=2"
                    className="hover:underline sm:text-lg"
                  >
                    الحديث وعلومه
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="https://books.rafed.net/view.php?type=c_blist&cid=3"
                    className="hover:underline sm:text-lg"
                  >
                    العقائد والكلام
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="https://books.rafed.net/view.php?type=c_blist&cid=7"
                    className="hover:underline"
                  >
                    سيرة النبي (ص) وأهل البيت (ع)
                  </Link>
                </li>
              </ul>
            </div>
            <div className="h-full flex justify-between font-bold flex-col gap-5">
              <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white  sm:text-xl">
                {" "}
                شبكة رافـد للتنمية الثقافية
              </h2>
              <ul className="text-white dark:text-gray-400 font-bold flex flex-col gap-4   ">
                <li className="mb-3">
                  <Link
                    href="https://research.rafed.net"
                    className="hover:underline sm:text-lg"
                  >
                    العقائد الاسلامية
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="https://www.rafed.net/category/مرایا-الولاء"
                    className="hover:underline sm:text-lg"
                  >
                    الصوتيات والمرئيات
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="https://books.rafed.net"
                    className="hover:underline sm:text-lg"
                  >
                    المکتبة الإسلامية
                  </Link>
                </li>
                <li className="mb-3">
                  <Link
                    href="https://www.rafed.net/moamal"
                    className="hover:underline sm:text-lg"
                  >
                    المؤمل
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
