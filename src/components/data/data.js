import {
  MdCreateNewFolder,
  MdLogout,
  MdOutlineBrowserUpdated,
  MdEventNote,
} from "react-icons/md";
import { FaUsers, FaUser } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import { GrAnnounce } from "react-icons/gr";
import { SlSizeFullscreen } from "react-icons/sl";

export const dashboardTabs = [
  { id: 0, logo: FaUsers, text: "All Users" },
  { id: 1, logo: MdEventNote, text: "Create Events" },
  { id: 2, logo: SlSizeFullscreen, text: "Create Sizes" },
  { id: 3, logo: MdCreateNewFolder, text: "Create Products" },
  { id: 4, logo: MdOutlineBrowserUpdated, text: "Update Product" },
  { id: 5, logo: MdOutlineBrowserUpdated, text: "Update Events" },
  { id: 6, logo: GrAnnounce, text: "Orders" },
  { id: 7, logo: FaEnvelope, text: "News Letters" },
  { id: 8, logo: FaUser, text: "Update Password" },
  { id: 9, logo: MdLogout, text: "Logout" },
];

export const cardsProducts = [
  {
    id: 0,
    img: [
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951102/img-10_docysw.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951103/img-17_d9nnkj.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951103/img-13_es2sd3.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951102/img-11_a3wpxa.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951103/img-12_j4xvu4.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951123/img-19_ggalgp.jpg",
    ],
    title: "Personalised Message Magnet",
    price: "14.99",
    order: 9,
    size: "2.75 x 3.25",
    description:
      "Send a smile in the form of a magnet! Our Personalised Message Magnet is the perfect way to share a heartfelt message, thoughtful note, or inside joke – all beautifully displayed with your photo. Ideal as a gift for birthdays, anniversaries, or just because.",
    perfectFor: [
      "Gifts with a personal touch",
      "Long-distance messages",
      "Special announcements",
      "Live at Weddings for guests as party favours",
    ],
  },
  {
    id: 1,
    img: [
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951100/img-2_qmbqeq.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951103/img-15_dxsxwq.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951103/img-13_es2sd3.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951102/img-11_a3wpxa.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951103/img-12_j4xvu4.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951123/img-19_ggalgp.jpg",
    ],
    title: "Mini Magnet",
    price: "10.99",
    order: 9,
    size: "2.75 x 2.75",
    description:
      "Small but mighty! The Mini Magnet is a fun-sized way to showcase your favorite photo. It’s compact, cute, and fits anywhere – perfect for lockers, small fridges, or office spaces.",
    perfectFor: ["Party favors", "Pet photos", "Collages or sets"],
  },
  {
    id: 2,
    img: [
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951102/img-8_rngx0o.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951103/img-16_w2sy3r.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951103/img-13_es2sd3.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951102/img-11_a3wpxa.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951103/img-12_j4xvu4.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951123/img-19_ggalgp.jpg",
    ],
    title: "Classic Magnet",
    price: "11.99",
    order: 9,
    size: "2.75 x 3.5",
    description:
      "Our Classic Magnet is the go-to choice for everyday memories. Whether it’s a vacation snapshot, family photo, or milestone moment, this size is made to be noticed without taking over your space.",
    perfectFor: [
      "Fridge displays",
      "Gifting to friends and family",
      "Everyday memories",
    ],
  },
  {
    id: 3,
    img: [
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951102/img-9_b5z8ym.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951123/img-20_ntz4vb.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951103/img-13_es2sd3.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951102/img-11_a3wpxa.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951103/img-12_j4xvu4.jpg",
      "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951123/img-19_ggalgp.jpg",
    ],
    title: "Large Magnet",
    price: "12.99",
    order: 6,
    size: "4 x 3.24",
    description:
      "Make your memories stand out! The Large Magnet gives your photo the spotlight it deserves. With its generous size, it’s ideal for showing off your favorite moments in bold, beautiful detail.",
    perfectFor: ["Family portraits", "Holiday highlights", "Statement pieces"],
  },
];

export const eventImageMap = {
  Weddings:
    "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951124/wedding_mnisdr.png",
  "Birthday Parties":
    "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951100/birthday_mxrpxj.png",
  "Corporate Events":
    "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951100/corporation_nxqrlb.png",
  Engagements:
    "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951101/engagement_vq1kpx.png",
  "Baby Showers":
    "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951099/baby-shower_wu8uiy.png",
  "School Functions":
    "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951124/school_uypqxx.png",
  "Brand Activations":
    "https://res.cloudinary.com/dyyuwwbaq/image/upload/v1750951099/brand_lbxtnn.png",
};

export const FAQs = [
  {
    title: "What makes a good photo?",
    content:
      "<b>1)</b> Good lighting is essential – Ensure the photo is bright enough to show clear details of your loved one’s face, but not so bright that features are washed out. Dark photos can make it difficult for our designers to capture details accurately. <br /> <b>2)</b> Use a front-facing photo – A head-on shot works best. Be sure the full face is visible, including the forehead and ears. If the photo is taken from the side or only shows part of the face, that’s all we can include on your product. <br/> <b>3)</b> Avoid blurry images – The clearer the photo, the better. Since your photo will be scaled down, fine details can be lost if the original image isn’t sharp.",
  },
  {
    title: "Can I see a proof of how my product will look?",
    content:
      "Yes! You’ll be able to view a preview of your product online before placing your order.",
  },
  {
    title: "What is your change/cancellation policy?",
    content:
      "For made-to-order personalised products, we may not be able to cancel or make changes once production has started. This means the design process has begun. <br/> If you need to cancel or modify your order after this point, a £9 customisation fee per item will apply, as personalised items cannot be resold.",
  },
  {
    title: "Need to change your shipping address?",
    content:
      "We can help as long as your order hasn’t been shipped. Please message us with your current shipping address and the new one you’d like to use.",
  },
  {
    title: "What payment types are available?",
    content: "We accept UK credit card payments except American Express.",
  },
  {
    title: "How long does it take to receive my product?",
    content:
      "• Processing time: 1 Day <br/> • Delivery time: 3–5 business days after shipping <br/> <b>Please note that during peak holiday seasons, production times may vary slightly.</b>",
  },
  {
    title: "How much is shipping?",
    content:
      "Shipping to UK Mainland is £2.99. FREE shipping is available for orders above £30.00",
  },
  {
    title: "Do you ship internationally?",
    content: "Currently, we do not offer international shipping.",
  },
  {
    title: "Still need help?",
    content:
      "If your question wasn’t answered here, scroll down and fill out our Contact Form. Our team will be in touch as soon as possible. <br/> If you’ve already placed an order, please include your order number and as many details as you can so we can assist you quickly.",
  },
];
