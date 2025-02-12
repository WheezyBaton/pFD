// src/components/Footer.js
import Image from "next/image";

const Footer = () => {
      return (
            <div className="py-12 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 bg-gray-100 text-sm mt-36">
                  <div className="flex flex-col md:flex-row justify-between gap-24">
                        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
                              <div className="flex gap-6 md:flex justify-center">
                                    <div>
                                          <p>Śląska 12,</p> <p>Gdańsk,</p>
                                          <p>80-389,</p> <p>Pomorskie,</p> <p>Poland</p>
                                    </div>
                                    <div>
                                          <p className="font-semibold">contact@fakeshop.com</p>
                                          <p className="font-semibold text-center">+48 123 456 789</p>
                                    </div>
                              </div>
                        </div>
                        <div className="flex flex-row justify-center gap-6 h-4">
                              <Image src="/facebook.png" alt="" width={16} height={16} />
                              <Image src="/instagram.png" alt="" width={16} height={16} />
                              <Image src="/youtube.png" alt="" width={16} height={16} />
                              <Image src="/pinterest.png" alt="" width={16} height={16} />
                              <Image src="/x.png" alt="" width={16} height={16} />
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
                              <span className="font-semibold">Secure Payments</span>
                              <div className="flex justify-between">
                                    <Image src="/discover.png" alt="" width={40} height={20} />
                                    <Image src="/skrill.png" alt="" width={40} height={20} />
                                    <Image src="/paypal.png" alt="" width={40} height={20} />
                                    <Image src="/mastercard.png" alt="" width={40} height={20} />
                                    <Image src="/visa.png" alt="" width={40} height={20} />
                              </div>
                        </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-8">
                        <div className="">2025 Fake Store</div>
                        <div className="flex flex-col gap-8 md:flex-row">
                              <div className="">
                                    <span className="text-gray-500 mr-4">Language</span>
                                    <span className="font-medium">English</span>
                              </div>
                              <div className="">
                                    <span className="text-gray-500 mr-4">Currency</span>
                                    <span className="font-medium">USD</span>
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default Footer;
