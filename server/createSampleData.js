const mongoose = require("mongoose");
const Investment = require("./models/investment");

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect("mongodb://localhost:27017/db_project_szkielety", connectionParams)
  .then(() => {
    console.log("Connected to database successfully");

    const sampleInvestments = [
      {
        title: "Nowe Centrum Handlowe",
        description: "Budowa nowego centrum handlowego w centrum miasta.",
        image: "https://d-art.ppstatic.pl/kadry/k/r/1/29/50/629f121740165_o_medium.jpg",
      },
      {
        title: "Rozbudowa Parku",
        description: "Rozbudowa miejskiego parku i nowych terenów zielonych.",
        image: "https://cdn.galleries.smcloud.net/t/galleries/gf-KqZS-wKhB-hUi7_rozbudowa-parku-majowe-1920x1080-nocrop.jpg",
      },
      {
        title: "Modernizacja Stadionu",
        description: "Modernizacja miejskiego stadionu, aby spełniał międzynarodowe standardy.",
        image: "https://d-art.ppstatic.pl/kadry/k/r/be/68/5acbc385c6dbd_o_medium.jpg",
      },
      {
        title: "Budowa Nowej Szkoły",
        description: "Budowa nowoczesnej szkoły podstawowej z zaawansowanym wyposażeniem.",
        image: "https://bi.im-g.pl/im/d3/b9/1a/z28023507AMP,Wizualizacja-nowej-szkoly-w-Ursusie.jpg",
      },
      {
        title: "Rozwój Transportu Publicznego",
        description: "Inwestycja w nowe linie autobusowe i tramwajowe.",
        image: "https://bizguru.pl/wp-content/uploads/2023/11/transport-publiczny-min.jpg",
      },
      {
        title: "Budowa Nowego Szpitala",
        description: "Budowa nowoczesnego szpitala z nowymi oddziałami specjalistycznymi.",
        image: "https://cdn.galleries.smcloud.net/t/galleries/gf-Edkj-BZmH-nXEU_nowy-szpital-onkologiczny-we-wroclawiu-1008x442.jpg",
      },
      {
        title: "Renowacja Starego Miasta",
        description: "Renowacja zabytkowych budynków i ulic w starej części miasta.",
        image: "https://hasajacezajace.com/wp-content/uploads/2022/02/rynek-lublin-atrakcje-59.jpg",
      },
      {
        title: "Budowa Nowego Osiedla Mieszkaniowego",
        description: "Budowa nowoczesnego osiedla mieszkaniowego z pełną infrastrukturą.",
        image: "https://lodz.pl/files/public/_processed_/c/c/csm_polesie-mieszkania-w-lodzi-15_363ad2f091.jpg",
      },
      {
        title: "Rozbudowa Sieci Ścieżek Rowerowych",
        description: "Rozbudowa sieci ścieżek rowerowych, aby ułatwić poruszanie się rowerem po mieście.",
        image: "https://i.iplsc.com/sciezka-rowerowa-wzdluz-bystrzycy/000FGC0LOLXWS9XW-C116-F4.jpg",
      },
      {
        title: "Nowe Centrum Kultury",
        description: "Budowa centrum kultury z teatrem, galerią sztuki i salą koncertową.",
        image: "https://wszczecinie.pl/storage/cache/articles/9b9e8fe4421dc43dd4e339aa4585a929jpg/1500-9b9e8fe4421dc43dd4e339aa4585a929.jpg",
      }
    ];

    return Investment.insertMany(sampleInvestments);
  })
  .then(() => {
    console.log("Sample data added successfully");
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to database or adding sample data", error);
  });
