import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="footer sm:footer-horizontal p-10 max-w-7xl mx-auto">
        <aside>
          <Logo />
          <p className="mt-2 text-sm max-w-xs">
            Hero Kidz — Smart learning toys that make education fun for children
            of all ages.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle btn-sm">
              <FaFacebook size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle btn-sm">
              <FaInstagram size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle btn-sm">
              <FaYoutube size={18} />
            </a>
          </div>
        </aside>
        <nav>
          <h6 className="footer-title">Shop</h6>
          <Link href="/products" className="link link-hover">All Products</Link>
          <Link href="/products?sort=newest" className="link link-hover">New Arrivals</Link>
          <Link href="/products?sort=sold" className="link link-hover">Best Sellers</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link href="/" className="link link-hover">About Us</Link>
          <Link href="/contact" className="link link-hover">Contact</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Support</h6>
          <Link href="/contact" className="link link-hover">Help Center</Link>
          <Link href="/contact" className="link link-hover">Shipping & Returns</Link>
        </nav>
      </div>
      <div className="border-t border-neutral-content/10 py-4 text-center text-sm">
        <p>© {new Date().getFullYear()} Hero Kidz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
