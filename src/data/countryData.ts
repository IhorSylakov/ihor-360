interface Photo {
  id: string;
  panorama: string;
  thumbnail?: string;
  title?: string;
  isHidden: boolean;
  likes?: number;
  isPano: boolean;
  options?: {
    caption: string;
    description?: string;
  };
}

export interface PlaceName {
  id: string;
  name: string;
  preview?: string;
  photos: Photo[];
  cityId?: string;
  countryId?: string;
}

export interface CityName {
  id: string;
  name: string;
  preview?: string;
  places: PlaceName[];
  countryId?: string;
}

interface CountryName {
  id: string;
  name: string;
  preview?: string;
  cities: CityName[];
}
// const baseUrl = 'https://rest-api-prod-us-east-1-799789241931.s3.us-east-1.amazonaws.com/user_1866919/';
// const thumbUrl = 'https://d1unuvan7ts7ur.cloudfront.net//0x600/filters:strip_exif()/user_1866919/';

export const media: CountryName[] = [
  {
    id: "country000001",
    name: "Portugal",
    cities: [
      {
        id: "sity0000001",
        name: "Lisbon",
        preview: "https://lh3.googleusercontent.com/gps-proxy/ALd4DhGYcfnzkdNjtV-tzAFR-DmKx_KHHO0QPCC7uvw6tLsfQ1cE0aO_O0LWD2YGjox8au7Ffjpi82GmZ284_FH4XtvAmxFBgvx6SHyx9SeEWIIBKXtGEBaacWiW7Q-lVOSroBwgEEstXiIiJIZd2eLZ25-6mAVjMVeWy2qYjUHm1Hv8ruwa-4TdIvAC=w408-h272-k-no",
        places: [
          {
            id: "place-001",
            name: "Дворец маркизов Фронтейра",
            preview: "https://lh5.googleusercontent.com/p/AF1QipMpQDsVLw3pqt9INwaSEaBDur0alI_3Ar6Beo4J=w408-h306-k-no",
            photos: [
              {
                id: "image-photo_11233512",
                panorama: "photo_11233512",
                isPano: true,
                isHidden: false,
                title: "Дворец маркизов Фронтейра 1",
                options: {
                  caption: 'Дворец маркизов Фронтейра 1',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233512/img-20241018-120153-00-001"> ' +
                    'https://www.clickasnap.com/image/11233512/img-20241018-120153-00-001' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233605",
                panorama: "photo_11233605",
                isPano: true,
                isHidden: false,
                title: "Дворец маркизов Фронтейра 2",
                options: {
                  caption: 'Дворец маркизов Фронтейра 2',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233605/img-20241018-121213-00-003"> ' +
                    'https://www.clickasnap.com/image/11233605/img-20241018-121213-00-003' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233693",
                panorama: "photo_11233693",
                isPano: true,
                isHidden: false,
                title: "Дворец маркизов Фронтейра 3",
                options: {
                  caption: 'Дворец маркизов Фронтейра 3',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233693/img-20241018-121232-00-004"> ' +
                    'https://www.clickasnap.com/image/11233693/img-20241018-121232-00-004' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233709",
                panorama: "photo_11233709",
                isPano: true,
                isHidden: false,
                title: "Дворец маркизов Фронтейра 4",
                options: {
                  caption: 'Дворец маркизов Фронтейра 4',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233709/img-20241018-121612-00-005"> ' +
                    'https://www.clickasnap.com/image/11233709/img-20241018-121612-00-005' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240153",
                panorama: "photo_11240153",
                isPano: true,
                isHidden: false,
                title: "Дворец маркизов Фронтейра 5",
                options: {
                  caption: 'Дворец маркизов Фронтейра 5',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240153/img-20241018-122429-00-008"> ' +
                    'https://www.clickasnap.com/image/11240153/img-20241018-122429-00-008' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233723",
                panorama: "photo_11233723",
                isPano: true,
                isHidden: false,
                title: "Дворец маркизов Фронтейра 6",
                options: {
                  caption: 'Дворец маркизов Фронтейра 6',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233723/img-20241018-123453-00-010"> ' +
                    'https://www.clickasnap.com/image/11233723/img-20241018-123453-00-010' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11233727",
                panorama: "photo_11233727",
                isPano: true,
                isHidden: false,
                title: "Дворец маркизов Фронтейра 7",
                options: {
                  caption: 'Дворец маркизов Фронтейра 7',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233727/img-20241018-124026-00-011"> ' +
                    'https://www.clickasnap.com/image/11233727/img-20241018-124026-00-011' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240144",
                panorama: "photo_11240144",
                isPano: true,
                isHidden: false,
                title: "Дворец маркизов Фронтейра 8",
                options: {
                  caption: 'Дворец маркизов Фронтейра 8',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240144/img-20241018-120759-00-002"> ' +
                    'https://www.clickasnap.com/image/11240144/img-20241018-120759-00-002' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240145",
                panorama: "photo_11240145",
                isPano: true,
                isHidden: false,
                title: "Дворец маркизов Фронтейра 9",
                options: {
                  caption: 'Дворец маркизов Фронтейра 9',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240145/img-20241018-121701-00-006"> ' +
                    'https://www.clickasnap.com/image/11240145/img-20241018-121701-00-006' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240147",
                panorama: "photo_11240147",
                isPano: true,
                isHidden: false,
                title: "Дворец маркизов Фронтейра 10",
                options: {
                  caption: 'Дворец маркизов Фронтейра 10',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240147/img-20241018-123250-00-009"> ' +
                    'https://www.clickasnap.com/image/11240147/img-20241018-123250-00-009' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240151",
                panorama: "photo_11240151",
                isPano: true,
                isHidden: false,
                title: "Дворец маркизов Фронтейра 11",
                options: {
                  caption: 'Дворец маркизов Фронтейра 11',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240151/img-20241018-121750-00-007"> ' +
                    'https://www.clickasnap.com/image/11240151/img-20241018-121750-00-007' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240183",
                panorama: "photo_11240183",
                isPano: true,
                isHidden: false,
                title: "Дворец маркизов Фронтейра 12",
                options: {
                  caption: 'Дворец маркизов Фронтейра 12',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240183/img-20241018-124124-00-012"> ' +
                    'https://www.clickasnap.com/image/11240183/img-20241018-124124-00-012' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240197",
                panorama: "photo_11240197",
                isPano: true,
                isHidden: false,
                title: "Дворец маркизов Фронтейра 13",
                options: {
                  caption: 'Дворец маркизов Фронтейра 13',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240197/img-20241018-124506-00-013"> ' +
                    'https://www.clickasnap.com/image/11240197/img-20241018-124506-00-013' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
          {
            id: "place-002",
            name: "Жеронимуш",
            preview: "https://lh5.googleusercontent.com/p/AF1QipPdzHA5ZNjLqAzppqZd3aNSsYlWFtxqe9FHy3-c=w408-h544-k-no",
            photos: [
              {
                id: "image-photo_11233731",
                panorama: "photo_11233731",
                isPano: true,
                isHidden: false,
                title: "Жеронимуш 1",
                options: {
                  caption: 'Жеронимуш 1',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233731/img-20241018-140812-00-015"> ' +
                    'https://www.clickasnap.com/image/11233731/img-20241018-140812-00-015' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240199",
                panorama: "photo_11240199",
                isPano: true,
                isHidden: false,
                title: "Жеронимуш 2",
                options: {
                  caption: 'Жеронимуш 2',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240199/img-20241018-141602-00-016"> ' +
                    'https://www.clickasnap.com/image/11240199/img-20241018-141602-00-016' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11240214",
                panorama: "photo_11240214",
                isPano: true,
                isHidden: false,
                title: "Жеронимуш 3",
                options: {
                  caption: 'Жеронимуш 3',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11240214/img-20241018-143348-00-017"> ' +
                    'https://www.clickasnap.com/image/11240214/img-20241018-143348-00-017' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244281",
                panorama: "photo_11244281",
                isPano: true,
                isHidden: false,
                title: "Жеронимуш 4",
                options: {
                  caption: 'Жеронимуш 4',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244281/img-20241018-150841-00-018"> ' +
                    'https://www.clickasnap.com/image/11244281/img-20241018-150841-00-018' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244287",
                panorama: "photo_11244287",
                isPano: true,
                isHidden: false,
                title: "Жеронимуш 5",
                options: {
                  caption: 'Жеронимуш 5',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244287/img-20241018-151220-00-019"> ' +
                    'https://www.clickasnap.com/image/11244287/img-20241018-151220-00-019' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
          {
            id: "place-003",
            name: "Где-то в Лиссабоне",
            photos: [
              {
                id: "image-photo_11233730",
                panorama: "photo_11233730",
                isPano: true,
                isHidden: false,
                title: "По дороге от Дворца маркизов Фронтейра",
                options: {
                  caption: 'По дороге от Дворца маркизов Фронтейра',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11233730/img-20241018-132130-00-014"> ' +
                    'https://www.clickasnap.com/image/11233730/img-20241018-132130-00-014' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
        ],
      },
      {
        id: "sity0000001",
        name: "Sintra",
        preview: "https://lh5.googleusercontent.com/p/AF1QipM9NN7bQjV9DTKVKY5grO-ExfLlQlQ4wKQgYYYY=w408-h509-k-no",
        places: [
          {
            id: "place-004",
            name: "Дворец Пена",
            preview: "https://lh5.googleusercontent.com/p/AF1QipPhTLRmpoyJnF_or8Ka6W6MM6uq0SeI-NmXiWvo=w408-h272-k-no",
            photos: [
              {
                id: "image-photo_11233733",
                panorama: "photo_11233733",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 1",
                options: {
                  caption: 'Дворец Пена 1',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244287/img-20241018-151220-00-019"> ' +
                    'https://www.clickasnap.com/image/11244287/img-20241018-151220-00-019' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244289",
                panorama: "photo_11244289",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 2",
                options: {
                  caption: 'Дворец Пена 2',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244289/img-20241020-115910-00-022"> ' +
                    'https://www.clickasnap.com/image/11244289/img-20241020-115910-00-022' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244296",
                panorama: "photo_11244296",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 3",
                options: {
                  caption: 'Дворец Пена 3',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244296/img-20241020-120230-00-023"> ' +
                    'https://www.clickasnap.com/image/11244296/img-20241020-120230-00-023' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244304",
                panorama: "photo_11244304",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 4",
                options: {
                  caption: 'Дворец Пена 4',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244304/img-20241020-120634-00-024"> ' +
                    'https://www.clickasnap.com/image/11244304/img-20241020-120634-00-024' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244334",
                panorama: "photo_11244334",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 5",
                options: {
                  caption: 'Дворец Пена 5',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244334/img-20241020-120645-00-025"> ' +
                    'https://www.clickasnap.com/image/11244334/img-20241020-120645-00-025' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244337",
                panorama: "photo_11244337",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 6",
                options: {
                  caption: 'Дворец Пена 6',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244337/img-20241020-120747-00-026"> ' +
                    'https://www.clickasnap.com/image/11244337/img-20241020-120747-00-026' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244338",
                panorama: "photo_11244338",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 7",
                options: {
                  caption: 'Дворец Пена 7',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244338/img-20241020-120910-00-027"> ' +
                    'https://www.clickasnap.com/image/11244338/img-20241020-120910-00-027' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244340",
                panorama: "photo_11244340",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 8",
                options: {
                  caption: 'Дворец Пена 8',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244340/img-20241020-121040-00-028"> ' +
                    'https://www.clickasnap.com/image/11244340/img-20241020-121040-00-028' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11244343",
                panorama: "photo_11244343",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 9",
                options: {
                  caption: 'Дворец Пена 9',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11244343/img-20241020-121144-00-029"> ' +
                    'https://www.clickasnap.com/image/11244343/img-20241020-121144-00-029' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252694",
                panorama: "photo_11252694",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 10",
                options: {
                  caption: 'Дворец Пена 10',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252694/img-20241020-121302-00-030"> ' +
                    'https://www.clickasnap.com/image/11252694/img-20241020-121302-00-030' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252727",
                panorama: "photo_11252727",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 11",
                options: {
                  caption: 'Дворец Пена 11',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252727/img-20241020-122410-00-031"> ' +
                    'https://www.clickasnap.com/image/11252727/img-20241020-122410-00-031' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252728",
                panorama: "photo_11252728",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 12",
                options: {
                  caption: 'Дворец Пена 12',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252728/img-20241020-125532-00-032"> ' +
                    'https://www.clickasnap.com/image/11252728/img-20241020-125532-00-032' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252742",
                panorama: "photo_11252742",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 13",
                options: {
                  caption: 'Дворец Пена 13',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252742/img-20241020-130522-00-033"> ' +
                    'https://www.clickasnap.com/image/11252742/img-20241020-130522-00-033' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252764",
                panorama: "photo_11252764",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 14",
                options: {
                  caption: 'Дворец Пена 14',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252764/img-20241020-131711-00-035"> ' +
                    'https://www.clickasnap.com/image/11252764/img-20241020-131711-00-035' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252768",
                panorama: "photo_11252768",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 15",
                options: {
                  caption: 'Дворец Пена 15',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252768/img-20241020-132219-00-039"> ' +
                    'https://www.clickasnap.com/image/11252768/img-20241020-132219-00-039' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252772",
                panorama: "photo_11252772",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 16",
                options: {
                  caption: 'Дворец Пена 16',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252772/img-20241020-133837-00-041"> ' +
                    'https://www.clickasnap.com/image/11252772/img-20241020-133837-00-041' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11252773",
                panorama: "photo_11252773",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 17",
                options: {
                  caption: 'Дворец Пена 17',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11252773/img-20241020-133905-00-042"> ' +
                    'https://www.clickasnap.com/image/11252773/img-20241020-133905-00-042' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11261422",
                panorama: "photo_11261422",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 18",
                options: {
                  caption: 'Дворец Пена 18',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11261422/img-20241020-134018-00-044"> ' +
                    'https://www.clickasnap.com/image/11261422/img-20241020-134018-00-044' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11261424",
                panorama: "photo_11261424",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 19",
                options: {
                  caption: 'Дворец Пена 19',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11261424/img-20241020-134058-00-045"> ' +
                    'https://www.clickasnap.com/image/11261424/img-20241020-134058-00-045' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11261440",
                panorama: "photo_11261440",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 20",
                options: {
                  caption: 'Дворец Пена 20',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11261440/img-20241020-134302-00-046"> ' +
                    'https://www.clickasnap.com/image/11261440/img-20241020-134302-00-046' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11261443",
                panorama: "photo_11261443",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 21",
                options: {
                  caption: 'Дворец Пена 21',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11261443/img-20241020-134322-00-047"> ' +
                    'https://www.clickasnap.com/image/11261443/img-20241020-134322-00-047' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11261446",
                panorama: "photo_11261446",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 22",
                options: {
                  caption: 'Дворец Пена 22',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11261446/img-20241020-134415-00-048"> ' +
                    'https://www.clickasnap.com/image/11261446/img-20241020-134415-00-048' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11285325",
                panorama: "photo_11285325",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 23",
                options: {
                  caption: 'Дворец Пена 23',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11285325/img-20241020-134709-00-049"> ' +
                    'https://www.clickasnap.com/image/11285325/img-20241020-134709-00-049' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11285330",
                panorama: "photo_11285330",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 24",
                options: {
                  caption: 'Дворец Пена 24',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11285330/img-20241020-134755-00-050"> ' +
                    'https://www.clickasnap.com/image/11285330/img-20241020-134755-00-050' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11285333",
                panorama: "photo_11285333",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 25",
                options: {
                  caption: 'Дворец Пена 25',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11285333/img-20241020-134819-00-051"> ' +
                    'https://www.clickasnap.com/image/11285333/img-20241020-134819-00-051' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11285334",
                panorama: "photo_11285334",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 26",
                options: {
                  caption: 'Дворец Пена 26',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11285334/img-20241020-134831-00-052"> ' +
                    'https://www.clickasnap.com/image/11285334/img-20241020-134831-00-052' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11285338",
                panorama: "photo_11285338",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 27",
                options: {
                  caption: 'Дворец Пена 27',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11285338/img-20241020-135022-00-053"> ' +
                    'https://www.clickasnap.com/image/11285338/img-20241020-135022-00-053' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11285340",
                panorama: "photo_11285340",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 28",
                options: {
                  caption: 'Дворец Пена 28',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11285340/img-20241020-135207-00-054"> ' +
                    'https://www.clickasnap.com/image/11285340/img-20241020-135207-00-054' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11285341",
                panorama: "photo_11285341",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 29",
                options: {
                  caption: 'Дворец Пена 29',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11285341/img-20241020-135233-00-055"> ' +
                    'https://www.clickasnap.com/image/11285341/img-20241020-135233-00-055' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11285343",
                panorama: "photo_11285343",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 30",
                options: {
                  caption: 'Дворец Пена 30',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11285343/img-20241020-140919-00-058"> ' +
                    'https://www.clickasnap.com/image/11285343/img-20241020-140919-00-058' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11289005",
                panorama: "photo_11289005",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 31",
                options: {
                  caption: 'Дворец Пена 31',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11289005/img-20241020-141316-00-059"> ' +
                    'https://www.clickasnap.com/image/11289005/img-20241020-141316-00-059' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11289011",
                panorama: "photo_11289011",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 32",
                options: {
                  caption: 'Дворец Пена 32',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11289011/img-20241020-141334-00-060"> ' +
                    'https://www.clickasnap.com/image/11289011/img-20241020-141334-00-060' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11289013",
                panorama: "photo_11289013",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 33",
                options: {
                  caption: 'Дворец Пена 33',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11289013/img-20241020-141404-00-061"> ' +
                    'https://www.clickasnap.com/image/11289013/img-20241020-141404-00-061' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11289014",
                panorama: "photo_11289014",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 34",
                options: {
                  caption: 'Дворец Пена 34',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11289014/img-20241020-141428-00-062"> ' +
                    'https://www.clickasnap.com/image/11289014/img-20241020-141428-00-062' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11289017",
                panorama: "photo_11289017",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 35",
                options: {
                  caption: 'Дворец Пена 35',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11289017/img-20241020-141536-00-063"> ' +
                    'https://www.clickasnap.com/image/11289017/img-20241020-141536-00-063' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11289019",
                panorama: "photo_11289019",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 36",
                options: {
                  caption: 'Дворец Пена 36',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11289019/img-20241020-145850-00-064"> ' +
                    'https://www.clickasnap.com/image/11289019/img-20241020-145850-00-064' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11289020",
                panorama: "photo_11289020",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 37",
                options: {
                  caption: 'Дворец Пена 37',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11289020/img-20241020-152642-00-067"> ' +
                    'https://www.clickasnap.com/image/11289020/img-20241020-152642-00-067' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11289022",
                panorama: "photo_11289022",
                isPano: true,
                isHidden: false,
                title: "Дворец Пена 38",
                options: {
                  caption: 'Дворец Пена 38',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11289022/img-20241020-152654-00-068"> ' +
                    'https://www.clickasnap.com/image/11289022/img-20241020-152654-00-068' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
          {
            id: "place-005",
            name: "Замок мавров",
            preview: "https://lh5.googleusercontent.com/p/AF1QipMJK57Z087B5FRp9XaSQBZ7epmA6ONdzWXHZu4B=w408-h306-k-no",
            photos: [
              {
                id: "image-photo_11289024",
                panorama: "photo_11289024",
                isPano: true,
                isHidden: false,
                title: "Замок мавров 1",
                options: {
                  caption: 'Замок мавров 1',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11289024/img-20241020-170402-00-071"> ' +
                    'https://www.clickasnap.com/image/11289024/img-20241020-170402-00-071' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11289026",
                panorama: "photo_11289026",
                isPano: true,
                isHidden: false,
                title: "Замок мавров 2",
                options: {
                  caption: 'Замок мавров 2',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11289026/img-20241020-170443-00-072"> ' +
                    'https://www.clickasnap.com/image/11289026/img-20241020-170443-00-072' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11292767",
                panorama: "photo_11292767",
                isPano: true,
                isHidden: false,
                title: "Замок мавров 3",
                options: {
                  caption: 'Замок мавров 3',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11292767/img-20241020-170702-00-073"> ' +
                    'https://www.clickasnap.com/image/11292767/img-20241020-170702-00-073' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11292772",
                panorama: "photo_11292772",
                isPano: true,
                isHidden: false,
                title: "Замок мавров 4",
                options: {
                  caption: 'Замок мавров 4',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11292772/img-20241020-170715-00-074"> ' +
                    'https://www.clickasnap.com/image/11292772/img-20241020-170715-00-074' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11292777",
                panorama: "photo_11292777",
                isPano: true,
                isHidden: false,
                title: "Замок мавров 5",
                options: {
                  caption: 'Замок мавров 5',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11292777/img-20241020-171212-00-076"> ' +
                    'https://www.clickasnap.com/image/11292777/img-20241020-171212-00-076' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11292782",
                panorama: "photo_11292782",
                isPano: true,
                isHidden: false,
                title: "Замок мавров 6",
                options: {
                  caption: 'Замок мавров 6',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11292782/img-20241020-172029-00-077"> ' +
                    'https://www.clickasnap.com/image/11292782/img-20241020-172029-00-077' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11292786",
                panorama: "photo_11292786",
                isPano: true,
                isHidden: false,
                title: "Замок мавров 7",
                options: {
                  caption: 'Замок мавров 7',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11292786/img-20241020-172123-00-078"> ' +
                    'https://www.clickasnap.com/image/11292786/img-20241020-172123-00-078' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11292788",
                panorama: "photo_11292788",
                isPano: true,
                isHidden: false,
                title: "Замок мавров 8",
                options: {
                  caption: 'Замок мавров 8',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11292788/img-20241020-172355-00-079"> ' +
                    'https://www.clickasnap.com/image/11292788/img-20241020-172355-00-079' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11292790",
                panorama: "photo_11292790",
                isPano: true,
                isHidden: false,
                title: "Замок мавров 9",
                options: {
                  caption: 'Замок мавров 9',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11292790/img-20241020-172426-00-080"> ' +
                    'https://www.clickasnap.com/image/11292790/img-20241020-172426-00-080' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11292791",
                panorama: "photo_11292791",
                isPano: true,
                isHidden: false,
                title: "Замок мавров 10",
                options: {
                  caption: 'Замок мавров 10',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11292791/img-20241020-172455-00-081"> ' +
                    'https://www.clickasnap.com/image/11292791/img-20241020-172455-00-081' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11292794",
                panorama: "photo_11292794",
                isPano: true,
                isHidden: false,
                title: "Замок мавров 11",
                options: {
                  caption: 'Замок мавров 11',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11292794/img-20241020-172505-00-082"> ' +
                    'https://www.clickasnap.com/image/11292794/img-20241020-172505-00-082' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11292797",
                panorama: "photo_11292797",
                isPano: true,
                isHidden: false,
                title: "Замок мавров 12",
                options: {
                  caption: 'Замок мавров 12',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11292797/img-20241020-172748-00-083"> ' +
                    'https://www.clickasnap.com/image/11292797/img-20241020-172748-00-083' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11302204",
                panorama: "photo_11302204",
                isPano: true,
                isHidden: false,
                title: "Замок мавров 13",
                options: {
                  caption: 'Замок мавров 13',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11302204/img-20241020-172805-00-084"> ' +
                    'https://www.clickasnap.com/image/11302204/img-20241020-172805-00-084' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
          {
            id: "place-006",
            name: "Где-то в Синтре",
            photos: [
              {
                id: "image-photo_11302212",
                panorama: "photo_11302212",
                isPano: true,
                isHidden: false,
                title: "Где-то в Синтре 1",
                options: {
                  caption: 'Где-то в Синтре 1',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11302212/img-20241020-181036-00-085"> ' +
                    'https://www.clickasnap.com/image/11302212/img-20241020-181036-00-085' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11302214",
                panorama: "photo_11302214",
                isPano: true,
                isHidden: false,
                title: "Где-то в Синтре 2",
                options: {
                  caption: 'Где-то в Синтре 2',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11302214/img-20241020-183924-00-087"> ' +
                    'https://www.clickasnap.com/image/11302214/img-20241020-183924-00-087' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
          {
            id: "place-007",
            name: "Дворец Монсеррат",
            preview: "https://lh5.googleusercontent.com/p/AF1QipNCc9fufU8VGphAJrRSgrt4D-jZlVsvWxxjQJ80=w408-h306-k-no",
            photos: [
              {
                id: "image-photo_11302218",
                panorama: "photo_11302218",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 1",
                options: {
                  caption: 'Дворец Монсеррат 1',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11302218/img-20241021-105857-00-090"> ' +
                    'https://www.clickasnap.com/image/11302218/img-20241021-105857-00-090' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11302223",
                panorama: "photo_11302223",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 2",
                options: {
                  caption: 'Дворец Монсеррат 2',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11302223/img-20241021-105917-00-091"> ' +
                    'https://www.clickasnap.com/image/11302223/img-20241021-105917-00-091' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11302230",
                panorama: "photo_11302230",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 3",
                options: {
                  caption: 'Дворец Монсеррат 3',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11302230/img-20241021-111017-00-094"> ' +
                    'https://www.clickasnap.com/image/11302230/img-20241021-111017-00-094' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11302234",
                panorama: "photo_11302234",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 4",
                options: {
                  caption: 'Дворец Монсеррат 4',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11302234/img-20241021-113319-00-095"> ' +
                    'https://www.clickasnap.com/image/11302234/img-20241021-113319-00-095' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11302237",
                panorama: "photo_11302237",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 5",
                options: {
                  caption: 'Дворец Монсеррат 5',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11302237/img-20241021-114222-00-096"> ' +
                    'https://www.clickasnap.com/image/11302237/img-20241021-114222-00-096' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11302239",
                panorama: "photo_11302239",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 6",
                options: {
                  caption: 'Дворец Монсеррат 6',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11302239/img-20241021-114238-00-097"> ' +
                    'https://www.clickasnap.com/image/11302239/img-20241021-114238-00-097' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11308688",
                panorama: "photo_11308688",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 7",
                options: {
                  caption: 'Дворец Монсеррат 7',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11308688/img-20241021-120924-00-099"> ' +
                    'https://www.clickasnap.com/image/11308688/img-20241021-120924-00-099' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11308725",
                panorama: "photo_11308725",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 8",
                options: {
                  caption: 'Дворец Монсеррат 8',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11308725/img-20241021-121117-00-100"> ' +
                    'https://www.clickasnap.com/image/11308725/img-20241021-121117-00-100' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11308732",
                panorama: "photo_11308732",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 9",
                options: {
                  caption: 'Дворец Монсеррат 9',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11308732/img-20241021-121717-00-101"> ' +
                    'https://www.clickasnap.com/image/11308732/img-20241021-121717-00-101' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11308733",
                panorama: "photo_11308733",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 10",
                options: {
                  caption: 'Дворец Монсеррат 10',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11308733/img-20241021-134416-00-104"> ' +
                    'https://www.clickasnap.com/image/11308733/img-20241021-134416-00-104' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11308739",
                panorama: "photo_11308739",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 11",
                options: {
                  caption: 'Дворец Монсеррат 11',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11308739/img-20241021-134436-00-105"> ' +
                    'https://www.clickasnap.com/image/11308739/img-20241021-134436-00-105' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11308743",
                panorama: "photo_11308743",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 12",
                options: {
                  caption: 'Дворец Монсеррат 12',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11308743/img-20241021-110723-00-093"> ' +
                    'https://www.clickasnap.com/image/11308743/img-20241021-110723-00-093' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11308748",
                panorama: "photo_11308748",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 13",
                options: {
                  caption: 'Дворец Монсеррат 13',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11308748/img-20241021-134619-00-106"> ' +
                    'https://www.clickasnap.com/image/11308748/img-20241021-134619-00-106' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11308753",
                panorama: "photo_11308753",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 14",
                options: {
                  caption: 'Дворец Монсеррат 14',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11308753/img-20241021-134706-00-107"> ' +
                    'https://www.clickasnap.com/image/11308753/img-20241021-134706-00-107' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              {
                id: "image-photo_11308755",
                panorama: "photo_11308755",
                isPano: true,
                isHidden: false,
                title: "Дворец Монсеррат 15",
                options: {
                  caption: 'Дворец Монсеррат 15',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11308755/img-20241021-134816-00-108"> ' +
                    'https://www.clickasnap.com/image/11308755/img-20241021-134816-00-108' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
            ],
          },
          {
            id: "place-008",
            name: "Мыс Рока",
            preview: "https://lh5.googleusercontent.com/p/AF1QipNT1Zg2mOg38opZOc6rJuWP1E4dEFLv6ypjKJzP=w408-h305-k-no",
            photos: [
              {
                id: "image-photo_11308757",
                panorama: "photo_11308757",
                isPano: true,
                isHidden: false,
                title: "Мыс Рока 1",
                options: {
                  caption: 'Мыс Рока 1',
                  description: 'You can look or download original file here ' +
                    '<a target="_blank" href="https://www.clickasnap.com/image/11308757/img-20241021-154724-00-109"> ' +
                    'https://www.clickasnap.com/image/11308757/img-20241021-154724-00-109' +
                    '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
                },
              },
              // {
              //   id: "image-photo_aaaaaaa",
              //   panorama: "photo_aaaaaaa",
              //   isPano: true,
              //   isHidden: false,
              //   title: "Мыс Рока 1",
              //   options: {
              //     caption: 'Мыс Рока 1',
              //     description: 'You can look or download original file here ' +
              //       '<a target="_blank" href="https://www.clickasnap.com/image/aaaaaaa/bbbbbbbb"> ' +
              //       'https://www.clickasnap.com/image/aaaaaaa/bbbbbbbb' +
              //       '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
              //   },
              // },
            ],
          },
          // {
          //   id: "place-009",
          //   name: "Кинта да Регалейра",
          //   preview: "https://lh5.googleusercontent.com/p/AF1QipMx79uSDDFEvCBPR3mhdntnuRnH0tvQh6Vx4yUX=w426-h240-k-no",
          //   photos: [
          //     {
          //       id: "image-photo_11308757",
          //       panorama: "photo_11308757",
          //       isPano: true,
          //       isHidden: false,
          //       title: "Кинта да Регалейра 1",
          //       options: {
          //         caption: 'Кинта да Регалейра 1',
          //         description: 'You can look or download original file here ' +
          //           '<a target="_blank" href="https://www.clickasnap.com/image/11308757/img-20241021-154724-00-109"> ' +
          //           'https://www.clickasnap.com/image/11308757/img-20241021-154724-00-109' +
          //           '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
          //       },
          //     },
          //     {
          //       id: "image-photo_aaaaaaa",
          //       panorama: "photo_aaaaaaa",
          //       isPano: true,
          //       isHidden: false,
          //       title: "Кинта да Регалейра 1",
          //       options: {
          //         caption: 'Кинта да Регалейра 1',
          //         description: 'You can look or download original file here ' +
          //           '<a target="_blank" href="https://www.clickasnap.com/image/aaaaaaa/bbbbbbbb"> ' +
          //           'https://www.clickasnap.com/image/aaaaaaa/bbbbbbbb' +
          //           '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
          //       },
          //     },
          //   ],
          // },
        ],
      },
    ],
  },
  // {
  //   id: "country000001",
  // name: "Country",
  //   cities: [
  //     {id: "sity0000001",

  //       name: "City",
  //       places: [
  //         {
  //           id: "place-004",
  //           name: "Place name",
  //           photos: [
  //             {
  //               id: "image-photo_11233733",
  //               panorama: "photo_11233733",
  //               isPano: true,
//                 isHidden: false,
  //               title: "Place name 1",
  //               options: {
  //                 caption: 'Place name 1',
  //                 description: 'You can look or download original file here ' +
  //                   '<a target="_blank" href="asdfasdfasdf"> ' +
  //                   'asdfasdfasdf' +
  //                   '</a><br><br><ul style="display: flex;"><li>test 1</li><li>test 2</li></ul>',
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];
