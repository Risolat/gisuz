import React, { useState, useEffect } from "react";
import eye from "../public/photos/icons/eye.svg";
import volume from "../public/photos/icons/volume.svg";
import Image from "next/image";
import { useClickAway } from "@uidotdev/usehooks";
import { useRouter } from "next/router";
import axios from "../http";

const ExtraOpp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState(16);
  const { locale } = useRouter();

  const handleOpenModal = () => {
    if (isOpen === false) {
      setIsOpen(true);
    }
  };
  const changeFontSize = (event) => {
    const range = event.target.valueAsNumber;
    const html = document.getElementsByTagName("body")[0];
    const size = (html.style.fontSize = range + "px");
    setSize(size);
    return size;
  };
  const changeGrayScale = () => {
    let html = document.querySelector("html");
    html.style.filter = "grayscale(1)";
    setIsOpen(!isOpen);
  };
  const changeNormal = () => {
    let html = document.querySelector("html");
    html.style.filter = "";
    setIsOpen(!isOpen);
  };
  const changeGrayScale1 = () => {
    let html = document.querySelector("html");
    html.style.filter = "grayscale(100%) invert(100%)";
    setIsOpen(!isOpen);
  };
  const ref = useClickAway(() => {
    setIsOpen(false);
  });
  async function getUzVoice() {
    const token = "_Vhu_b30bcxsCetbsaUMYA";
    const data = new FormData();
    data.append("token", token);
    data.append("text", getSelectionText());
    data.append("speaker_id", "0");
    const response = await axios.post(
      `https://api.muxlisa.uz/v1/api/services/tts/`,
      data
    );
    let context = new AudioContext();
    async function playByteArray(bytes) {
      const audioBuffer = new Uint8Array(bytes);
      const blob = new Blob([bytes], {
        type: "audio/wav",
      });
      const url = URL.createObjectURL(blob);
      // const audio = await context.decodeAudioData(audioBuffer);
      //   console.log(url);
    }
    function play(audioBuffer) {
      var source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(context.destination);
      source.start(0);
    }
    playByteArray(response.data);
  }
  function getSelectionText() {
    let text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
      console.log(text);
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    return text;
  }
  function speechBtnClicked() {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    } else {
      let text = getSelectionText();
      if (text) {
        getVoice(text);
      }
    }
    getUzVoice();
  }
  function getVoice(text) {
    // console.log(speechSynthesis.getVoices(), "qwerty");
    // console.log(speechSynthesis.getVoices());
    console.log(navigator.userAgent);
    const voices = speechSynthesis
      .getVoices()
      .map((voice) => {
        if (navigator.userAgent.includes("Chrome")) {
          return (
            (voice.name.includes("Google") || voice.lang.includes("tr")) &&
            voice
          );
        } else {
          return voice;
        }
      })
      .filter((voice) => voice);
    // console.log(voices);
    let textToSpeak = text;
    let speakData = new SpeechSynthesisUtterance();
    speakData.text = textToSpeak;
    speakData.rate = 0.7;
    speakData.voice = voices.find((voice) => {
      if (locale === "uz") {
        // return voice.lang.includes("tr");
      } else if (locale === "uzb") {
        return voice.lang.includes("ru-RU");
      } else if (locale === "ru") {
        return voice.lang.includes("ru-RU");
      } else {
        voice.lang.includes("en-GB");
      }
    });
    speechSynthesis.speak(speakData);
    setTimeout(() => {
      if (!speechSynthesis.speaking) {
        speechSynthesis.speak(speakData);
      }
    }, 2000);
  }
  return (
    <div>
      <ul className="extra-list flex items-start">
        <li className="extra-item mr-[10px] ">
          <a href="#" className="relative" onClick={() => handleOpenModal()}>
            <Image src={eye} alt="eye" width={20} height={20} />
          </a>
          {isOpen ? (
            <div ref={ref}>
              <div className="eye-modal w-[220px] z-20 absolute p-[20px] bg-[#3A2F7D]">
                <p className="text-[#8F8F8F] text-[18px]">
                  {locale === "uz"
                    ? "Sayt ko'rinishi"
                    : locale === "ru"
                    ? "Вид сайта"
                    : locale === "uzb"
                    ? "Сайт кўриниши"
                    : "Site view"}
                </p>
                <ul className="flex items-center justify-between py-[15px] border-[#5C587A] border-b-[2px]">
                  <li>
                    <button
                      className="py-[10px] px-[17px] text-[18px] bg-[#171142]"
                      onClick={() => changeNormal()}
                    >
                      A
                    </button>
                  </li>
                  <li>
                    <button
                      className="py-[10px] px-[17px] text-[18px] bg-[#000]"
                      onClick={() => changeGrayScale()}
                    >
                      A
                    </button>
                  </li>
                  <li>
                    <button
                      className="py-[10px] px-[17px] text-[18px] text-[#000] bg-gray-300"
                      onClick={() => changeGrayScale1()}
                    >
                      A
                    </button>
                  </li>
                </ul>
                <p className="my-[10px] text-[18px] text-[#8F8F8F]">
                  {locale === "uz"
                    ? "Shrift o'lchami"
                    : locale === "ru"
                    ? "Размер шрифта"
                    : locale === "uzb"
                    ? "Шрифт ўлчами"
                    : "Shrift size"}
                </p>
                <input
                  id="range"
                  className="w-full"
                  type="range"
                  min="14"
                  max="20"
                  step="2"
                  onChange={(event) => changeFontSize(event)}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </li>
        <li className="extra-item mr-[10px]">
          <button onClick={() => speechBtnClicked()}>
            <Image src={volume} alt="volume" width={20} height={20} />
          </button>
        </li>
        <li className="text-[#A2A0B3] pr-[16px]">|</li>
      </ul>
    </div>
  );
};

export default ExtraOpp;
