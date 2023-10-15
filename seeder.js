const SliderDataSchema = require("./schema/SliderDataSchema");
const CardImagesSchema = require("./schema/cardImageSchema");

const Sliderdata = [
  {
    moviename: "x & y",
    year: " family 2016",
    description:
      "Is it a boy or a girl? Story of an average, next-door Indian family and their association with a strong cultural preference for the male child.",
    img: "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/6671/1306671-h-1f552514bd88",
  },

  {
    moviename: "Song Of the River",
    year: "1 season 6 episode:Travel:-UA/13+ hindi Select picks",
    description:
      "Ace music composer Shantanu Moitra embarks on a 3000 km long cycling journey to reach Gangasagar- a quaint village, bringing to life a confluence of music and culture.",
    img: "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/7677/1317677-h-86e1f3d9f930",
  },

  {
    moviename: "Doctor Strange in the multiverse of Madness",
    year: "Marvels 2022",
    description:
      "When the Multiverse is unlocked, Doctor Strange must enlist help from old and new allies in order to confront a surprising adversary.",
    img: "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/9939/1279939-h-3be10a34342b",
  },

  {
    moviename: "Doraemon",
    year: "2022",
    description:
      "Suneo shows off his new robot and uses Nobita to test its punching and kicking powers. With Doraemon's help, a vengeful Nobita builds a Giant Robot that flies through the air and easily defeats Suneo's robot.",
    img: "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/3422/753422-v",
  },

  {
    moviename: "Raya and the last Dragon",
    year: "2021 Animation",
    description:
      "Raya, a fallen princess, must track down the legendary last dragon to stop the evil forces that have returned and threaten her world.",
    img: "https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/6940/1036940-h-2ccb3341e270",
  },
];

const CardImages = [
  {
    image:
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/3681/1313681-v-12e8c3789a39",
    description: "",
  },
  {
    image:
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/3373/1313373-v-b03a81fa59c6",
    description: "",
  },
  {
    image:
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/3683/1313683-v-35bf4845ab30",
    description: "",
  },
  {
    image:
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/570/650570-v",
    description: "",
  },
  {
    image:
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/6660/846660-v",
    description: "",
  },
  {
    image:
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/9712/629712-v",
    description: "",
  },
  {
    image:
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/8631/1048631-v-d2c4728b76c1",
    description: "",
  },
  {
    image:
      "https://img1.hotstarext.com/image/upload/f_auto,t_web_vl_3x/sources/r1/cms/prod/3681/1313681-v-12e8c3789a39",
    description: "",
  },
];

(async () => {
  const [cardsNumber, sliderImages] = await Promise.all([
    CardImagesSchema.countDocuments(),
    SliderDataSchema.countDocuments(),
  ]);
  const seederPromises = [];

  if (!cardsNumber) {
    seederPromises.push(CardImagesSchema.create(CardImages));
  }

  if (!sliderImages) {
    seederPromises.push(SliderDataSchema.create(Sliderdata));
  }
  await Promise.all(seederPromises);
})();
