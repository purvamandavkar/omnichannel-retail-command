// components/Footer.jsx

import React from "react";
import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-black mt-16   relative    ">
      <div className="max-w-7xl mx-auto px-6 py-14">
        
        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-sm font-bold tracking-[3px] text-blue-900 uppercase mb-4">
              Omniscient Lens
            </h2>

            <p className="text-white-600 text-sm leading-7">
              The industry-leading retail command center for predictive
              inventory logistics and omnichannel performance analysis.
            </p>
          </div>

          {/* Modules */}
          <div>
            <h3 className="text-xs font-bold tracking-[2px] uppercase mb-4 text-black">
              Modules
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-blue-600 cursor-pointer">
                Executive Overview
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Sales Analytics
              </li>
              <li className="text-blue-700 font-medium cursor-pointer">
                Inventory Optimization
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Channel Performance
              </li>
              
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold tracking-[2px] uppercase mb-4 text-black">
              Resources
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-blue-600 cursor-pointer">
                Documentation
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                API Reference
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Support Center
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                System Status
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold tracking-[2px] uppercase mb-4 text-black">
              Legal
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-blue-600 cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:text-blue-600 cursor-pointer">
                Security Protocols
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright */}
          <p className="text-xs tracking-[2px] text-gray-400 uppercase">
            © 2025 Omniscient Lens. All rights reserved.
          </p>

          {/* Floating Status Card */}
          <div className="bg-[#111827] rounded-xl px-5 py-4 flex items-center gap-4 shadow-xl">
            
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs uppercase">
                  Omnichannel Growth
                </p>

                <p className="text-white font-semibold">
                  +12.4%
                  <span className="text-cyan-400 ml-2">
                    Predictive Boost
                  </span>
                </p>
              </div>

              <div className="w-px h-10 bg-gray-700"></div>

              <p className="text-gray-300 font-medium">
                Optimization Logs
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;