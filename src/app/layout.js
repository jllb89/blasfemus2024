'use client';

import './globals.css';
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Link from 'next/link';
import Image from 'next/image';
import LoadingAnimation from './components/LoadingAnimation';
import CatalogOverlay from './components/CatalogOverlay';
import CocktailsSlider from './components/CocktailsSlider';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    title: "Blasfemus 7",
    description: "Blasfemus 7 embodies the spirit of tradition and dedication, nurtured for seven years, it reflects our dedication to capturing the true spirit and care of our land. Resting in Amburana wood, it pays homage to our family's origins, connecting us to our roots in Spain and Portugal.",
    image: "/7.png",
    link: "https://blasfemus.passionspirits.com/blasfemus-agave-spirits-7.html",
    properties: {
      brand: "BLASFEMUS 7 YEAR",
      category: "Agave Spirit",
      subcategory: "HANDMADE AMERICAN AGAVE SPIRIT",
      abvProof: "40% ALC. 80 PROOF",
      agaveType: "ANGUSTIFOLIA HAW",
      distillery: "ROMA, TX",
      spiritMasterBlender: "Leonardo Sánchez",
      upcCode: "123456789014",
    },
  },
  {
    title: "Blasfemus 11",
    description: "Blasfemus 11 is a blend of heritage, representing the story of our family&apos;s journey from humble beginnings to settling in Texas in 1739. Blasfemus 11 seals in the essence of our history by growing and nurturing Agaves for 11 years for this edition. We honor the timeless traditions that shape our identity and the enduring legacy we uphold by using “American Oak” wood.",
    image: "/11.png",
    link: "https://blasfemus.passionspirits.com/blasfemus-agave-spirits-11.html",
    properties: {
      brand: "BLASFEMUS 11 YEAR",
      category: "Agave Spirit",
      subcategory: "HANDMADE AMERICAN AGAVE SPIRIT",
      abvProof: "40% ALC. 80 PROOF",
      agaveType: "90% ANGUSTIFOLIA HAW / 10% POTATORIUM",
      distillery: "Blasfemus Distillery",
      spiritMasterBlender: "Jane Doe",
      upcCode: "051497147624",
    },
  },
  {
    title: "Blasfemus 17",
    description: "Blasfemus 17 is a tribute to community and the spirit of Texas. Made with agave that matures over 17 years and resting in French oak, it honors the rich history of our Roma, once a key port trading with France via New Orleans on steamboats along the Rio Grande, paying homage to the cultural tapestry that defines our identity and the communities we serve.",
    image: "/17.png",
    link: "https://blasfemus.passionspirits.com/blasfemus-agave-spirits-17.html",
    properties: {
      brand: "BLASFEMUS 17 YEAR",
      category: "Agave Spirit",
      subcategory: "HANDMADE AMERICAN AGAVE SPIRIT",
      abvProof: "40% ALC. 80 PROOF",
      agaveType: "90% ANGUSTIFOLIA HAW / 10% AMERICANA",
      distillery: "Blasfemus Distillery",
      spiritMasterBlender: "Jim Doe",
      upcCode: "051497147631",
    },
  },
];

