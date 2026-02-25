import React from 'react';
import { Layers, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-luxury-black pt-32 pb-12 px-6 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <a className="flex items-center gap-2 mb-6" href="#">
            <Layers className="w-6 h-6 text-luxury-blue" />
            <h2 className="font-serif italic text-xl tracking-tight text-white">
              Pashmina <span className="font-bold not-italic">Luxury</span>
            </h2>
          </a>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Dedicated to the preservation of ancient weaving arts and the empowerment of Himalayan artisan communities.
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-luxury-blue transition-colors text-slate-400 hover:text-white" href="#">
              <Globe className="w-4 h-4" />
            </a>
            <a className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-luxury-blue transition-colors text-slate-400 hover:text-white" href="#">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-slate-100">Collections</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a className="hover:text-luxury-blue transition-colors" href="#">The Heritage Series</a></li>
            <li><a className="hover:text-luxury-blue transition-colors" href="#">Modern Minimalist</a></li>
            <li><a className="hover:text-luxury-blue transition-colors" href="#">Wedding Collection</a></li>
            <li><a className="hover:text-luxury-blue transition-colors" href="#">The Sozni Vault</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-slate-100">Exclusivity</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a className="hover:text-luxury-blue transition-colors" href="#">Bespoke Orders</a></li>
            <li><a className="hover:text-luxury-blue transition-colors" href="#">Care Guide</a></li>
            <li><a className="hover:text-luxury-blue transition-colors" href="#">Authenticity Certificate</a></li>
            <li><a className="hover:text-luxury-blue transition-colors" href="#">Artisan Stories</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-8 text-slate-100">Join the Circle</h4>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">Subscribe for early access to limited releases and private previews.</p>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              className="bg-white/5 border border-white/10 rounded-lg focus:ring-luxury-blue focus:border-luxury-blue text-sm px-4 py-3 text-white outline-none"
              placeholder="Your email address"
              type="email"
            />
            <div className="flex gap-3">
              <button className="flex-1 bg-luxury-blue text-white py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all">Request Access</button>
              <a
                href="mailto:contact@pashminaluxury.com?subject=Join%20the%20Circle%20Inquiry"
                className="w-12 h-12 rounded-lg border border-white/10 flex items-center justify-center hover:bg-luxury-blue transition-colors text-slate-400 hover:text-white shrink-0"
                title="Send us an email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </form>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-slate-600">
        <p>© 2024 Quill. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a className="hover:text-slate-400 transition-colors" href="#">Privacy</a>
          <a className="hover:text-slate-400 transition-colors" href="#">Terms</a>
          <a className="hover:text-slate-400 transition-colors" href="#">Sustainability</a>
        </div>
      </div>
    </footer>
  );
}
