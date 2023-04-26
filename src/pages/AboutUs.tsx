import {
  HiEye,
  HiTrendingUp,
  HiInformationCircle,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { useContext } from "react";
import Plans from "../components/Svg/Plans";
import Features from "../components/Svg/Features";
import { AppContext } from "../contexts/AppContext";
import PopcornSofa from "../components/Svg/PopcornSofa";

function AboutUs() {
  const { lang, darkMode } = useContext(AppContext);

  if (lang === "fr") {
    return (
      <div
        className={`${
          darkMode
            ? "bg-darkBg text-gray-400"
            : "bg-myLightGray text-smokyBlack"
        } flex min-h-[calc(100vh-64px)] flex-col items-center gap-4 py-16 lg:gap-8`}
      >
        {/* Title */}
        <h1 className="my-8 text-3xl font-bold text-primary">
          À propos de nous
        </h1>

        <div className="flex flex-col items-center gap-4 px-4 sm:w-4/5">
          {/* Introduction */}
          <div className="flex flex-col items-center gap-32 lg:flex-row lg:items-center">
            <div className="flex flex-col items-start gap-5 lg:w-3/4">
              <h2 className="text-2xl font-bold text-primary">
                "Découvrez, organisez et partagez vos passions."
              </h2>
              <p>
                Bienvenue sur{" "}
                <span className="font-bold text-primary">Check This One</span> !
                Nous sommes une plateforme dédiée à la création et au partage de
                listes de films, de séries TV, de podcasts et de vidéos YouTube.
                Notre mission est de vous aider à organiser et à découvrir
                facilement de nouveaux contenus, tout en vous offrant la
                possibilité de partager vos découvertes et vos coups de cœur
                avec vos amis, votre famille ou vos collègues, ou simplement
                pour référencer les contenus que vous souhaitez consommer.
              </p>
              <p>
                Que vous soyez un cinéphile, un amateur de séries TV, un adepte
                de podcasts ou un fan de vidéos YouTube,{" "}
                <span className="font-bold text-primary">Check This One</span>{" "}
                est l'outil idéal pour enrichir et partager votre expérience
                multimédia. Rejoignez notre communauté dès aujourd'hui et
                découvrez tout ce que nous avons à offrir !
              </p>
            </div>

            {/* SVG */}
            <PopcornSofa />
          </div>

          {/* Main features */}
          <div className="flex flex-col items-center gap-5 lg:-mt-16 lg:flex-row lg:items-center">
            {/* SVG */}
            <Features />

            <div className="flex flex-col items-start gap-5 lg:w-[95%]">
              <h3 className="text-xl font-bold text-primary">
                Fonctionnalités principales
              </h3>
              <p>
                <span className="font-bold text-primary">Check This One</span>{" "}
                offre une variété de fonctionnalités pour améliorer votre
                expérience de découverte et de partage de contenus :
              </p>
              <ul className="flex list-none flex-col gap-3 no-underline">
                <li className="">
                  <span className="flex flex-row items-center gap-2 font-bold">
                    <div
                      className={`rounded-md p-2 ${
                        darkMode
                          ? "bg-altSecondary text-darkBg"
                          : "bg-secondary text-myWhite"
                      }`}
                    >
                      <HiOutlineClipboardList className="h-6 w-6" />
                    </div>
                    Création et partage de listes :
                  </span>{" "}
                  <p className="ml-12">
                    Créez facilement des listes personnalisées de films, séries
                    TV, podcasts et vidéos YouTube, et partagez-les avec vos
                    amis, votre famille ou vos collègues pour échanger des
                    recommandations et des découvertes.
                  </p>
                </li>

                <li>
                  <span className="flex flex-row items-center gap-2 font-bold">
                    <div
                      className={`rounded-md p-2 ${
                        darkMode
                          ? "bg-altSecondary text-darkBg"
                          : "bg-secondary text-myWhite"
                      }`}
                    >
                      <HiInformationCircle className="h-6 w-6" />
                    </div>
                    Informations sur les contenus :
                  </span>{" "}
                  <p className="ml-12">
                    Accédez aux informations détaillées sur les films et séries
                    TV, tels que les acteurs, les réalisateurs, les synopsis.
                    Trouvez également les plateformes de streaming qui proposent
                    ces contenus en fonction de votre pays, pour faciliter votre
                    expérience de visionnage.
                  </p>
                </li>
                <li>
                  <span className="flex flex-row items-center gap-2 font-bold">
                    <div
                      className={`rounded-md p-2 ${
                        darkMode
                          ? "bg-altSecondary text-darkBg"
                          : "bg-secondary text-myWhite"
                      }`}
                    >
                      <HiEye className="h-6 w-6" />
                    </div>
                    Statut de visionnage :
                  </span>{" "}
                  <p className="ml-12">
                    Marquez les contenus que vous avez déjà vus ou écoutés, et
                    suivez votre progression de visionnage au sein d'une liste.
                    Cela vous permet de vous organiser et de savoir quels
                    contenus vous devez encore découvrir.
                  </p>
                </li>
                <li>
                  <span className="flex flex-row items-center gap-2 font-bold">
                    <div
                      className={`rounded-md p-2 ${
                        darkMode
                          ? "bg-altSecondary text-darkBg"
                          : "bg-secondary text-myWhite"
                      }`}
                    >
                      <HiTrendingUp className="h-6 w-6" />
                    </div>
                    Tendances YouTube et Podcasts :
                  </span>{" "}
                  <p className="ml-12">
                    Restez informé des vidéos YouTube et des podcasts tendances
                    du moment, directement depuis notre plateforme. Vous n'aurez
                    jamais à chercher bien loin pour trouver les contenus les
                    plus populaires et les plus récents.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* Future */}
          <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-start">
            <div className="flex flex-col items-start gap-5 lg:w-[95%]">
              <h3 className="text-xl font-bold text-primary">Plans futurs</h3>
              <p>
                Chez{" "}
                <span className="font-bold text-primary">Check This One</span>,
                nous sommes toujours à la recherche de nouvelles façons
                d'améliorer l'expérience utilisateur et d'ajouter de la valeur à
                notre plateforme. Voici quelques-unes des améliorations et des
                évolutions que nous envisageons pour l'avenir :
              </p>
              <ul className="flex list-none flex-col gap-3 no-underline">
                <li>
                  <span className="flex flex-row items-center gap-2 font-bold">
                    Intégration des réseaux sociaux :
                  </span>{" "}
                  Permettre aux utilisateurs de se connecter avec leurs comptes
                  de réseaux sociaux, tels que Facebook, Twitter ou Google, pour
                  faciliter le partage et l'interaction avec leurs amis et leur
                  réseau.
                </li>

                <li>
                  <span className="flex flex-row items-center gap-2 font-bold">
                    Application mobile :
                  </span>{" "}
                  Créer une application mobile pour iOS et Android, afin que nos
                  utilisateurs puissent accéder à{" "}
                  <span className="font-bold text-primary">Check This One</span>{" "}
                  partout et à tout moment, directement depuis leur smartphone
                  ou leur tablette.
                </li>
                <li>
                  <span className="flex flex-row items-center gap-2 font-bold">
                    Communauté et forums :
                  </span>{" "}
                  Mettre en place des espaces de discussion et d'échange pour
                  que les utilisateurs puissent partager leurs opinions, poser
                  des questions et recevoir des conseils sur les contenus et les
                  listes.
                </li>
              </ul>
              <p>
                Nous sommes impatients de continuer à développer et à améliorer{" "}
                <span className="font-bold text-primary">Check This One</span>.
                N'hésitez pas à nous faire part de vos idées !
              </p>
            </div>

            {/* SVG */}
            <Plans />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        darkMode ? "bg-darkBg text-gray-400" : "bg-myLightGray text-smokyBlack"
      } flex min-h-[calc(100vh-64px)] flex-col items-center gap-4 py-16 lg:gap-8`}
    >
      {/* Title */}
      <h1 className="my-8 text-3xl font-bold text-primary">About Us</h1>

      <div className="flex flex-col items-center gap-8 px-4 sm:w-4/5">
        {/* Introduction */}
        <div className="flex flex-col items-center gap-32 lg:flex-row lg:items-center">
          <div className="flex flex-col items-start gap-5 lg:w-3/4">
            <h2 className="text-2xl font-bold text-primary">
              "Discover, organize, and share your passions."
            </h2>
            <p>
              Welcome to{" "}
              <span className="font-bold text-primary">Check This One</span>! We
              are a platform dedicated to the creation and sharing of lists of
              movies, TV shows, podcasts, and YouTube videos. Our mission is to
              help you easily organize and discover new content, while offering
              you the opportunity to share your discoveries and favorites with
              your friends, family, or colleagues, or simply to reference the
              content you want to consume.
            </p>
            <p>
              Whether you are a movie buff, a TV show enthusiast, a podcast
              devotee, or a YouTube video fan,{" "}
              <span className="font-bold text-primary">Check This One</span> is
              the ideal tool to enrich and share your multimedia experience.
              Join our community today and discover everything we have to offer!
            </p>
          </div>

          {/* SVG */}
          <PopcornSofa />
        </div>

        {/* Main features */}
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-center">
          {/* SVG */}
          <Features />

          <div className="flex flex-col items-start gap-5 lg:w-[95%]">
            <h3 className="text-xl font-bold text-primary">Main Features</h3>
            <p>
              <span className="font-bold text-primary">Check This One</span>{" "}
              offers a variety of features to enhance your content discovery and
              sharing experience:
            </p>
            <ul className="flex list-none flex-col gap-3 no-underline">
              <li>
                <span className="flex flex-row items-center gap-2 font-bold">
                  <div
                    className={`rounded-md p-2 ${
                      darkMode
                        ? "bg-altSecondary text-darkBg"
                        : "bg-secondary text-myWhite"
                    }`}
                  >
                    <HiOutlineClipboardList className="h-6 w-6" />
                  </div>
                  List creation and sharing:
                </span>{" "}
                <p className="ml-12">
                  Easily create personalized lists of movies, TV shows,
                  podcasts, and YouTube videos, and share them with your
                  friends, family, or colleagues to exchange recommendations and
                  discoveries.
                </p>
              </li>

              <li>
                <span className="flex flex-row items-center gap-2 font-bold">
                  <div
                    className={`rounded-md p-2 ${
                      darkMode
                        ? "bg-altSecondary text-darkBg"
                        : "bg-secondary text-myWhite"
                    }`}
                  >
                    <HiInformationCircle className="h-6 w-6" />
                  </div>
                  Content information:
                </span>{" "}
                <p className="ml-12">
                  Access detailed information about movies and TV shows, such as
                  actors, directors, and synopses. Also find the streaming
                  platforms that offer this content based on your country, to
                  facilitate your viewing experience.
                </p>
              </li>
              <li>
                <span className="flex flex-row items-center gap-2 font-bold">
                  <div
                    className={`rounded-md p-2 ${
                      darkMode
                        ? "bg-altSecondary text-darkBg"
                        : "bg-secondary text-myWhite"
                    }`}
                  >
                    <HiEye className="h-6 w-6" />
                  </div>
                  Viewing status:
                </span>{" "}
                <p className="ml-12">
                  Mark the content you have already watched or listened to, and
                  track your viewing progress within a list. This allows you to
                  organize and know which content you still need to discover.
                </p>
              </li>
              <li>
                <span className="flex flex-row items-center gap-2 font-bold">
                  <div
                    className={`rounded-md p-2 ${
                      darkMode
                        ? "bg-altSecondary text-darkBg"
                        : "bg-secondary text-myWhite"
                    }`}
                  >
                    <HiTrendingUp className="h-6 w-6" />
                  </div>
                  YouTube and Podcast trends:
                </span>{" "}
                <p className="ml-12">
                  Stay informed about trending YouTube videos and podcasts
                  directly from our platform. You'll never have to look far to
                  find the most popular and recent content.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Future */}
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-center">
          <div className="flex flex-col items-start gap-5 lg:w-[95%]">
            <h3 className="text-xl font-bold text-primary">Future Plans</h3>
            <p>
              At <span className="font-bold text-primary">Check This One</span>,
              we are always looking for new ways to improve the user experience
              and add value to our platform. Here are some of the enhancements
              and evolutions we are considering for the future:
            </p>
            <ul className="flex list-none flex-col gap-3 no-underline">
              <li>
                <span className="flex flex-row items-center gap-2 font-bold">
                  Social network integration:
                </span>{" "}
                Allow users to connect with their social media accounts, such as
                Facebook, Twitter, or Google, to facilitate sharing and
                interaction with their friends and network.
              </li>

              <li>
                <span className="flex flex-row items-center gap-2 font-bold">
                  Mobile app:
                </span>{" "}
                Create a mobile app for iOS and Android, so that our users can
                access{" "}
                <span className="font-bold text-primary">Check This One</span>{" "}
                anywhere and at any time, directly from their smartphone or
                tablet.
              </li>
              <li>
                <span className="flex flex-row items-center gap-2 font-bold">
                  Community and forums:
                </span>{" "}
                Set up discussion and exchange spaces for users to share their
                opinions, ask questions, and receive advice on content and
                lists.
              </li>
            </ul>
            <p>
              We are excited to continue developing and improving{" "}
              <span className="font-bold text-primary">Check This One</span>.
              Please feel free to share your ideas with us!
            </p>
          </div>

          {/* SVG */}
          <Plans />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
