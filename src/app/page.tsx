"use client"
import React, { useState } from 'react';
import './ptesneary.css';

const KHR = 4100;
const items = [
  { cat: 'starters', name: 'Nom Banh Chok Spring Rolls', kh: 'នំបញ្ចុករំចក់', desc: 'Fresh rice noodle rolls with herbs, cucumber & peanut sauce', price: 4, badge: 'b-veg', emoji: '🥗', img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300&q=65&auto=format' },
  { cat: 'starters', name: 'Fried Chicken Wings', kh: 'ស្លាប​មាន់​ចៀន', desc: 'Crispy golden wings with lemongrass, garlic & chili dipping sauce', price: 5, badge: 'b-pop', emoji: '🍗', img: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300&q=65&auto=format' },
  { cat: 'starters', name: 'Green Papaya Salad', kh: 'បបាយជ្រក់', desc: 'Shredded green papaya with lime, chili, peanuts & dried shrimp', price: 4.5, badge: '', emoji: '🥗', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&q=65&auto=format' },
  { cat: 'soups', name: 'Samlor Korko', kh: 'សម្លកកូរ', desc: 'Traditional Khmer vegetable stew with roasted coconut & prahok', price: 6, badge: 'b-pop', emoji: '🍲', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&q=65&auto=format' },
  { cat: 'soups', name: 'Beef Kuy Teav', kh: 'គុយទាវស្រស់', desc: 'Rice noodle soup with tender beef, bean sprouts & fresh herbs', price: 5.5, badge: '', emoji: '🍜', img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=300&q=65&auto=format' },
  { cat: 'mains', name: 'Fish Amok', kh: 'អាម៉ុកត្រី', desc: 'Steamed fish curry in banana leaf with coconut milk & kaffir lime', price: 8.5, badge: 'b-pop', emoji: '🐟', img: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=300&q=65&auto=format' },
  { cat: 'mains', name: 'Lok Lak', kh: 'លុកឡាក់', desc: 'Wok-tossed beef cubes with pepper dip, tomatoes & fried egg', price: 9, badge: 'b-pop', emoji: '🥩', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=65&auto=format' },
  { cat: 'mains', name: 'Bai Sach Chrouk', kh: 'បាយសាច់ជ្រូក', desc: 'Grilled coconut pork over jasmine rice with pickled daikon', price: 7, badge: '', emoji: '🍚', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=65&auto=format' },
  { cat: 'mains', name: 'Fried Rice with Crab', kh: 'បាយឆាក្តាម', desc: 'Fragrant fried jasmine rice with fresh crab, egg & spring onion', price: 10, badge: 'b-hot', emoji: '🦀', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&q=65&auto=format' },
  { cat: 'grilled', name: 'Grilled River Fish', kh: 'ត្រីដុត', desc: 'Whole freshwater fish stuffed with lemongrass over charcoal', price: 12, badge: 'b-hot', emoji: '🐠', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&q=65&auto=format' },
  { cat: 'grilled', name: 'BBQ Pork Skewers', kh: 'សាច់ជ្រូកដុត', desc: 'Pork skewers marinated in palm sugar, garlic & fish sauce', price: 8, badge: '', emoji: '🍢', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&q=65&auto=format' },
  { cat: 'desserts', name: 'Num Ansom', kh: 'នំអន្សម', desc: 'Sticky rice cake in banana leaf with coconut cream & black bean', price: 3, badge: 'b-veg', emoji: '🟤', img: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=300&q=65&auto=format' },
  { cat: 'desserts', name: 'Coconut Pudding', kh: 'បង្អែមដូង', desc: 'Chilled pandan coconut jelly with palm seeds & crushed ice', price: 3.5, badge: 'b-veg', emoji: '🥥', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&q=65&auto=format' },
  { cat: 'drinks', name: 'Sugarcane Juice', kh: 'ទឹកអំពៅ', desc: 'Fresh pressed sugarcane with lime & ginger', price: 2, badge: 'b-veg', emoji: '🥤', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=65&auto=format' },
  { cat: 'drinks', name: 'Cambodian Iced Coffee', kh: 'កាហ្វេទឹកកក', desc: 'Dark roast coffee with condensed milk over ice', price: 2.5, badge: '', emoji: '☕', img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&q=65&auto=format' },
  { cat: 'drinks', name: 'Lime Soda', kh: 'ទឹកក្រូចឆ្មា', desc: 'Fresh lime, sparkling water, palm sugar & a pinch of salt', price: 2, badge: 'b-veg', emoji: '🍋', img: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=300&q=65&auto=format' },
];

function badgeTxt(b: string) { return b === 'b-pop' ? '★ Popular' : b === 'b-veg' ? 'Veg' : b === 'b-hot' ? '🌶 Spicy' : ''; }

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const submitForm = () => alert('Thank you for your reservation request! We will call you to confirm. 🙏');

  const filteredItems = activeTab === 'all' ? items : items.filter(i => i.cat === activeTab);

  const MenuTabs = () => (
    <div className="menu-tabs" id="menuTabs">
      <button className={`mtab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All</button>
      <button className={`mtab ${activeTab === 'starters' ? 'active' : ''}`} onClick={() => setActiveTab('starters')}>Starters</button>
      <button className={`mtab ${activeTab === 'soups' ? 'active' : ''}`} onClick={() => setActiveTab('soups')}>Soups</button>
      <button className={`mtab ${activeTab === 'mains' ? 'active' : ''}`} onClick={() => setActiveTab('mains')}>Mains</button>
      <button className={`mtab ${activeTab === 'grilled' ? 'active' : ''}`} onClick={() => setActiveTab('grilled')}>Grilled</button>
      <button className={`mtab ${activeTab === 'desserts' ? 'active' : ''}`} onClick={() => setActiveTab('desserts')}>Desserts</button>
      <button className={`mtab ${activeTab === 'drinks' ? 'active' : ''}`} onClick={() => setActiveTab('drinks')}>Drinks</button>
    </div>
  );

  const MenuGrid = () => (
    <div className="menu-grid" id="menuGrid">
      {filteredItems.map((it, i) => (
        <div key={it.name} className="menu-card" style={{ animationDelay: `${i * 0.05}s` }}>
          <div className="menu-card-img">
            <img src={it.img} alt={it.name} loading="lazy" onError={(e) => { e.currentTarget.parentElement!.innerHTML = `<span style="font-size:52px">${it.emoji}</span>`; }} />
          </div>
          <div className="menu-card-body">
            <div className="menu-card-cat">{it.cat}</div>
            <div className="menu-card-name">{it.name}</div>
            <div className="menu-card-kh">{it.kh}</div>
            <div className="menu-card-desc">{it.desc}</div>
            <div className="menu-card-foot">
              <div>
                <div className="menu-price-usd">${it.price.toFixed(2)}</div>
                <div className="menu-price-khr">៛{(it.price * KHR).toLocaleString()}</div>
              </div>
              {it.badge && <span className={`badge ${it.badge}`}>{badgeTxt(it.badge)}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>


      {/* NAV */}
      <nav id="nav">
        <div className="nav-logo">Ptes <span>Neary</span></div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#specials">Specials</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Reserve</a>
        <button className="nav-hamburger" onClick={toggleMenu} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`} id="mobileMenu">
        <a href="#about" onClick={toggleMenu}>About</a>
        <a href="#menu" onClick={toggleMenu}>Menu</a>
        <a href="#specials" onClick={toggleMenu}>Specials</a>
        <a href="#gallery" onClick={toggleMenu}>Gallery</a>
        <a href="#contact" onClick={toggleMenu}>Contact · Reserve</a>
      </div>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-pattern"></div>
        <div className="hero-content">
          <div className="hero-tag">🍽 Authentic Cambodian Cuisine</div>
          <h1>Ptes <em>Neary</em></h1>
          <div className="hero-kh">ផ្ទះនារី</div>
          <p className="hero-desc">A warm family restaurant serving traditional Khmer flavors crafted with love and fresh local ingredients — just like home.</p>
          <div className="hero-btns">
            <a href="#menu" className="btn-primary">View Our Menu</a>
            <a href="#contact" className="btn-outline">Make a Reservation</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">10+</div>
              <div className="hero-stat-label">Years of service</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">50+</div>
              <div className="hero-stat-label">Khmer dishes</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">★ 4.8</div>
              <div className="hero-stat-label">Customer rating</div>
            </div>
          </div>
        </div>
        <div className="hero-divider"></div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-img-wrap">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=75&auto=format" alt="Ptes Neary Restaurant" />
              <div className="about-img-badge">
                <strong>2015</strong>
                Founded with love
              </div>
            </div>
            <div className="about-content">
              <div className="section-tag">Our Story · រឿងរ៉ាវរបស់យើង</div>
              <h2 className="section-title">A taste of <em>home</em>,<br />in every dish</h2>
              <p className="section-sub">Ptes Neary (ផ្ទះនារី) is a beloved family restaurant in Kandal Province, where every dish is prepared using traditional Khmer recipes passed down through generations. We believe great food brings people together.</p>
              <p className="section-sub" style={{ marginTop: "12px" }}>From fragrant fish amok to hearty lok lak, our kitchen celebrates the rich heritage of Cambodian cuisine using fresh, locally sourced ingredients every single day.</p>
              <div className="about-features">
                <div className="about-feat">
                  <div className="about-feat-icon">🌿</div>
                  <div className="about-feat-title">Fresh Ingredients</div>
                  <div className="about-feat-sub">Sourced daily from local markets</div>
                </div>
                <div className="about-feat">
                  <div className="about-feat-icon">👨‍🍳</div>
                  <div className="about-feat-title">Family Recipes</div>
                  <div className="about-feat-sub">Authentic Khmer cooking traditions</div>
                </div>
                <div className="about-feat">
                  <div className="about-feat-icon">🏡</div>
                  <div className="about-feat-title">Cozy Atmosphere</div>
                  <div className="about-feat-sub">Welcoming space for families</div>
                </div>
                <div className="about-feat">
                  <div className="about-feat-icon">💰</div>
                  <div className="about-feat-title">Affordable Prices</div>
                  <div className="about-feat-sub">Great food at fair prices</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section className="menu-section" id="menu">
        <div className="container">
          <div className="menu-header">
            <div className="section-tag">Our Menu · មុខម្ហូបរបស់យើង</div>
            <h2 className="section-title">Discover <em>Khmer</em> flavors</h2>
            <p className="section-sub">Traditional Cambodian cuisine made fresh every day, served with warm hospitality.</p>
          </div>
          {/* Menu Tabs replaced via React */}
          <MenuTabs />
          {/* Menu Grid replaced via React */}
          <MenuGrid />
        </div>
      </section>

      {/* SPECIALS */}
      <section className="specials" id="specials">
        <div className="specials-inner">
          <div className="specials-header">
            <div className="section-tag" style={{ color: "var(--amber2)" }}>Chef&apos;s Specials · ម្ហូបពិសេស</div>
            <h2 className="section-title" style={{ color: "var(--cream)" }}>Must-try <em>signature</em> dishes</h2>
            <p className="section-sub" style={{ color: "rgba(253,248,242,0.5)", margin: "12px auto 0" }}>Our most-loved dishes, crafted with the finest ingredients and generations of culinary knowledge.</p>
          </div>
          <div className="specials-grid">
            <div className="special-card">
              <div className="special-icon">🐟</div>
              <div className="special-name">Fish Amok</div>
              <div className="special-kh">អាម៉ុកត្រី</div>
              <div className="special-desc">Our signature steamed fish curry wrapped in banana leaf, with coconut milk, kaffir lime leaves and house-made kroeung paste. A national treasure.</div>
              <div className="special-price">$8.50</div>
            </div>
            <div className="special-card">
              <div className="special-icon">🥩</div>
              <div className="special-name">Lok Lak</div>
              <div className="special-kh">លុកឡាក់</div>
              <div className="special-desc">Tender wok-tossed beef cubes in rich oyster and soy sauce, served with kampot pepper dip, fresh tomatoes and a sunny-side egg over rice.</div>
              <div className="special-price">$9.00</div>
            </div>
            <div className="special-card">
              <div className="special-icon">🍲</div>
              <div className="special-name">Samlor Korko</div>
              <div className="special-kh">សម្លកកូរ</div>
              <div className="special-desc">Cambodia&apos;s beloved hearty vegetable stew with roasted coconut, prahok and a blend of seasonal vegetables. A true taste of Khmer soul food.</div>
              <div className="special-price">$6.00</div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery" id="gallery">
        <div className="container">
          <div className="gallery-header">
            <div className="section-tag">Gallery · វិចិត្រសាល</div>
            <h2 className="section-title">Food & <em>ambiance</em></h2>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item"><img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=70&auto=format" alt="Food" /></div>
            <div className="gallery-item"><img src="https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&q=70&auto=format" alt="Dish" /></div>
            <div className="gallery-item"><img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=70&auto=format" alt="Food" /></div>
            <div className="gallery-item"><img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=70&auto=format" alt="Soup" /></div>
            <div className="gallery-item"><img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=70&auto=format" alt="Restaurant" /></div>
            <div className="gallery-item"><img src="https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=70&auto=format" alt="Grilled" /></div>
            <div className="gallery-item"><img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=70&auto=format" alt="Dessert" /></div>
            <div className="gallery-item"><img src="https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=400&q=70&auto=format" alt="Drinks" /></div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="section-tag">Find Us · រកឃើញយើង</div>
          <h2 className="section-title">Come visit <em>us</em></h2>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-block">
                <div className="info-block-label">📍 Address</div>
                <div className="info-block-val">Kandal Province, Cambodia<br /><small style={{ color: "var(--muted)" }}>Exact address — please update</small></div>
              </div>
              <div className="info-block">
                <div className="info-block-label">📞 Phone</div>
                <div className="info-block-val"><a href="tel:+85512000000">+855 12 000 000</a><br /><small style={{ color: "var(--muted)" }}>Please update your number</small></div>
              </div>
              <div className="info-block">
                <div className="info-block-label">⏰ Opening Hours</div>
                <div className="info-block-val">
                  Monday – Friday: 7:00am – 9:00pm<br />
                  Saturday – Sunday: 7:00am – 10:00pm
                </div>
              </div>
              <div className="info-block">
                <div className="info-block-label">📱 Facebook</div>
                <div className="info-block-val"><a href="https://www.facebook.com/ptesneary" target="_blank">facebook.com/ptesneary</a></div>
              </div>
              <div className="map-wrap">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62451.23!2d104.931865!3d11.4710427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31095b3437c7edf7%3A0xa078e58c9882a3dd!2sPtes%20Neary!5e0!3m2!1sen!2skh!4v1"
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
            <div className="contact-form">
              <h3>Make a Reservation</h3>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="e.g. Dara Chan" />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+855 xx xxx xxx" />
              </div>
              <div className="form-group">
                <label>Date & Time</label>
                <input type="datetime-local" />
              </div>
              <div className="form-group">
                <label>Number of Guests</label>
                <input type="number" min={1} max={30} placeholder="e.g. 4" />
              </div>
              <div className="form-group">
                <label>Special Requests</label>
                <textarea rows={3} placeholder="Allergies, birthday, special occasion…"></textarea>
              </div>
              <button className="form-submit" onClick={submitForm}>Send Reservation →</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Ptes <span>Neary</span></div>
        <div className="footer-kh">ផ្ទះនារី</div>
        <div className="social-links">
          <a className="social-link" href="https://www.facebook.com/ptesneary" target="_blank" title="Facebook">f</a>
          <a className="social-link" href="#" title="Phone">📞</a>
          <a className="social-link" href="#" title="Location">📍</a>
        </div>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#specials">Specials</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-copy">© 2026 Ptes Neary · ផ្ទះនារី · All rights reserved · Kandal, Cambodia</div>
      </footer>


    </>
  );
}
