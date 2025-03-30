
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <div className="bg-greenroom-500 text-white rounded-lg p-1.5 mr-2">
                <span className="text-xl font-bold">G</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-greenroom-500 to-greenroom-700 bg-clip-text text-transparent">
                Greenroom
              </span>
            </Link>
            <p className="text-gray-600 text-sm">
              Revolutionizing event participation with web3 identity primitives.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-greenroom-500">
                <Twitter size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-greenroom-500">
                <Github size={20} />
              </a>
              <a href="mailto:contact@greenroom.com" className="text-gray-400 hover:text-greenroom-500">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/events" className="text-gray-600 hover:text-greenroom-500">Events</Link></li>
              <li><Link to="/profile" className="text-gray-600 hover:text-greenroom-500">Web3 Identity</Link></li>
              <li><Link to="/create" className="text-gray-600 hover:text-greenroom-500">Create Event</Link></li>
              <li><Link to="/explore" className="text-gray-600 hover:text-greenroom-500">Explore</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-greenroom-500">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-greenroom-500">API</a></li>
              <li><a href="#" className="text-gray-600 hover:text-greenroom-500">Partners</a></li>
              <li><a href="#" className="text-gray-600 hover:text-greenroom-500">Community</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-greenroom-500">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-greenroom-500">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-greenroom-500">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-greenroom-500">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Greenroom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
