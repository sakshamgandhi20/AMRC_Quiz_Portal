import React from 'react'
import {
  Youtube,
  MessageCircleMore,
  SendHorizontal,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-12 text-center text-gray-600">
  <p className="mb-4">Om Shanti ✨ | Avyakt Murli Readers - ज्ञान, योग, धारणा और सेवा के माध्यम से आत्माओं को सशक्त बनाना</p>
  <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm md:text-base">
    <a
      href="https://chat.whatsapp.com/KKvKD5o5DJI9d5chsmfa4Y"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-green-600"
    >
      <MessageCircleMore className="w-5 h-5" /> WhatsApp Group
    </a>
    <a
      href="https://t.me/AMRCSakash"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-blue-600"
    >
      <SendHorizontal className="w-5 h-5" /> Telegram Sakash
    </a>
    <a
      href="https://www.youtube.com/@AvyaktMurliReaders"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-red-600"
    >
      <Youtube className="w-5 h-5" /> Avyakt Murli Readers
    </a>
    <a
      href="https://www.youtube.com/@GodlyAbode"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:text-red-600"
    >
      <Youtube className="w-5 h-5" /> Godly Abode
    </a>
  </div>
</footer>
  )
}

export default Footer