const experiences = [
  {
    title: "A Day in the Distillery",
    description: "Experience the magic of distillation with our guided tour through the distillery. Visitors will not only get to know about Blasfemus&apos; elaboration process but also experience a distillation, know Roma Texas&apos; most iconic/historical building, dive into the family tradition through our archives, be served food from local food vendors such as well-known BBQ, and experience mixology made with Blasfemus. BOOKINGS AVAILABLE SOON.",
    image: "/experience1.png"
  },
  {
    title: "Mixology Masterclass",
    description: "Join our expert mixologists for a hands-on masterclass in cocktail making. A pro bartender will teach visitors how to prepare our signature cocktails and later on help visitors create their own cocktail using any of Blasfemus&apos; expressions. Bartenders will vary depending on their availability. BOOKINGS AVAILABLE SOON.",
    image: "/experience2.jpg"
  },
  {
    title: "Glamping in the Agave Fields",
    description: "Immerse yourself in the beauty of our agave fields with a luxurious glamping experience. Enjoy the serene landscape, starry nights, and exclusive tastings under the open sky. Indulge in premium amenities, gourmet meals, and unforgettable moments surrounded by nature. BOOKINGS AVAILABLE SOON.",
    image: "/experience3.jpg"
  }
];

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const mainTitleRef = useRef(null);
  const mainDescriptionRef = useRef(null);
  const column1Ref = useRef(null);
  const column2Ref = useRef(null);
  const column3Ref = useRef(null);

  useEffect(() => {
    const handleLoading = () => {
      setTimeout(() => setLoading(false), 5000);
    };

    handleLoading();

    const mainTitle = new SplitType(mainTitleRef.current, { types: 'chars' });
    const mainDescription = new SplitType(mainDescriptionRef.current, { types: 'chars' });

    gsap.from(mainTitle.chars, {
      opacity: 0,
      y: 5,
      stagger: 0.05,
      duration: .15,
      ease: 'power2.out',
      onComplete: () => console.log('Main title animation completed')
    });

    gsap.from(mainDescription.chars, {
      opacity: 0,
      y: 5,
      stagger: 0.05,
      duration: .15,
      ease: 'power2.out',
      delay: 0.1,
      onComplete: () => console.log('Main description animation completed')
    });
  }, []);

  useEffect(() => {
    gsap.fromTo(
      column1Ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.9, ease: 'power2.out' }
    );
    gsap.fromTo(
      column2Ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.1, ease: 'power2.out', delay: 0.2 }
    );
    gsap.fromTo(
      column3Ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.3, ease: 'power2.out', delay: 0.4 }
    );

    gsap.to(column1Ref.current, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: column1Ref.current,
        scrub: true,
      },
    });
    gsap.to(column2Ref.current, {
      yPercent: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: column2Ref.current,
        scrub: true,
      },
    });
    gsap.to(column3Ref.current, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: column3Ref.current,
        scrub: true,
      },
    });

  }, [currentProductIndex]);

  useEffect(() => {
    experiences.forEach((experience, index) => {
      const experienceRef = document.getElementById(`experience-${index}`);
      const experienceImageRef = document.getElementById(`experience-image-${index}`);
      const experienceOverlayRef = document.getElementById(`experience-overlay-${index}`);
      const experienceTitleRef = document.getElementById(`experience-title-${index}`);
      const experienceDescriptionRef = document.getElementById(`experience-description-${index}`);

      const handleMouseEnter = () => {
        gsap.to(experienceOverlayRef, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' });
        gsap.to(experienceTitleRef, { autoAlpha: 0, duration: 0.3, ease: 'power1.out' });
        gsap.to(experienceDescriptionRef, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' });
      };

      const handleMouseLeave = () => {
        gsap.to(experienceOverlayRef, { autoAlpha: 0, duration: 0.3, ease: 'power1.out' });
        gsap.to(experienceTitleRef, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' });
        gsap.to(experienceDescriptionRef, { autoAlpha: 0, duration: 0.3, ease: 'power1.out' });
      };

      experienceRef.addEventListener('mouseenter', handleMouseEnter);
      experienceRef.addEventListener('mouseleave', handleMouseLeave);

      experienceRef.addEventListener('touchstart', handleMouseEnter);
      experienceRef.addEventListener('touchend', handleMouseLeave);

      return () => {
        experienceRef.removeEventListener('mouseenter', handleMouseEnter);
        experienceRef.removeEventListener('mouseleave', handleMouseLeave);
        experienceRef.removeEventListener('touchstart', handleMouseEnter);
        experienceRef.removeEventListener('touchend', handleMouseLeave);
      };
    });
  }, []);

  const changeProduct = (index) => {
    gsap.to(column1Ref.current, { opacity: 0, duration: 0.5, ease: 'power2.out' });
    gsap.to(column2Ref.current, { opacity: 0, duration: 0.5, ease: 'power2.out', delay: 0.1 });
    gsap.to(column3Ref.current, {
      opacity: 0, duration: 0.5, ease: 'power2.out', delay: 0.2, onComplete: () => {
        gsap.set([column1Ref.current, column2Ref.current, column3Ref.current], { yPercent: 0 });
        setCurrentProductIndex(index);
      }
    });
  };

  const nextProduct = () => {
    changeProduct((currentProductIndex + 1) % products.length);
  };

  const previousProduct = () => {
    changeProduct((currentProductIndex - 1 + products.length) % products.length);
  };

  const currentProduct = products[currentProductIndex];

  return (
    <html lang="en">
      <body>
        <div className="mainContent">
          <div>
            <Link href="/" className="logo">
              <Image src="./blasfemus.svg" alt="Logo" className="responsive-logo" width={200} height={50} priority />
            </Link>
          </div>


          <div className="loadingTextContainer">
            <video autoPlay playsInline muted loop className="backgroundVideo" onLoadedData={() => console.log('Video loaded')}>
              <source src="./video.mp4" type="video/mp4" />
            </video>
            <div className="wrapper">
              <div className="copy">
                <div>
                  <h1 ref={mainTitleRef} className="mainTitle">Not a mezcal, <br />not a Tequila...</h1>
                </div>
                <div>
                  <h2 ref={mainDescriptionRef} className="mainDescription">We are Blasfemus,<br />an authentic agave spirit from Texas.</h2>
                </div>
              </div>
            </div>
          </div>


          <div className="sectionTitle">
            <p>
              <span className="thinFont">Our</span> <span className="lightFont">Products</span>
            </p>
          </div>

          <div className="productsSection">
            <div className="column" ref={column1Ref}>
              <div className="productInfo">
                <h2 className="productTitle">{currentProduct.title}</h2>
                <p className="productDescription">{currentProduct.description}</p>
                <button className="buyButton">
                  <a href={currentProduct.link} target="_blank" rel="noopener noreferrer">Buy Now</a>
                </button>
              </div>
              {currentProductIndex > 0 && (
                <div className="navigationButtons">
                  <button className="navButton previous" onClick={previousProduct}>Previous product</button>
                  <span className="navProductTitle">{products[currentProductIndex - 1].title}</span>
                </div>
              )}
            </div>
            <div className="column" ref={column2Ref}>
              <Image src={currentProduct.image} alt="Product Image" className="productImage" width={600} height={800} />
              <div className="navigationButtons mobile">
                {currentProductIndex > 0 && (
                  <button className="navButton navv" onClick={previousProduct}>Previous product</button>
                )}
                {currentProductIndex < products.length - 1 && (
                  <button className="navButton navv" onClick={nextProduct}>Next product</button>
                )}
              </div>
            </div>
            <div className="column" ref={column3Ref}>
              <div className="productProperties">
                <div className="property">
                  <div className="propertyTitle">Brand</div>
                  <div className="propertyText">{currentProduct.properties.brand}</div>
                </div>
                <div className="property">
                  <div className="propertyTitle">Category</div>
                  <div className="propertyText">{currentProduct.properties.category}</div>
                </div>
                <div className="property">
                  <div className="propertyTitle">Subcategory</div>
                  <div className="propertyText">{currentProduct.properties.subcategory}</div>
                </div>
                <div className="property">
                  <div className="propertyTitle">ABV/Proof</div>
                  <div className="propertyText">{currentProduct.properties.abvProof}</div>
                </div>
                <div className="property">
                  <div className="propertyTitle">Agave Type</div>
                  <div className="propertyText">{currentProduct.properties.agaveType}</div>
                </div>
                <div className="property">
                  <div className="propertyTitle">Distillery</div>
                  <div className="propertyText">{currentProduct.properties.distillery}</div>
                </div>
                <div className="property">
                  <div className="propertyTitle">Spirit Master Blender</div>
                  <div className="propertyText">{currentProduct.properties.spiritMasterBlender}</div>
                </div>
                <div className="property">
                  <div className="propertyTitle">UPC Code</div>
                  <div className="propertyText">{currentProduct.properties.upcCode}</div>
                </div>
              </div>
              {currentProductIndex < products.length - 1 && (
                <div className="navigationButtons">
                  <button className="navButton next" onClick={nextProduct}>Next product</button>
                  <span className="navProductTitle">{products[currentProductIndex + 1].title}</span>
                </div>
              )}
            </div>
          </div>

          <div className="cocktailsTitle">
            <p>
              <span className="thinFont">Blasfemus</span> <span className="lightFont">Mixology Lab</span>
            </p>
          </div>

          <CocktailsSlider />

          <div className="cocktailsTitle">
            <p>
              <span className="thinFont">Our history:</span> <span className="lightFont">Our Legacy</span>
            </p>
          </div>

          <div className="historyText">
            <div className="historyTextColumn">
              <p>At the heart of Blasfemus lies a symbol that encapsulates our journey and heritage. Our logo, a compass rose intersected by a diamond creating specific intersections, is more than just a design; it&apos;s a map of our origins and aspirations.<br></br><br></br>
                Each point of the compass represents a city in the history of Texas: San Antonio, Dallas, Houston and El Paso, having Austin at the center of it and Roma as starting point. These are the waypoints where our ancestors first set foot on Texan soil, marking the beginning of a legacy that continues to thrive today.<br></br><br></br>
                Our logo serves as a guiding light to navigate the evolving landscape of the spirits industry with foresight and passion, steering us towards new horizons while staying true to our roots. It symbolizes the spirit of exploration and innovation that defines Blasfemus.<br></br><br></br>
                In every bottle of Blasfemus, you&apos;ll find not just a spirit, but a compass pointing towards the rich Texan history and the boundless possibilities of the future.</p>
            </div>
            <div className="historyTextColumn">
              <Image src="/history.png" alt="History" width={600} height={600} />
            </div>
          </div>

          <div className="cocktailsTitle">
            <p>
              <span className="thinFont">The Heart of</span> <span className="lightFont">Blasfemus</span>
            </p>
          </div>


          <div className="distilleryPhotos">
            <div className="photoColumn">
              <Image src="/d1.png" alt="Distillery Photo 1" className="distilleryImage" width={600} height={800} />
            </div>
            <div className="photoColumn">
              <Image src="/d2.png" alt="Distillery Photo 2" className="distilleryImage" width={600} height={800} />
            </div>
          </div>

          <div className="distilleryText">
            <div className="textColumn">
              <p>Through our local distillery, jobs are created, growth is generated, and pride is born. <br></br><br></br>Located in the historical heart of Roma, Texas, our distillery operates in a building rich with history and character. At Blasfemus, we offer exclusive experiences that immerse you in the heart of our operations. Book a visit and discover the magic behind our premium agave distillates.</p>
            </div>
            <div className="textColumn">
            </div>
          </div>

          <div className="cocktailsTitle">
            <p>
              <span className="thinFont">Blasfemus </span> <span className="lightFont">Experience</span>
            </p>
          </div>

          <div className="experienceText">
            <p>Blasfemus is more than just a distillate; it&apos;s an experience and a lifestyle rooted in family tradition. Our heritage and dedication to craftsmanship are embodied in every bottle, and we are eager to share this legacy with the world. Join us in exploring the rich history, unique flavors, and unforgettable moments that define Blasfemus, as we invite you to live these experiences:
            </p>
          </div>

          <div className="experiencesSection">
            {experiences.map((experience, index) => (
              <div className="experienceColumn" id={`experience-${index}`} key={index}>
                <div className="experienceTitle" id={`experience-title-${index}`}>{experience.title}</div>
                <div className="experienceOverlay" id={`experience-overlay-${index}`}></div>
                <Image src={experience.image} alt={experience.title} className="experienceImage" id={`experience-image-${index}`} width={600} height={800} />
                <div className="experienceDescription" id={`experience-description-${index}`}>
                  {experience.description}
                </div>
              </div>
            ))}
          </div>

          {loading && (
            <LoadingAnimation onComplete={() => setLoading(false)} />
          )}
          {!loading && (
            <>
              <CatalogOverlay />
              {children}
            </>
          )}
        </div>
      </body>
    </html>
  );
}
