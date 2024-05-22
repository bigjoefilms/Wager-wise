"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "../components2/Modal/Modal";
import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import React, { useState, useEffect, useRef } from "react";
// import DashboardLayout from "../Dashboardlayout/DashboardLayout";

import { DashboardLayout } from "../components2/Layout";

const Page = () => {
  let sliderRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isRaffling, setIsRaffling] = useState(false);

  const { publicKey } = useWallet(); // grab wallet pubkey

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 100,
    autoplay: true,
    autoplaySpeed: 100,
    prevArrow: null, // Remove the left navigation arrow
    nextArrow: null, // Remove the right navigation arrow
    centerMode: true,
    centerPadding: "50px",
    vertical: false,
  };

  const cards = [
    {
      id: 1,
      image:
        "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1715824825/bonk_crypto_where_to_buy_slatf7.jpg",
      name: "Card 1",
    },
    {
      id: 2,
      image:
        "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1715824825/bonk_crypto_where_to_buy_slatf7.jpg",
      name: "Card 2",
    },
    {
      id: 3,
      image:
        "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1715824825/bonk_crypto_where_to_buy_slatf7.jpg",
      name: "Card 3",
    },
    {
      id: 4,
      image:
        "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1715824825/bonk_crypto_where_to_buy_slatf7.jpg",
      name: "Card 3",
    },
  ];
  const play = () => {
    sliderRef.current;
  };
  const pause = () => {
    // sliderRef.slickPause();
  };
  const playSound = () => {
    const audio = new Audio(`/marimba.mp3`);
    audio.play();
  };

  useEffect(() => {
    // Pause the slider when the component mounts
    // sliderRef.current.slickPause();
  }, []);

  // useEffect(() => {
  //   let timer;
  //   if (isRaffling) {
  //     timer = setTimeout(() => {
  //       const randomIndex = Math.floor(Math.random() * cards.length);
  //       // setSelectedCard(cards[randomIndex]);
  //       setIsRaffling(false);
  //       sliderRef.current.slickPause();
  //     }, 5000);
  //   }
  //   return () => clearTimeout(timer);
  // }, [isRaffling, cards]);

  const handleRaffle = () => {
    setSelectedCard(null);
    setIsRaffling(true);
    playSound();
    // sliderRef.current.slickPlay();
  };

  const handleMint = () => {
    if (selectedCard) {
      // console.log("Minting", selectedCard.name);
      setIsModalOpen(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const winData = [
    {
      id: 1,
      title: "Game 3",

      img: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1715824825/bonk_crypto_where_to_buy_slatf7.jpg",
      path: "/consulting-services",
    },
    {
      id: 2,
      title: "Game 4",

      img: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1715824825/bonk_crypto_where_to_buy_slatf7.jpg",
      path: "/consulting-services",
    },
    {
      id: 3,
      title: "Game 4",

      img: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1715824825/bonk_crypto_where_to_buy_slatf7.jpg",
      path: "/consulting-services",
    },
    {
      id: 4,
      title: "Game 4",

      img: "https://res.cloudinary.com/dtfvdjvyr/image/upload/v1715824825/bonk_crypto_where_to_buy_slatf7.jpg",
      path: "/consulting-services",
    },
  ];
  if (selectedCard) {
    const winSound = () => {
      const audio = new Audio(`/cute.mp3`);
      audio.play();
    };
    winSound();
  }
  return (
    <DashboardLayout>
      <main>
        <section className="section-container">
          <div className="flex items-center justify-center w-full ">
            <div
              className="flex items-center justify-center w-60 h-56 bg-cover bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dtfvdjvyr/image/upload/v1715775396/amico_pctqsg.png')",
              }}
            ></div>
          </div>
        </section>

        <center>
          <div className="flex w-full mt-10">
            <button className="open-btn">Open for 100 BONK</button>
          </div>
          <section className="slider-container overflow-hidden mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="text-primary"
            >
              <path
                fill="currentColor"
                d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569z"
              />
            </svg>
            <Slider ref={sliderRef} {...settings}>
              {cards.map((card) => (
                <div className="w-32 h-48" key={card.id}>
                  <img src={card.image} alt={card.name} />
                </div>
              ))}
            </Slider>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="text-primary"
            >
              <path
                fill="currentColor"
                d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19"
              />
            </svg>
          </section>
          <div className="mt-10">
            <button
              onClick={handleRaffle}
              disabled={isRaffling}
              className="btn text-white font-bold border-primary"
            >
              <svg
                height="24"
                width="24"
                fill="#FFFFFF"
                viewBox="0 0 24 24"
                data-name="Layer 1"
                id="Layer_1"
                className="sparkle"
              >
                <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
              </svg>
              {isRaffling ? "Spinning..." : "Test Spin"}
            </button>
            {selectedCard && (
              <>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                  <div>
                    <img src={selectedCard.image} alt={selectedCard.name} />
                    <p>{selectedCard.name}</p>
                  </div>
                  <button onClick={handleMint}>Mint Card</button>
                </Modal>
              </>
            )}
          </div>
        </center>

        <section className="mt-20">
          <div>
            <h2 className="text-wizard font-bold text-xl mb-10">
              Possible Drops
            </h2>
          </div>
          <div className="flex flex-row items-center w-full  gap-3">
            {winData.map((card) => (
              <div className="flex w-full" key={card.id}>
                <div className="w-full border-gradient border-[3px] border-solid mb-5 overflow-hidden ">
                  <img
                    className="flex w-46 h-46"
                    src={card.img}
                    alt={card.title}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* <section className=" w-96 gap-3 overflow-hidden">
          <Slider ref={sliderRef} {...settings}>
            {cards.map((card) => (
              <div className="flex gap-3" key={card.id}>
                <img className="ml-2 gap-3" src={card.image} alt={card.name} />
              </div>
            ))}
          </Slider>
        </section> */}
      </main>
    </DashboardLayout>
  );
};

export default Page;
