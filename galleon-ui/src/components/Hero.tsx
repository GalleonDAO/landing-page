import Navigation from "components/Navigation";
import { Fragment } from "react";
import { Popover, Transition, Disclosure } from "@headlessui/react";
import {
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  MenuIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
  XIcon,
} from "@heroicons/react/outline";
import { ChevronRightIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import crewBackground from "assets/brand/crew-bg.png";
import { ChevronDownIcon } from "@heroicons/react/outline";
import ResourcesIcon from "assets/brand/Resources-Icon.png";
import CommunityIcon from "assets/brand/Community-Icon.png";
import AboutIcon from "assets/brand/About-Icon.png";
import ApplicationIcon from "assets/brand/Application-Icon.png";
import GovernanceIcon from "assets/brand/Governance-Icon.png";
import ProductsIcon from "assets/brand/Products-Icon.png";
import TreasuryIcon from "assets/brand/Treasury-Icon.png";
import GalleonLogo from "assets/brand/Union-Logo-Light.png";

import ResourcesIconDark from "assets/brand/Resources-Icon-Dark.png";
import CommunityIconDark from "assets/brand/Community-Icon-Dark.png";
import AboutIconDark from "assets/brand/About-Icon-Dark.png";
import ApplicationIconDark from "assets/brand/Application-Icon-Dark.png";
import GovernanceIconDark from "assets/brand/Governance-Icon-Dark.png";
import ProductsIconDark from "assets/brand/Products-Icon-Dark.png";
import TreasuryIconDark from "assets/brand/Treasury-Icon-Dark.png";
import { classNames } from "utils";
import links from "constants/externalLinks";

const Hero = () => {
  return (
    <div>
      <div className="pt-10  bg-theme-black sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden bg-[url('./assets/ship-bg-01.png')] bg-cover bg-no-repeat bg-center  pb-10 bg-opacity-100  min-h-screen">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
              <div className="py-24">
                <h1 className="mt-4 text-4xl font-morion tracking-tight font-extrabold text-theme-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="pb-3  bg-clip-text text-transparent bg-gradient-to-r from-theme-champagne to-theme-oldlace sm:pb-5">
                    The Asset
                  </span>
                  <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-theme-champagne to-theme-oldlace sm:pb-5">
                    Management Guild
                  </span>
                </h1>
                <p className="text-3xl text-theme-white sm:text-3xl lg:text-lg xl:text-3xl">
                  We create on-chain investment themes.
                </p>
                <div className="mt-8 sm:mt-8">
                  <div className="sm:max-w-xl sm:mx-auto lg:mx-0">
                    <div className="sm:flex">
                      <div className="min-w-0">
                        <a
                          href={links.dapp}
                          target={"_blank"}
                          className="block w-1/2 md:w-full py-3 px-4 mb-10 rounded-2xl border-2 shadow border-theme-navy hover:border-theme-champagne hover:text-theme-oldlace  bg-theme-oldlace hover:bg-theme-navy text-theme-navy focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-champagne text-sm md:text-xl focus:ring-offset-theme-black "
                          rel="noreferrer"
                        >
                          Enter App
                        </a>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <a
                          href={links.discordLink}
                          target={"_blank"}
                          className="block w-1/2 md:w-full py-3 px-4 mb-10 rounded-2xl shadow border-theme-navy border-2 hover:border-theme-champagne hover:text-theme-oldlace  bg-theme-oldlace  text-theme-navy hover:bg-theme-navy  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-champagne text-sm md:text-xl focus:ring-offset-theme-black "
                          rel="noreferrer"
                        >
                          Join the Crew
                        </a>
                      </div>
                    </div>
                    <div className="relative">
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div className="w-full border-t border-theme-oldlace" />
                      </div>
                    </div>
                    <div className="relative flex pb-5 pt-5 justify-start">
                      <p className="pr-2 text-3xl font-bold font-morion text-theme-champagne">
                        Voyages
                      </p>
                    </div>
                    <a
                      href={links.cursedPirates}
                      target={"_blank"}
                      className="flex  items-center  text-theme-champagne bg-transparent p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-theme-navy"
                      rel="noreferrer"
                    >
                      <img
                        src="/jollyroger-transp.png"
                        className="ml-2 w-16 h-16 bg-theme-oldlace rounded-full text-theme-champagne"
                        aria-hidden="true"
                      />
                      <span className="px-5 md:px-3 py-2 ml-3  border-theme-navy border-2 hover:border-theme-champagne 2xl:border-0 2xl:hover:border-2 text-sm 2xl:text-xl bg-theme-oldlace hover:bg-theme-navy 2xl:bg-transparent text-theme-navy 2xl:text-theme-champagne 2xl:hover:text-theme-champagne hover:text-theme-champagne  leading-5 tracking-wide rounded-2xl">
                        Cursed Pirates{" "}
                        <ChevronRightIcon className="2xl:w-8 2xl:h-8 w-4 h-4 -translate-y-0.5 2xl:-translate-y-1 inline-flex"></ChevronRightIcon>
                      </span>
                    </a>
                    <p className="mt-3 text-sm text-theme-champagne sm:mt-4"></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                {/* <img
                    className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src={shipBackground}
                    alt=""
                  /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
