// components/ScrollPin.js
"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bannerbg from "@/app/assests/image/banner-bg.png"

gsap.registerPlugin(ScrollTrigger);

const BannerSlider = () => {
  useEffect(() => {
    const pinElements = document.querySelectorAll(".pin");

    pinElements.forEach((pinElement, index) => {
      if (index < 4) {
        ScrollTrigger.create({
          trigger: pinElement,
          start: "top",
          end: index === 4 ? "+=100%" : "+=300%",
          pin: true,
          scrub: 1, 
          markers: false,
        });
      }
    });

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="home_slider w-full overflow-hidden">
      <div className="w-[85%] flex flex-col justify-center mx-auto">
      {/* Pinned Sections */}
      <div className="pin h-full bg-[#FFF9ED] rounded-lg shadow-lg border-2 ">
      <div className="flex items-center h-full banner-bg z-111">
        <div className="section-1-design item">
          <div className="w-full bg-[#FFF9ED]">
            <h3 className="text-sm lg:text-2xl">
              Books have the power to{" "}
              <span className="bg-yellow-400 rounded-md pl-1 font-ibm">
                transform lives
              </span>
              .
            </h3>
          </div>
          <div className="w-full mt-20 ">
            <i>
              <p className="">
                How do <span className="border_line_1">we</span> invoke, experience, share and celebrate this power?
              </p>
            </i>
          </div>
        </div>
      </div>
    </div>
      <div className="pin h-full bg-[#FFF9ED] rounded-lg shadow-lg border-2 flex items-center">
        <div className="section-2-design item">
          <div className="w-full lg:w-[70%] mx-auto">
            <h3 className="mb-6 text-sm lg:text-2xl">
              Ours is the land of dharma. We are a civilization with rich
              literary and cultural heritage, but also with countless,
              conflicting narratives.
            </h3>
          </div>
          <div className="w-full lg:w-[70%] mx-auto">
            <i>
              <p className="text-sm lg:text-2xl">
                How do we educate and re-educate our youth to discover this
                heritage, but also build something which is beyond and{" "}
                <em className="bg-yellow-400 rounded-md">
                  free from any narrative
                </em>
                … a space where all narratives get subsumed and where thinking
                becomes completely liberated from all influences that hold back?
              </p>
            </i>
          </div>
          <div className="w-full lg:w-[70%] mx-auto">
            <i>
              <p className="text-sm lg:text-2xl">
                Could there be a platform compelling and powerful enough to
                catch the{" "}
                <em className="bg-yellow-400 rounded-md">
                  imagination of the young
                </em>
                without politicizing or polluting the mind, keeping it{" "}
                <em className="bg-yellow-400 rounded-md">pure</em> through
                debate and through rationality?
              </p>
            </i>
          </div>
          <div className="w-full lg:w-[70%] mx-auto">
            <i>
              <p className="">
                How do we produce and promote{" "}
                <em className="bg-yellow-400 rounded-md">
                  conscious literature?
                </em>
              </p>
            </i>
          </div>
          {/* Add more unique elements for Section 2 */}
        </div>
      </div>
      <div className="pin h-full bg-[#FFF9ED] rounded-lg shadow-lg border-2 flex items-center">
        <div className="section-3-design item">
          <div className="w-full lg:w-[44%] mx-auto">
            <i>
              <p className="text-2xl font-light pt-6 leading-10">
                How do we bring{" "}
                <em className="bg-yellow-400 rounded-md">depth/dharma</em> in
                political life, culture, business, warfare, education,
                evolution, and relationships through stories, and through the
                written word?
              </p>
            </i>
          </div>
          <div className="w-full lg:w-[44%] mx-auto">
            <i>
              <p className="text-2xl font-light pt-6 leading-10">
                How do we bring out not just these stories,
                <br />
                but also{" "}
                <em className="bg-yellow-400 rounded-md">
                  the people behind them?
                </em>
              </p>
            </i>
          </div>
          <div className="w-full lg:w-[44%] mx-auto">
            <i>
              <p className="text-2xl font-light pt-6 leading-10">
                How do we celebrate the written world?
              </p>
            </i>
          </div>
          <div className="w-full lg:w-[44%] mx-auto">
            <i>
              <p className="text-2xl font-light pt-6 leading-10">
                How do we invoke the power of the Ink?
              </p>
            </i>
          </div>
          <div className="w-full mt-6">
            <h4 className="">A high caliber Publishing house.</h4>
          </div>
        </div>
      </div>
      

      {/* Regular Scrollable Sections */}
      <div className="pin content h-full bg-[#FFF9ED] rounded-lg shadow-lg border-2 flex items-center">
        <div className="section-4-design item">
          <div className="w-full lg:w-[50%] mx-auto">
            <i>
              <p className="">
                BluOne Ink is a drop in an ocean that is to be filled — an ocean
                that brings together thinkers, scholars, writers, philosophers,
                critics, artists and readers, to write and speak to posterity.
              </p>
            </i>
          </div>
          <div className="w-full lg:w-[44%] mx-auto">
            <i>
              <p className="">BluOne Ink is an evolution of a revolution.</p>
            </i>
          </div>
          <div className="w-full lg:w-[44%] mx-auto">
            <i>
              <p className="">Everything else is an operational nuance.</p>
            </i>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pin,
        .content {
          padding: 20px;
          text-align: center;
          font-size: 24px;
          height:85vh;
          margin-bottom:20px;
        }
      `}</style>
      </div>
    </div>
  );
};

export default BannerSlider;
